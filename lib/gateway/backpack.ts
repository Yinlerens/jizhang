import "server-only";

import { gatewayFetch } from "./client";
import type { GatewayPitySnapshot } from "./gacha";

export type BackpackInventoryItem = {
  user_id: string;
  item_id: string;
  item_name: string;
  item_type: "character" | "weapon";
  rarity: 3 | 4 | 5;
  quantity: number;
  first_received_at: string;
  updated_at: string;
};

export type BackpackInventoryPage = {
  items: BackpackInventoryItem[];
  next_cursor?: string;
};

export type BackpackPullEvent = {
  event_id: string;
  user_id: string;
  event_type: "gacha.pull_completed.v1";
  banner_id: string;
  seed: string;
  state_version: number;
  previous_pity: GatewayPitySnapshot;
  next_pity: GatewayPitySnapshot;
  received_at: string;
};

export type BackpackPullRecord = {
  id: string;
  event_id: string;
  user_id: string;
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

export type BackpackPullEventsPage = {
  items: BackpackPullEvent[];
  next_cursor?: string;
};

export type BackpackPullRecordsPage = {
  items: BackpackPullRecord[];
  next_cursor?: string;
};

export type BackpackPullEventDetail = {
  event: BackpackPullEvent;
  records: BackpackPullRecord[];
};

export async function getBackpackInventory({
  accessToken,
  cursor,
  limit = 50,
}: {
  accessToken: string;
  cursor?: string;
  limit?: number;
}) {
  const params = pageParams({ cursor, limit });
  const response = await gatewayFetch(`/api/v1/backpack/me/inventory?${params}`, accessToken, {
    method: "GET",
  });

  return (await response.json()) as BackpackInventoryPage;
}

export async function getBackpackInventoryItem({
  accessToken,
  itemId,
}: {
  accessToken: string;
  itemId: string;
}) {
  const response = await gatewayFetch(
    `/api/v1/backpack/me/inventory/${encodeURIComponent(itemId)}`,
    accessToken,
    { method: "GET" },
  );

  return (await response.json()) as BackpackInventoryItem;
}

export async function getBackpackPullEvents({
  accessToken,
  bannerId,
  cursor,
  limit = 50,
}: {
  accessToken: string;
  bannerId?: string;
  cursor?: string;
  limit?: number;
}) {
  const params = pageParams({ cursor, limit });
  if (bannerId) {
    params.set("banner_id", bannerId);
  }

  const response = await gatewayFetch(`/api/v1/backpack/me/pull-events?${params}`, accessToken, {
    method: "GET",
  });

  return (await response.json()) as BackpackPullEventsPage;
}

export async function getBackpackPullEvent({
  accessToken,
  eventId,
}: {
  accessToken: string;
  eventId: string;
}) {
  const response = await gatewayFetch(
    `/api/v1/backpack/me/pull-events/${encodeURIComponent(eventId)}`,
    accessToken,
    { method: "GET" },
  );

  return (await response.json()) as BackpackPullEventDetail;
}

export async function getBackpackPullRecords({
  accessToken,
  bannerId,
  cursor,
  itemType,
  limit = 50,
  rarity,
}: {
  accessToken: string;
  bannerId?: string;
  cursor?: string;
  itemType?: "character" | "weapon";
  limit?: number;
  rarity?: 3 | 4 | 5;
}) {
  const params = pageParams({ cursor, limit });
  if (bannerId) {
    params.set("banner_id", bannerId);
  }
  if (rarity) {
    params.set("rarity", String(rarity));
  }
  if (itemType) {
    params.set("item_type", itemType);
  }

  const response = await gatewayFetch(`/api/v1/backpack/me/pull-records?${params}`, accessToken, {
    method: "GET",
  });

  return (await response.json()) as BackpackPullRecordsPage;
}

function pageParams({
  cursor,
  limit,
}: {
  cursor?: string;
  limit: number;
}) {
  const params = new URLSearchParams({
    limit: String(Math.max(1, Math.min(100, Math.floor(limit)))),
  });

  if (cursor) {
    params.set("cursor", cursor);
  }

  return params;
}
