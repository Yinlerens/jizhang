"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "../actionAuth";
import { buildCompositeDeleteFilter } from "../bulkDelete";

type BannerItemKey = {
  banner_version_id: string;
  item_id: string;
};

export async function deleteBannerItem(banner_version_id: string, item_id: string) {
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("banner_items")
    .delete()
    .eq("project_id", context.project.id)
    .eq("environment_id", context.environment.id)
    .eq("banner_version_id", banner_version_id)
    .eq("item_id", item_id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banner-items");
}

export async function deleteBannerItems(keys: BannerItemKey[]) {
  const filter = buildCompositeDeleteFilter(
    keys.map((key) => [
      ["banner_version_id", key.banner_version_id],
      ["item_id", key.item_id],
    ]),
    "卡池内容",
  );
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("banner_items")
    .delete()
    .eq("project_id", context.project.id)
    .eq("environment_id", context.environment.id)
    .or(filter);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banner-items");
}

export async function upsertBannerItem(formData: FormData) {
  const { context, supabase } = await createGachaAdminClient();
  
  const featured_group = formData.get("featured_group") as string;

  const payload = {
    project_id: context.project.id,
    environment_id: context.environment.id,
    banner_version_id: formData.get("banner_version_id") as string,
    item_id: formData.get("item_id") as string,
    pool_group: formData.get("pool_group") as string || "standard",
    featured_group: featured_group === "null" || !featured_group ? null : featured_group,
    weight: parseInt(formData.get("weight") as string || "1"),
    sort_order: parseInt(formData.get("sort_order") as string || "0"),
  };

  const { error } = await supabase.schema("gacha").from("banner_items").upsert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banner-items");
}
