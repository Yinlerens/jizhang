import { redirect } from "next/navigation";
import { createGachaAdminPageClient } from "../actionAuth";
import { BannerItemsAdminPanel } from "../panels/banner-items";
import { GachaAdminError } from "../panels/shared";
import type {
  GachaBannerItemRow,
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaItemRow,
} from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

function retireConfigurationPage(): void {
  redirect("/console/pools");
}

export default async function BannerItemsPage() {
  retireConfigurationPage();

  const adminClient = await createGachaAdminPageClient("/admin/gacha/banner-items");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
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
      .eq("project_id", context.project.id)
      .eq("environment_id", context.environment.id)
      .order("sort_order", { ascending: true }),
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
      .from("items")
      .select("*")
      .eq("project_id", context.project.id)
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
