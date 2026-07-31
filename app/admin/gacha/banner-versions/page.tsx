import { redirect } from "next/navigation";
import { createGachaAdminPageClient } from "../actionAuth";
import { BannerVersionsAdminPanel } from "../panels/banner-versions";
import { GachaAdminError } from "../panels/shared";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaRuleSetRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

function retireConfigurationPage(): void {
  redirect("/console/pools");
}

export default async function BannerVersionsPage() {
  retireConfigurationPage();

  const adminClient = await createGachaAdminPageClient("/admin/gacha/banner-versions");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const { context, supabase } = adminClient;

  const [
    { data: versions, error: versionsError },
    { data: banners, error: bannersError },
    { data: ruleSets, error: ruleSetsError },
  ] = await Promise.all([
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
    supabase
      .schema("gacha")
      .from("rule_sets")
      .select("*")
      .eq("project_id", context.project.id)
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
