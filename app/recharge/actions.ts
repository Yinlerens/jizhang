"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { creditAssets, getAssetLedger, type LedgerEntry } from "@/lib/gateway/assets";
import { SANDBOX_RESOURCE_GRANTS, formatAssetAmount } from "@/lib/sandbox/resource-grants";
import { getAuthenticatedSession } from "@/lib/supabase/server";

export type ResourceGrantActionResult =
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

export async function grantSandboxResources(
  grantId: string,
): Promise<ResourceGrantActionResult> {
  const grant = SANDBOX_RESOURCE_GRANTS.find((item) => item.id === grantId);
  if (!grant) {
    return {
      ok: false,
      message: "资源预设不存在，请刷新页面后重试。",
    };
  }

  const { user, session } = await getAuthenticatedSession();

  if (!user || !session?.access_token) {
    return {
      ok: false,
      message: "登录状态已失效，请重新登录。",
    };
  }

  try {
    const result = await creditAssets({
      accessToken: session.access_token,
      amountMinor: grant.amountMinor,
      idempotencyKey: `sandbox-grant:${grant.id}:${randomUUID()}`,
      reason: "sandbox_grant",
      metadata: {
        source: "sandbox",
        grant_id: grant.id,
        title: grant.title,
      },
    });

    revalidatePath("/");
    revalidatePath("/sandbox");
    revalidatePath("/sandbox/resources");
    revalidatePath("/recharge");

    return {
      ok: true,
      balanceMinor: result.account.balance_minor,
      entry: result.entry,
      message: `已发放 ${formatAssetAmount(grant.amountMinor)} 演示资源，当前余额 ${formatAssetAmount(result.account.balance_minor)}。`,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "资源发放失败，请稍后重试。",
    };
  }
}

export async function loadAssetLedgerPage(cursor?: string): Promise<LedgerActionResult> {
  const { user, session } = await getAuthenticatedSession();

  if (!user || !session?.access_token) {
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
