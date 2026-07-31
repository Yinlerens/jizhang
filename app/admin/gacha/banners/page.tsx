import { redirect } from "next/navigation";
import { createGachaAdminPageClient } from "../actionAuth";
import { BannersAdminPanel } from "../panels/banners";
import { GachaAdminError } from "../panels/shared";
import type { GachaBannerRow } from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

function retireConfigurationPage(): void {
  redirect("/console/pools");
}

export default async function BannersPage() {
  retireConfigurationPage();

  const adminClient = await createGachaAdminPageClient("/admin/gacha/banners");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const { data: banners, error } = await supabase
    .schema("gacha")
    .from("banners")
    .select("*")
    .eq("project_id", context.project.id)
    .order("sort_order", { ascending: true });

  if (error) {
    return <GachaAdminError description={`Failed to load banners: ${error.message}`} />;
  }

  return <BannersAdminPanel banners={(banners ?? []) as GachaBannerRow[]} />;
}
