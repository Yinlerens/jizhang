"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "../actionAuth";
import { normalizeBulkTextValues } from "../bulkDelete";

export async function deleteBannerVersion(id: string) {
  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("banner_versions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banner-versions");
}

export async function deleteBannerVersions(ids: string[]) {
  const versionIds = normalizeBulkTextValues(ids, "卡池档期");
  const supabase = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("banner_versions")
    .delete()
    .in("id", versionIds);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banner-versions");
}

export async function upsertBannerVersion(formData: FormData) {
  const supabase = await createGachaAdminClient();
  
  const id = formData.get("id") as string;
  const payload: {
    id?: string;
    banner_id: string;
    rule_set_id: string | null;
    version: number;
    status: string;
    effective_from: string;
    effective_to: string | null;
    published_at: string | null;
    notes: string;
  } = {
    banner_id: formData.get("banner_id") as string,
    rule_set_id: null,
    version: parseInt(formData.get("version") as string || "1"),
    status: formData.get("status") as string,
    effective_from: formData.get("effective_from") as string || new Date().toISOString(),
    effective_to: null,
    published_at: null,
    notes: formData.get("notes") as string,
  };

  if (id) {
    payload.id = id;
  }

  const rule_set_id = formData.get("rule_set_id") as string;
  payload.rule_set_id = rule_set_id || null;

  const effective_to = formData.get("effective_to") as string;
  if (effective_to) payload.effective_to = effective_to;
  else payload.effective_to = null;

  const published_at = formData.get("published_at") as string;
  if (published_at) payload.published_at = published_at;
  else payload.published_at = null;

  const { error } = await supabase.schema("gacha").from("banner_versions").upsert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/banner-versions");
}
