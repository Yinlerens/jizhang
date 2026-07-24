"use server";

import { randomUUID } from "node:crypto";

import { pullGacha, type GatewayPitySnapshot, type GatewayPullRecord } from "@/lib/gateway/gacha";
import { GatewayFetchError } from "@/lib/gateway/client";
import { getAuditLogDetail } from "@/lib/gateway/audit";
import {
  getBackpackInventory,
  getBackpackPullEvent,
  getBackpackPullRecords,
  type BackpackInventoryItem,
  type BackpackPullEvent,
  type BackpackPullRecord,
} from "@/lib/gateway/backpack";
import { createClient } from "@/lib/supabase/server";
import { toGachaTraceAuditSnapshot } from "@/lib/trace/gacha-audit";
import type { GachaTraceAuditSnapshot } from "@/lib/trace/gacha-run";

export type PullGachaActionResult =
  | {
      ok: true;
      requestId: string;
      eventId: string;
      records: GatewayPullRecord[];
      nextPity: GatewayPitySnapshot;
      stateVersion: number;
    }
  | {
      ok: false;
      requestId: string;
      message: string;
      code?: string;
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

export type GachaTraceAuditActionResult =
  | { ok: true; audit: GachaTraceAuditSnapshot }
  | { ok: false; message: string };

export async function drawGachaPull({
  bannerId,
  count,
  idempotencyKey,
  requestId,
}: {
  bannerId: string;
  count: 1 | 10;
  idempotencyKey: string;
  requestId?: string;
}): Promise<PullGachaActionResult> {
  const normalizedRequestId = normalizeRequestId(requestId);
  const normalizedBannerId = typeof bannerId === "string" ? bannerId.trim() : "";
  if (!normalizedBannerId || normalizedBannerId.length > 100) {
    return {
      ok: false,
      requestId: normalizedRequestId,
      code: "invalid_banner_id",
      message: "卡池 ID 不合法，请刷新页面后重试。",
    };
  }

  if (count !== 1 && count !== 10) {
    return {
      ok: false,
      requestId: normalizedRequestId,
      code: "invalid_pull_count",
      message: "只能执行 1 抽或 10 抽。",
    };
  }

  const normalizedIdempotencyKey =
    typeof idempotencyKey === "string" ? idempotencyKey.trim() : "";
  if (!isUuidLike(normalizedIdempotencyKey)) {
    return {
      ok: false,
      requestId: normalizedRequestId,
      code: "invalid_idempotency_key",
      message: "抽卡请求标识不合法，请刷新页面后重试。",
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
      requestId: normalizedRequestId,
      code: "next_auth_missing",
      message: "登录状态已失效，请重新登录。",
    };
  }

  try {
    const result = await pullGachaWithRetry({
      accessToken: session.access_token,
      bannerId: normalizedBannerId,
      count,
      idempotencyKey: normalizedIdempotencyKey,
      requestId: normalizedRequestId,
    });

    return {
      ok: true,
      requestId: result.requestId,
      eventId: result.data.event_id,
      records: result.data.records,
      nextPity: result.data.next_pity,
      stateVersion: result.data.state_version,
    };
  } catch (error) {
    if (error instanceof GatewayFetchError) {
      return {
        ok: false,
        requestId: error.requestId ?? normalizedRequestId,
        code: error.code,
        message:
          error.code === "kafka_unavailable"
            ? "抽卡结果已生成但暂未同步，请再次点击同一卡池同一抽数恢复结果。"
            : error.message,
      };
    }

    return {
      ok: false,
      requestId: normalizedRequestId,
      message: error instanceof Error ? error.message : "抽取失败，请稍后重试。",
    };
  }
}

async function pullGachaWithRetry({
  accessToken,
  bannerId,
  count,
  idempotencyKey,
  requestId,
}: {
  accessToken: string;
  bannerId: string;
  count: 1 | 10;
  idempotencyKey: string;
  requestId: string;
}) {
  let lastError: unknown;
  let activeRequestId = requestId;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const data = await pullGacha({
        accessToken,
        bannerId,
        count,
        idempotencyKey,
        requestId: activeRequestId,
      });
      return { data, requestId: activeRequestId };
    } catch (error) {
      lastError = error;
      if (!(error instanceof GatewayFetchError) || error.code !== "kafka_unavailable") {
        throw error;
      }
      await delay(300);
      activeRequestId = randomUUID();
    }
  }

  throw lastError instanceof Error ? lastError : new Error("抽取失败，请稍后重试。");
}

export async function loadGachaTraceAudit({
  requestId,
}: {
  requestId: string;
}): Promise<GachaTraceAuditActionResult> {
  const normalizedRequestId = requestId.trim();
  if (!isUuidLike(normalizedRequestId)) {
    return { ok: false, message: "请求编号不合法。" };
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
    return { ok: false, message: "登录状态已失效。" };
  }

  try {
    const detail = await getAuditLogDetail(session.access_token, normalizedRequestId);
    return { ok: true, audit: toGachaTraceAuditSnapshot(detail) };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "请求审计详情暂不可用。",
    };
  }
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

function normalizeRequestId(value: string | undefined) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return isUuidLike(normalized) ? normalized : randomUUID();
}
