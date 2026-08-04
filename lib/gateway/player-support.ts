import "server-only";

import type { GatewayPitySnapshot } from "./gacha";
import { gatewayFetch } from "./client";

type PlayerSupportPage<T> = {
  items: T[];
};

export type PlayerSupportAccount = {
  balance_minor: number;
  created_at?: string;
  updated_at?: string;
};

export type PlayerSupportLedgerEntry = {
  id: string;
  idempotency_key: string;
  delta_minor: number;
  balance_before_minor: number;
  balance_after_minor: number;
  reason: string;
  created_at: string;
};

export type PlayerSupportInventoryItem = {
  item_id: string;
  item_name: string;
  item_type: "character" | "weapon";
  rarity: 3 | 4 | 5;
  quantity: number;
  updated_at?: string;
};

export type PlayerSupportPullEvent = {
  event_id: string;
  banner_id: string;
  state_version: number;
  received_at: string;
};

export type PlayerSupportPullRecord = {
  id: string;
  event_id: string;
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
  received_at: string;
};

export type PlayerSupportOperationStatus =
  | "processing"
  | "event_pending"
  | "event_published"
  | "succeeded"
  | "refund_pending"
  | "failed";

export type PlayerSupportOperation = {
  operation_id: string;
  event_id: string | null;
  request_id: string | null;
  banner_id: string | null;
  banner_version_id: string | null;
  pity_group_id: string | null;
  count: number | null;
  status: PlayerSupportOperationStatus;
  error: { code: string; message: string } | null;
  next_pity: GatewayPitySnapshot | null;
  created_at: string;
  updated_at: string;
};

export type PlayerSupportSection<T> = {
  status: "ok" | "not_found" | "not_applicable" | "unavailable";
  data: T | null;
  error?: { code: string; message: string };
};

export type PlayerSupportResponse = {
  player_id: string;
  generated_at: string;
  partial: boolean;
  sections: {
    account: PlayerSupportSection<PlayerSupportAccount>;
    ledger: PlayerSupportSection<PlayerSupportPage<PlayerSupportLedgerEntry>>;
    pull_operations: PlayerSupportSection<PlayerSupportPage<PlayerSupportOperation>>;
    inventory: PlayerSupportSection<PlayerSupportPage<PlayerSupportInventoryItem>>;
    pull_events: PlayerSupportSection<PlayerSupportPage<PlayerSupportPullEvent>>;
    pull_records: PlayerSupportSection<PlayerSupportPage<PlayerSupportPullRecord>>;
  };
};

export type PlayerSupportReplayRequest = {
  source: "recovery_context" | "persisted_result" | "operation_only";
  banner_id: string | null;
  banner_version_id: string | null;
  pity_group_id: string | null;
  count: number | null;
  seed: string | null;
  event_id: string | null;
  amount_minor: number | null;
  accepted_at: string | null;
};

export type PlayerSupportReplayOperation = {
  operation_id: string;
  request_id: string | null;
  status: PlayerSupportOperationStatus;
  request: PlayerSupportReplayRequest;
  response: Record<string, unknown> | null;
  event: Record<string, unknown> | null;
  error: { code: string; message: string } | null;
  created_at: string;
  updated_at: string;
};

export type PlayerSupportReplayBackpack = {
  event: {
    event_id: string;
    event_type: string;
    banner_id: string;
    seed: string;
    state_version: number;
    previous_pity: unknown;
    next_pity: unknown;
    received_at: string;
  };
  records: PlayerSupportPullRecord[];
};

export type PlayerSupportPullReplayResponse = {
  player_id: string;
  generated_at: string;
  partial: boolean;
  operation: PlayerSupportReplayOperation;
  asset_spend: PlayerSupportSection<PlayerSupportLedgerEntry>;
  backpack_delivery: PlayerSupportSection<PlayerSupportReplayBackpack>;
};

export async function getPlayerSupport(accessToken: string, playerId: string) {
  const response = await gatewayFetch(
    `/api/v1/admin/player-support/players/${encodeURIComponent(playerId)}`,
    accessToken,
    { method: "GET" },
  );

  return (await response.json()) as PlayerSupportResponse;
}

export async function getPlayerPullReplay(
  accessToken: string,
  playerId: string,
  operationId: string,
) {
  const response = await gatewayFetch(
    `/api/v1/admin/player-support/players/${encodeURIComponent(playerId)}/pulls/${encodeURIComponent(operationId)}/replay`,
    accessToken,
    { method: "GET" },
  );

  return (await response.json()) as PlayerSupportPullReplayResponse;
}
