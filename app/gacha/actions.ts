"use server";

import { randomUUID } from "node:crypto";

import { pullGacha, type GatewayPitySnapshot, type GatewayPullRecord } from "@/lib/gateway/gacha";
import { GatewayFetchError } from "@/lib/gateway/client";
import {
  getBackpackInventory,
  getBackpackPullEvent,
  getBackpackPullRecords,
  type BackpackInventoryItem,
  type BackpackPullEvent,
  type BackpackPullRecord,
} from "@/lib/gateway/backpack";
import { createClient } from "@/lib/supabase/server";

export type PullGachaActionResult =
  | {
      ok: true;
      eventId: string;
      records: GatewayPullRecord[];
      nextPity: GatewayPitySnapshot;
      stateVersion: number;
    }
  | {
      ok: false;
      message: string;
    };

export type BackpackSyncActionResult =
  | {
      ok: true;
      event: BackpackPullEvent;
      eventRecords: BackpackPullRecord[];
      history: BackpackPullRecord[];
      inventory: BackpackInventoryItem[];
    }
  | {
      ok: false;
      message: string;
    };

export async function drawGachaPull({
  bannerId,
  count,
}: {
  bannerId: string;
  count: 1 | 10;
}): Promise<PullGachaActionResult> {
  const normalizedBannerId = bannerId.trim();
  if (!normalizedBannerId || normalizedBannerId.length > 100) {
    return {
      ok: false,
      message: "卡池 ID 不合法，请刷新页面后重试。",
    };
  }

  if (count !== 1 && count !== 10) {
    return {
      ok: false,
      message: "只能执行 1 抽或 10 抽。",
    };
  }

  const supabase = await createClient();
  const [
    {
      data: { session },
    },
    {
      data: { user },
    },
  ] = await Promise.all([supabase.auth.getSession(), supabase.auth.getUser()]);

  if (!user || !session?.access_token) {
    return {
      ok: false,
      message: "登录状态已失效，请重新登录。",
    };
  }

  try {
    const idempotencyKey = randomUUID();
    const result = await pullGachaWithRetry({
      accessToken: session.access_token,
      bannerId: normalizedBannerId,
      count,
      idempotencyKey,
    });

    return {
      ok: true,
      eventId: result.event_id,
      records: result.records,
      nextPity: result.next_pity,
      stateVersion: result.state_version,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "抽取失败，请稍后重试。",
    };
  }
}

async function pullGachaWithRetry({
  accessToken,
  bannerId,
  count,
  idempotencyKey,
}: {
  accessToken: string;
  bannerId: string;
  count: 1 | 10;
  idempotencyKey: string;
}) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await pullGacha({
        accessToken,
        bannerId,
        count,
        idempotencyKey,
      });
    } catch (error) {
      lastError = error;
      if (!(error instanceof GatewayFetchError) || error.code !== "kafka_unavailable") {
        throw error;
      }
      await delay(300);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("抽取失败，请稍后重试。");
}

export async function syncGachaBackpackAfterPull({
  eventId,
}: {
  eventId: string;
}): Promise<BackpackSyncActionResult> {
  const normalizedEventId = eventId.trim();
  if (!isUuidLike(normalizedEventId)) {
    return {
      ok: false,
      message: "抽卡事件 ID 不合法，请刷新页面后重试。",
    };
  }

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    return {
      ok: false,
      message: "登录状态已失效，请重新登录。",
    };
  }

  try {
    const detail = await waitForPullEvent(session.access_token, normalizedEventId);
    const [inventory, history] = await Promise.all([
      getBackpackInventory({ accessToken: session.access_token, limit: 100 }),
      getBackpackPullRecords({ accessToken: session.access_token, limit: 100 }),
    ]);

    return {
      ok: true,
      event: detail.event,
      eventRecords: detail.records,
      history: history.items,
      inventory: inventory.items,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "背包同步失败，请稍后刷新。",
    };
  }
}

async function waitForPullEvent(accessToken: string, eventId: string) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      return await getBackpackPullEvent({ accessToken, eventId });
    } catch (error) {
      lastError = error;
      if (!isRetryablePullEventError(error)) {
        throw error;
      }
      await delay(350);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("背包事件尚未同步，请稍后刷新。");
}

function isRetryablePullEventError(error: unknown) {
  return error instanceof Error && error.message.toLowerCase().includes("not found");
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
