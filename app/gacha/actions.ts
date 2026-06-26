"use server";

import { pullGacha, type GatewayPitySnapshot, type GatewayPullRecord } from "@/lib/gateway/gacha";
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
    const result = await pullGacha({
      accessToken: session.access_token,
      bannerId: normalizedBannerId,
      count,
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
