"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { creditAssets, getAssetLedger, type LedgerEntry } from "@/lib/gateway/assets";
import { RECHARGE_TIERS, formatAssetAmount } from "@/lib/recharge/tiers";
import { createClient } from "@/lib/supabase/server";

export type RechargeActionResult =
  | {
      ok: true;
      message: string;
      balanceMinor: number;
      entry: LedgerEntry;
    }
  | {
      ok: false;
      message: string;
    };

export type LedgerActionResult =
  | {
      ok: true;
      items: LedgerEntry[];
      nextCursor?: string;
    }
  | {
      ok: false;
      message: string;
    };

export async function rechargeTier(tierId: string): Promise<RechargeActionResult> {
  const tier = RECHARGE_TIERS.find((item) => item.id === tierId);
  if (!tier) {
    return {
      ok: false,
      message: "充值档位不存在，请刷新页面后重试。",
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
    const result = await creditAssets({
      accessToken: session.access_token,
      amountMinor: tier.amountMinor,
      idempotencyKey: `topup:${tier.id}:${randomUUID()}`,
      reason: "topup",
      metadata: {
        source: "frontend",
        tier_id: tier.id,
        price_label: tier.priceLabel,
        title: tier.title,
      },
    });

    revalidatePath("/");
    revalidatePath("/recharge");

    return {
      ok: true,
      balanceMinor: result.account.balance_minor,
      entry: result.entry,
      message: `已充值 ${formatAssetAmount(tier.amountMinor)}，当前余额 ${formatAssetAmount(result.account.balance_minor)}。`,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "充值失败，请稍后重试。",
    };
  }
}

export async function loadAssetLedgerPage(cursor?: string): Promise<LedgerActionResult> {
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
    const page = await getAssetLedger({
      accessToken: session.access_token,
      cursor: cursor?.trim() || undefined,
      limit: 20,
    });

    return {
      ok: true,
      items: page.items,
      nextCursor: page.next_cursor,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "资产流水加载失败，请稍后重试。",
    };
  }
}
