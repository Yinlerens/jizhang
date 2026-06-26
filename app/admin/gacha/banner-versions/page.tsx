import { createGachaAdminPageClient } from "../actionAuth";
import {
  BannerVersionsAdminPanel,
  GachaAdminError,
} from "../GachaAdminPanels";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaRuleSetRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function BannerVersionsPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/banner-versions");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const supabase = adminClient.supabase;

  const [
    { data: versions, error: versionsError },
    { data: banners, error: bannersError },
    { data: ruleSets, error: ruleSetsError },
  ] = await Promise.all([
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
      .from("rule_sets")
      .select("*")
      .order("is_enabled", { ascending: false })
      .order("id", { ascending: true }),
  ]);

  if (versionsError || bannersError || ruleSetsError) {
    return (
      <GachaAdminError
        description={`Failed to load data: ${(versionsError || bannersError || ruleSetsError)?.message}`}
      />
    );
  }

  return (
    <BannerVersionsAdminPanel
      banners={(banners ?? []) as GachaBannerRow[]}
      ruleSets={(ruleSets ?? []) as GachaRuleSetRow[]}
      versions={(versions ?? []) as GachaBannerVersionRow[]}
    />
  );
}
