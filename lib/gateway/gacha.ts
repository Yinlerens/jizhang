import "server-only";

import { gatewayFetch } from "./client";

export type GatewayPitySnapshot = {
  since_five: number;
  since_four: number;
  guaranteed_featured_five: boolean;
  version: number;
};

export type GatewayPullRecord = {
  id: string;
  index: number;
  item_id: string;
  item_name: string;
  item_type: "character" | "weapon";
  rarity: 3 | 4 | 5;
  banner_id: string;
  banner_name: string;
  pity_at_five: number;
  pity_at_four: number;
  is_featured: boolean;
};

export type PullGachaResponse = {
  event_id: string;
  banner_version_id: string | null;
  seed: string;
  records: GatewayPullRecord[];
  previous_pity: GatewayPitySnapshot;
  next_pity: GatewayPitySnapshot;
  state_version: number;
};

export type GatewayPullOperationStatus =
  | "processing"
  | "event_pending"
  | "event_published"
  | "succeeded"
  | "refund_pending"
  | "failed";

export type GatewayPullOperationResponse = {
  status: GatewayPullOperationStatus;
  response: PullGachaResponse | null;
  error: {
    code: string;
    message: string;
  } | null;
};

export async function pullGacha({
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
  const response = await gatewayFetch("/api/v1/gacha/me/pulls", accessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
      "X-Request-Id": requestId,
    },
    body: JSON.stringify({
      banner_id: bannerId,
      count,
    }),
  });

  const data = (await response.json()) as PullGachaResponse;
  return {
    data,
    requestId: response.headers.get("X-Request-Id") ?? requestId,
  };
}

export async function getGachaPullOperation({
  accessToken,
  idempotencyKey,
  requestId,
}: {
  accessToken: string;
  idempotencyKey: string;
  requestId: string;
}) {
  const response = await gatewayFetch("/api/v1/gacha/me/pulls/operation", accessToken, {
    method: "GET",
    headers: {
      "Idempotency-Key": idempotencyKey,
      "X-Request-Id": requestId,
    },
  });

  const data = (await response.json()) as GatewayPullOperationResponse;
  return {
    data,
    requestId: response.headers.get("X-Request-Id") ?? requestId,
  };
}

export async function getGachaPity({
  accessToken,
  bannerId,
}: {
  accessToken: string;
  bannerId: string;
}) {
  const params = new URLSearchParams({ banner_id: bannerId });
  const response = await gatewayFetch(`/api/v1/gacha/me/pity?${params}`, accessToken, {
    method: "GET",
  });

  return (await response.json()) as GatewayPitySnapshot;
}
