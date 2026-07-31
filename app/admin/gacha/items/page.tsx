import { createGachaAdminPageClient } from "../actionAuth";
import { ItemsAdminPanel } from "../panels/items";
import { GachaAdminError } from "../panels/shared";
import type { GachaItemRow } from "@/lib/supabase/database.gacha.types";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const adminClient = await createGachaAdminPageClient("/admin/gacha/items");
  if (!adminClient.ok) {
    return <GachaAdminError description={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  const { data: items, error } = await supabase
    .schema("gacha")
    .from("items")
    .select("*")
    .eq("project_id", context.project.id)
    .order("created_at", { ascending: false });

  if (error) {
    return <GachaAdminError description={`Failed to load items: ${error.message}`} />;
  }

  return <ItemsAdminPanel items={(items ?? []) as GachaItemRow[]} />;
}
