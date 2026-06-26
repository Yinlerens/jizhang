import { createGachaAdminPageClient } from "../actionAuth";
import {
  GachaAdminError,
  PityRulesAdminPanel,
} from "../GachaAdminPanels";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaPityRuleRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function PityRulesPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/pity-rules");
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
      .from("pity_rules")
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
    return <GachaAdminError description={`Failed to load pity rules: ${error.message}`} />;
  }

  return (
    <PityRulesAdminPanel
      banners={(banners ?? []) as GachaBannerRow[]}
      rules={(rules ?? []) as GachaPityRuleRow[]}
      versions={(versions ?? []) as GachaBannerVersionRow[]}
    />
  );
}
