"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "../actionAuth";
import { buildCompositeDeleteFilter } from "../bulkDelete";

type FeaturedRuleKey = {
  banner_version_id: string;
  rarity: number;
  featured_group: string;
};

export async function deleteFeaturedRule(banner_version_id: string, rarity: number, featured_group: string) {
  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("featured_rules")
    .delete()
    .eq("banner_version_id", banner_version_id)
    .eq("rarity", rarity)
    .eq("featured_group", featured_group);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/featured-rules");
}

export async function deleteFeaturedRules(keys: FeaturedRuleKey[]) {
  const filter = buildCompositeDeleteFilter(
    keys.map((key) => [
      ["banner_version_id", key.banner_version_id],
      ["rarity", key.rarity],
      ["featured_group", key.featured_group],
    ]),
    "UP 保底规则",
  );
  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("featured_rules").delete().or(filter);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/featured-rules");
}

export async function upsertFeaturedRule(formData: FormData) {
  const supabase = await createGachaAdminClient();
  
  const guarantee_state_key = formData.get("guarantee_state_key") as string;
  const payload = {
    banner_version_id: formData.get("banner_version_id") as string,
    rarity: parseInt(formData.get("rarity") as string),
    featured_group: formData.get("featured_group") as string,
    featured_rate_ppm: parseInt(formData.get("featured_rate_ppm") as string),
    guarantee_after_miss: formData.get("guarantee_after_miss") === "true",
    miss_sets_guarantee: formData.get("miss_sets_guarantee") === "true",
    guarantee_state_key: guarantee_state_key || null,
  };

  const { error } = await supabase.schema("gacha").from("featured_rules").upsert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/featured-rules");
}
