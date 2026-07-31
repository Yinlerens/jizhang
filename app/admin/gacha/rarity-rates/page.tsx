import { redirect } from "next/navigation";
import { createGachaAdminPageClient } from "../actionAuth";
import { RarityRatesAdminPanel } from "../panels/rarity-rates";
import { GachaAdminError } from "../panels/shared";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaRarityRateRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

function retireConfigurationPage(): void {
  redirect("/console/pools");
}

export default async function RarityRatesPage() {
  retireConfigurationPage();

  const adminClient = await createGachaAdminPageClient("/admin/gacha/rarity-rates");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const [
    { data: rates, error: ratesError },
    { data: versions, error: versionsError },
    { data: banners, error: bannersError },
  ] = await Promise.all([
    supabase
      .schema("gacha")
      .from("rarity_rates")
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
