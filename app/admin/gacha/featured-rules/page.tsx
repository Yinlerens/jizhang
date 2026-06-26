import { createGachaAdminPageClient } from "../actionAuth";
import {
  FeaturedRulesAdminPanel,
  GachaAdminError,
} from "../GachaAdminPanels";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaFeaturedRuleRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function FeaturedRulesPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/featured-rules");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const supabase = adminClient.supabase;
  const [
    { data: rules, error: rulesError },
    { data: versions, error: versionsError },
    { data: banners, error: bannersError },
  ] = await Promise.all([
    supabase
      .schema("gacha")
      .from("featured_rules")
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

  const error = rulesError || versionsError || bannersError;

  if (error) {
    return <GachaAdminError description={`Failed to load featured rules: ${error.message}`} />;
  }

  return (
    <FeaturedRulesAdminPanel
      banners={(banners ?? []) as GachaBannerRow[]}
      rules={(rules ?? []) as GachaFeaturedRuleRow[]}
      versions={(versions ?? []) as GachaBannerVersionRow[]}
    />
  );
}
