import { createGachaAdminPageClient } from "../actionAuth";
import {
  BannerItemsAdminPanel,
  GachaAdminError,
} from "../GachaAdminPanels";
import type {
  GachaBannerItemRow,
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaItemRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function BannerItemsPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/banner-items");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const supabase = adminClient.supabase;
  const [
    { data: bannerItems, error: bannerItemsError },
    { data: versions, error: versionsError },
    { data: banners, error: bannersError },
    { data: items, error: itemsError },
  ] = await Promise.all([
    supabase
      .schema("gacha")
      .from("banner_items")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .schema("gacha")
      .from("banner_versions")
      .select("*")
      .order("effective_from", { ascending: false }),
    supabase
      .schema("gacha")
      .from("banners")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .schema("gacha")
      .from("items")
      .select("*")
      .order("rarity", { ascending: false })
      .order("name", { ascending: true }),
  ]);

  const error = bannerItemsError || versionsError || bannersError || itemsError;

  if (error) {
    return <GachaAdminError description={`Failed to load banner items: ${error.message}`} />;
  }

  return (
    <BannerItemsAdminPanel
      bannerItems={(bannerItems ?? []) as GachaBannerItemRow[]}
      banners={(banners ?? []) as GachaBannerRow[]}
      items={(items ?? []) as GachaItemRow[]}
      versions={(versions ?? []) as GachaBannerVersionRow[]}
    />
  );
}
