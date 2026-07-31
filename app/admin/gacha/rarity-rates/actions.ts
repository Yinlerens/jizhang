"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "../actionAuth";
import { buildCompositeDeleteFilter } from "../bulkDelete";

type RarityRateKey = {
  banner_version_id: string;
  rarity: number;
};

export async function deleteRarityRate(banner_version_id: string, rarity: number) {
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("rarity_rates")
    .delete()
    .eq("project_id", context.project.id)
    .eq("environment_id", context.environment.id)
    .eq("banner_version_id", banner_version_id)
    .eq("rarity", rarity);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/rarity-rates");
}

export async function deleteRarityRates(keys: RarityRateKey[]) {
  const filter = buildCompositeDeleteFilter(
    keys.map((key) => [
      ["banner_version_id", key.banner_version_id],
      ["rarity", key.rarity],
    ]),
    "基础概率",
  );
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("rarity_rates")
    .delete()
    .eq("project_id", context.project.id)
    .eq("environment_id", context.environment.id)
    .or(filter);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/rarity-rates");
}

export async function upsertRarityRate(formData: FormData) {
  const { context, supabase } = await createGachaAdminClient();
  
  const payload = {
    project_id: context.project.id,
    environment_id: context.environment.id,
    banner_version_id: formData.get("banner_version_id") as string,
    rarity: parseInt(formData.get("rarity") as string),
    base_rate_ppm: parseInt(formData.get("base_rate_ppm") as string),
    roll_order: parseInt(formData.get("roll_order") as string || "1"),
  };

  const { error } = await supabase.schema("gacha").from("rarity_rates").upsert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/rarity-rates");
}
