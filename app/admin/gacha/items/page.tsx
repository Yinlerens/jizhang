import { createGachaAdminPageClient } from "../actionAuth";
import {
  GachaAdminError,
  ItemsAdminPanel,
} from "../GachaAdminPanels";
import type { GachaItemRow } from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/items");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const supabase = adminClient.supabase;
  const { data: items, error } = await supabase
    .schema("gacha")
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <GachaAdminError description={`Failed to load items: ${error.message}`} />;
  }

  return <ItemsAdminPanel items={(items ?? []) as GachaItemRow[]} />;
}
