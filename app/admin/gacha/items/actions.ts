"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "../actionAuth";
import { normalizeBulkTextValues } from "../bulkDelete";

const itemTypes = new Set(["character", "weapon"]);
const rarities = new Set([3, 4, 5]);

export async function deleteItem(id: string) {
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("items")
    .delete()
    .eq("project_id", context.project.id)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/items");
}

export async function deleteItems(ids: string[]) {
  const itemIds = normalizeBulkTextValues(ids, "物品");
  const { context, supabase } = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("items")
    .delete()
    .eq("project_id", context.project.id)
    .in("id", itemIds);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/items");
}

export async function upsertItem(formData: FormData) {
  const { context, supabase } = await createGachaAdminClient();

  const metadataStr = getString(formData, "metadata", 4000);
  let metadata = {};
  if (metadataStr) {
    try {
      metadata = JSON.parse(metadataStr);
      if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
        throw new Error("Invalid metadata JSON");
      }
    } catch {
      throw new Error("Invalid metadata JSON");
    }
  }

  const id = getString(formData, "id", 100);
  const name = getString(formData, "name", 120);
  const itemType = getString(formData, "item_type", 24);
  const rarity = parseInt(getString(formData, "rarity", 1), 10);

  if (!id || !name) {
    throw new Error("物品 ID 和名称必填");
  }

  if (!itemTypes.has(itemType)) {
    throw new Error("物品类型不合法");
  }

  if (!rarities.has(rarity)) {
    throw new Error("稀有度不合法");
  }

  const payload = {
    project_id: context.project.id,
    id,
    name,
    subtitle: getString(formData, "subtitle", 160),
    item_type: itemType,
    rarity,
    element: getString(formData, "element", 40),
    role: getString(formData, "role", 40),
    faction: getString(formData, "faction", 80),
    accent: getString(formData, "accent", 24),
    quote: getString(formData, "quote", 500),
    image_url: getOptionalUrl(formData, "image_url"),
    profile: getString(formData, "profile", 4000),
    is_enabled: formData.get("is_enabled") === "true",
    metadata,
  };

  const { error } = await supabase.schema("gacha").from("items").upsert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gacha/items");
}

function getString(formData: FormData, key: string, maxLength: number) {
  return String(formData.get(key) ?? "").trim().slice(0, maxLength);
}

function getOptionalUrl(formData: FormData, key: string) {
  const value = getString(formData, key, 1000);
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      throw new Error("Invalid URL protocol");
    }

    return url.toString();
  } catch {
    throw new Error("立绘链接必须是 https URL");
  }
}
