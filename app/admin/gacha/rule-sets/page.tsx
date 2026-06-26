import { createGachaAdminPageClient } from "../actionAuth";
import { GachaAdminError, RuleSetsAdminPanel } from "../GachaAdminPanels";
import type {
  GachaRuleSetFeaturedRuleRow,
  GachaRuleSetPityRuleRow,
  GachaRuleSetRarityRateRow,
  GachaRuleSetRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function RuleSetsPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/rule-sets");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const supabase = adminClient.supabase;
  const [
    { data: ruleSets, error: ruleSetsError },
    { data: rarityRates, error: rarityRatesError },
    { data: featuredRules, error: featuredRulesError },
    { data: pityRules, error: pityRulesError },
  ] = await Promise.all([
    supabase
      .schema("gacha")
      .from("rule_sets")
      .select("*")
      .order("is_enabled", { ascending: false })
      .order("banner_type", { ascending: true })
      .order("id", { ascending: true }),
    supabase
      .schema("gacha")
      .from("rule_set_rarity_rates")
      .select("*")
      .order("rule_set_id", { ascending: true })
      .order("roll_order", { ascending: true }),
    supabase
      .schema("gacha")
      .from("rule_set_featured_rules")
      .select("*")
      .order("rule_set_id", { ascending: true })
      .order("rarity", { ascending: false }),
    supabase
      .schema("gacha")
      .from("rule_set_pity_rules")
      .select("*")
      .order("rule_set_id", { ascending: true })
      .order("rarity", { ascending: false }),
  ]);

  const error = ruleSetsError || rarityRatesError || featuredRulesError || pityRulesError;

  if (error) {
    return <GachaAdminError description={`Failed to load rule sets: ${error.message}`} />;
  }

  return (
    <RuleSetsAdminPanel
      featuredRules={(featuredRules ?? []) as GachaRuleSetFeaturedRuleRow[]}
      pityRules={(pityRules ?? []) as GachaRuleSetPityRuleRow[]}
      rarityRates={(rarityRates ?? []) as GachaRuleSetRarityRateRow[]}
      ruleSets={(ruleSets ?? []) as GachaRuleSetRow[]}
    />
  );
}
