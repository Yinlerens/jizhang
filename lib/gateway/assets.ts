import "server-only";

import { gatewayFetch } from "./client";

export type AssetAccount = {
  user_id: string;
  balance_minor: number;
  created_at: string;
  updated_at: string;
};

export type LedgerEntry = {
  id: string;
  user_id: string;
  idempotency_key: string;
  delta_minor: number;
  balance_before_minor: number;
  balance_after_minor: number;
  reason: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type AssetLedgerPage = {
  items: LedgerEntry[];
  next_cursor?: string;
};

export type CreditAssetResponse = {
  account: AssetAccount;
  entry: LedgerEntry;
  idempotency_reused: boolean;
};

export async function getAssetAccount(accessToken: string) {
  const response = await gatewayFetch("/api/v1/assets/me/account", accessToken, {
    method: "GET",
  });

  return (await response.json()) as AssetAccount;
}

export async function getAssetLedger({
  accessToken,
  cursor,
  limit = 20,
}: {
  accessToken: string;
  cursor?: string;
  limit?: number;
}) {
  const params = new URLSearchParams({
    limit: String(Math.max(1, Math.min(100, Math.floor(limit)))),
  });

  if (cursor) {
    params.set("cursor", cursor);
  }

  const response = await gatewayFetch(`/api/v1/assets/me/ledger?${params}`, accessToken, {
    method: "GET",
  });

  return (await response.json()) as AssetLedgerPage;
}

export async function creditAssets({
  accessToken,
  amountMinor,
  idempotencyKey,
  reason,
  metadata,
}: {
  accessToken: string;
  amountMinor: number;
  idempotencyKey: string;
  reason: string;
  metadata: Record<string, unknown>;
}) {
  const response = await gatewayFetch("/api/v1/assets/me/credits", accessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      amount_minor: amountMinor,
      reason,
      metadata,
    }),
  });

  return (await response.json()) as CreditAssetResponse;
}
