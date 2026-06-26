import { createGachaAdminPageClient } from "../actionAuth";
import {
  BannersAdminPanel,
  GachaAdminError,
} from "../GachaAdminPanels";
import type { GachaBannerRow } from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/banners");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const supabase = adminClient.supabase;
  const { data: banners, error } = await supabase
    .schema("gacha")
    .from("banners")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return <GachaAdminError description={`Failed to load banners: ${error.message}`} />;
  }

  return <BannersAdminPanel banners={(banners ?? []) as GachaBannerRow[]} />;
}
