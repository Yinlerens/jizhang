import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getCampaignLifecycle,
  type CampaignFeaturedItem,
  type CampaignItemOption,
  type CampaignSummary,
  type CampaignType,
} from "./campaign";

type BannerRow = {
  background_image_url: string;
  banner_type: CampaignType;
  cover_image_url: string;
  id: string;
  name: string;
};

type BannerVersionRow = {
  banner_id: string;
  effective_from: string;
  effective_to: string | null;
  id: string;
  notes: string;
  status: CampaignSummary["status"];
  version: number;
};

type BannerItemRow = {
  banner_version_id: string;
  featured_group: "five_up" | "four_up" | null;
  item_id: string;
  pool_group: "standard" | "featured";
  sort_order: number;
};

type ItemRow = {
  id: string;
  image_url: string;
  name: string;
  rarity: 3 | 4 | 5;
};

type CampaignItemOptionRow = ItemRow & {
  is_enabled: boolean;
  item_type: "character" | "weapon";
  subtitle: string;
};

const LIFECYCLE_PRIORITY = {
  draft: 0,
  active: 1,
  scheduled: 2,
  ended: 3,
  archived: 4,
} as const;

export async function listCampaigns(
  supabase: SupabaseClient,
  projectId: string,
  environmentId: string,
): Promise<CampaignSummary[]> {
  const [bannersResult, versionsResult, bannerItemsResult, itemsResult] = await Promise.all([
    supabase
      .schema("gacha")
      .from("banners")
      .select("id, name, banner_type, cover_image_url, background_image_url")
      .eq("project_id", projectId),
    supabase
      .schema("gacha")
      .from("banner_versions")
      .select("id, banner_id, version, status, effective_from, effective_to, notes")
      .eq("project_id", projectId)
      .eq("environment_id", environmentId),
    supabase
      .schema("gacha")
      .from("banner_items")
      .select("banner_version_id, item_id, pool_group, featured_group, sort_order")
      .eq("project_id", projectId)
      .eq("environment_id", environmentId),
    supabase
      .schema("gacha")
      .from("items")
      .select("id, name, rarity, image_url")
      .eq("project_id", projectId),
  ]);

  const error =
    bannersResult.error || versionsResult.error || bannerItemsResult.error || itemsResult.error;
  if (error) {
    throw new Error(`Campaign list unavailable: ${error.message}`);
  }

  const bannersById = new Map(
    ((bannersResult.data ?? []) as BannerRow[]).map((banner) => [banner.id, banner]),
  );
  const itemsById = new Map(
    ((itemsResult.data ?? []) as ItemRow[]).map((item) => [item.id, item]),
  );
  const bannerItemsByVersion = new Map<string, BannerItemRow[]>();
  for (const bannerItem of (bannerItemsResult.data ?? []) as BannerItemRow[]) {
    const rows = bannerItemsByVersion.get(bannerItem.banner_version_id) ?? [];
    rows.push(bannerItem);
    bannerItemsByVersion.set(bannerItem.banner_version_id, rows);
  }

  const now = new Date();
  const campaigns = ((versionsResult.data ?? []) as BannerVersionRow[]).flatMap((version) => {
    const banner = bannersById.get(version.banner_id);
    if (!banner) return [];

    const bannerItems = bannerItemsByVersion.get(version.id) ?? [];
    const featuredItems = bannerItems
      .filter((bannerItem) => bannerItem.pool_group === "featured")
      .sort((left, right) => left.sort_order - right.sort_order)
      .flatMap((bannerItem): CampaignFeaturedItem[] => {
        const item = itemsById.get(bannerItem.item_id);
        if (!item || (item.rarity !== 4 && item.rarity !== 5)) return [];
        return [{
          id: item.id,
          imageUrl: normalizeAssetUrl(item.image_url),
          name: item.name,
          rarity: item.rarity,
        }];
      });

    return [{
      bannerId: banner.id,
      bannerType: banner.banner_type,
      coverImageUrl: normalizeAssetUrl(banner.cover_image_url || banner.background_image_url),
      effectiveFrom: version.effective_from,
      effectiveTo: version.effective_to,
      featuredItems,
      id: version.id,
      itemCount: bannerItems.length,
      lifecycle: getCampaignLifecycle(
        {
          effectiveFrom: version.effective_from,
          effectiveTo: version.effective_to,
          status: version.status,
        },
        now,
      ),
      name: banner.name,
      notes: version.notes,
      status: version.status,
      version: version.version,
    } satisfies CampaignSummary];
  });

  return campaigns.sort((left, right) => {
    const priority = LIFECYCLE_PRIORITY[left.lifecycle] - LIFECYCLE_PRIORITY[right.lifecycle];
    if (priority !== 0) return priority;
    return new Date(right.effectiveFrom).getTime() - new Date(left.effectiveFrom).getTime();
  });
}

export async function listCampaignItemOptions(
  supabase: SupabaseClient,
  projectId: string,
): Promise<CampaignItemOption[]> {
  const { data, error } = await supabase
    .schema("gacha")
    .from("items")
    .select("id, name, subtitle, rarity, image_url, item_type, is_enabled")
    .eq("project_id", projectId)
    .eq("item_type", "character")
    .eq("rarity", 5)
    .eq("is_enabled", true)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Campaign item options unavailable: ${error.message}`);
  }

  return ((data ?? []) as CampaignItemOptionRow[]).flatMap((item) => {
    if (item.rarity !== 5) return [];
    return [{
      id: item.id,
      imageUrl: normalizeAssetUrl(item.image_url),
      name: item.name,
      rarity: item.rarity,
      subtitle: item.subtitle,
    } satisfies CampaignItemOption];
  });
}

function normalizeAssetUrl(value: string) {
  const url = value.trim();
  return url.startsWith("https://") || url.startsWith("/") ? url : "";
}
