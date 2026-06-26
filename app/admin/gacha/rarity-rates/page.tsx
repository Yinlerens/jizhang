import { createGachaAdminPageClient } from "../actionAuth";
import {
  GachaAdminError,
  RarityRatesAdminPanel,
} from "../GachaAdminPanels";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaRarityRateRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function RarityRatesPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/rarity-rates");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const supabase = adminClient.supabase;
  const [
    { data: rates, error: ratesError },
    { data: versions, error: versionsError },
    { data: banners, error: bannersError },
  ] = await Promise.all([
    supabase
      .schema("gacha")
      .from("rarity_rates")
      .select("*")
      .order("rarity", { ascending: false }),
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
  ]);

  const error = ratesError || versionsError || bannersError;

  if (error) {
    return <GachaAdminError description={`Failed to load rarity rates: ${error.message}`} />;
  }

  return (
    <RarityRatesAdminPanel
      banners={(banners ?? []) as GachaBannerRow[]}
      rates={(rates ?? []) as GachaRarityRateRow[]}
      versions={(versions ?? []) as GachaBannerVersionRow[]}
    />
  );
}
