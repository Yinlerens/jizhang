"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "../actionAuth";
import { buildCompositeDeleteFilter } from "../bulkDelete";

type PityRuleKey = {
  banner_version_id: string;
  rarity: number;
};

export async function deletePityRule(banner_version_id: string, rarity: number) {
  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("pity_rules")
    .delete()
    .eq("banner_version_id", banner_version_id)
    .eq("rarity", rarity);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/pity-rules");
}

export async function deletePityRules(keys: PityRuleKey[]) {
  const filter = buildCompositeDeleteFilter(
    keys.map((key) => [
      ["banner_version_id", key.banner_version_id],
      ["rarity", key.rarity],
    ]),
    "水位规则",
  );
  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("pity_rules").delete().or(filter);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/pity-rules");
}

export async function upsertPityRule(formData: FormData) {
  const supabase = await createGachaAdminClient();
  
  const soft_pity_start = formData.get("soft_pity_start") as string;
  const payload = {
    banner_version_id: formData.get("banner_version_id") as string,
    rarity: parseInt(formData.get("rarity") as string),
    counter_key: formData.get("counter_key") as string,
    hard_pity: parseInt(formData.get("hard_pity") as string),
    soft_pity_start: soft_pity_start ? parseInt(soft_pity_start) : null,
    soft_pity_increment_ppm: parseInt(formData.get("soft_pity_increment_ppm") as string || "0"),
    resets_lower_rarity: formData.get("resets_lower_rarity") === "true",
  };

  const { error } = await supabase.schema("gacha").from("pity_rules").upsert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/pity-rules");
}
