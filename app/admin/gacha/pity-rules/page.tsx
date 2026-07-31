import { redirect } from "next/navigation";
import { createGachaAdminPageClient } from "../actionAuth";
import { PityRulesAdminPanel } from "../panels/pity-rules";
import { GachaAdminError } from "../panels/shared";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaPityRuleRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

function retireConfigurationPage(): void {
  redirect("/console/pools");
}

export default async function PityRulesPage() {
  retireConfigurationPage();

  const adminClient = await createGachaAdminPageClient("/admin/gacha/pity-rules");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const [
    { data: rules, error: rulesError },
    { data: versions, error: versionsError },
    { data: banners, error: bannersError },
  ] = await Promise.all([
    supabase
      .schema("gacha")
      .from("pity_rules")
      .select("*")
      .eq("project_id", context.project.id)
      .eq("environment_id", context.environment.id)
      .order("rarity", { ascending: false }),
    supabase
      .schema("gacha")
      .from("banner_versions")
      .select("*")
      .eq("project_id", context.project.id)
      .eq("environment_id", context.environment.id)
      .order("effective_from", { ascending: false }),
    supabase
      .schema("gacha")
      .from("banners")
      .select("*")
      .eq("project_id", context.project.id)
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
