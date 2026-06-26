"use server";

import { revalidatePath } from "next/cache";
import { createGachaAdminClient } from "../actionAuth";
import { buildCompositeDeleteFilter, normalizeBulkTextValues } from "../bulkDelete";

const bannerTypes = new Set(["limited-character", "standard"]);
const rarities = new Set([3, 4, 5]);
const highRarities = new Set([4, 5]);
const featuredGroups = new Set(["five_up", "four_up"]);
const revalidateRuleSets = () => revalidatePath("/admin/gacha/rule-sets");

type RuleSetRarityRateKey = {
  rule_set_id: string;
  rarity: number;
};

type RuleSetFeaturedRuleKey = {
  rule_set_id: string;
  rarity: number;
  featured_group: string;
};

type RuleSetPityRuleKey = {
  rule_set_id: string;
  rarity: number;
};

export async function deleteRuleSet(id: string) {
  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("rule_sets").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function deleteRuleSets(ids: string[]) {
  const ruleSetIds = normalizeBulkTextValues(ids, "规则包");
  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("rule_sets").delete().in("id", ruleSetIds);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function upsertRuleSet(formData: FormData) {
  const supabase = await createGachaAdminClient();

  const id = getString(formData, "id", 100);
  const name = getString(formData, "name", 120);
  const bannerType = getString(formData, "banner_type", 40);
  const metadata = parseMetadata(formData);

  if (!id || !name) {
    throw new Error("规则包 ID 和名称必填");
  }

  if (bannerType && !bannerTypes.has(bannerType)) {
    throw new Error("卡池类型不合法");
  }

  const payload = {
    id,
    name,
    description: getString(formData, "description", 1000),
    banner_type: bannerType || null,
    is_enabled: formData.get("is_enabled") === "true",
    metadata,
  };

  const { error } = await supabase.schema("gacha").from("rule_sets").upsert(payload);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function deleteRuleSetRarityRate(rule_set_id: string, rarity: number) {
  const supabase = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("rule_set_rarity_rates")
    .delete()
    .eq("rule_set_id", rule_set_id)
    .eq("rarity", rarity);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function deleteRuleSetRarityRates(keys: RuleSetRarityRateKey[]) {
  const filter = buildCompositeDeleteFilter(
    keys.map((key) => [
      ["rule_set_id", key.rule_set_id],
      ["rarity", key.rarity],
    ]),
    "模板基础概率",
  );
  const supabase = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("rule_set_rarity_rates")
    .delete()
    .or(filter);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function upsertRuleSetRarityRate(formData: FormData) {
  const rule_set_id = getString(formData, "rule_set_id", 100);
  const rarity = getInteger(formData, "rarity");

  if (!rule_set_id || !rarities.has(rarity)) {
    throw new Error("模板和稀有度不合法");
  }

  const payload = {
    rule_set_id,
    rarity,
    base_rate_ppm: getInteger(formData, "base_rate_ppm"),
    roll_order: getInteger(formData, "roll_order", 1),
  };

  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("rule_set_rarity_rates").upsert(payload);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function deleteRuleSetFeaturedRule(
  rule_set_id: string,
  rarity: number,
  featured_group: string,
) {
  const supabase = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("rule_set_featured_rules")
    .delete()
    .eq("rule_set_id", rule_set_id)
    .eq("rarity", rarity)
    .eq("featured_group", featured_group);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function deleteRuleSetFeaturedRules(keys: RuleSetFeaturedRuleKey[]) {
  const filter = buildCompositeDeleteFilter(
    keys.map((key) => [
      ["rule_set_id", key.rule_set_id],
      ["rarity", key.rarity],
      ["featured_group", key.featured_group],
    ]),
    "模板 UP 规则",
  );
  const supabase = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("rule_set_featured_rules")
    .delete()
    .or(filter);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function upsertRuleSetFeaturedRule(formData: FormData) {
  const rule_set_id = getString(formData, "rule_set_id", 100);
  const rarity = getInteger(formData, "rarity");
  const featured_group = getString(formData, "featured_group", 40);

  if (!rule_set_id || !highRarities.has(rarity) || !featuredGroups.has(featured_group)) {
    throw new Error("模板、稀有度或 UP 组不合法");
  }

  const guaranteeStateKey = getString(formData, "guarantee_state_key", 100);
  const payload = {
    rule_set_id,
    rarity,
    featured_group,
    featured_rate_ppm: getInteger(formData, "featured_rate_ppm"),
    guarantee_after_miss: formData.get("guarantee_after_miss") === "true",
    miss_sets_guarantee: formData.get("miss_sets_guarantee") === "true",
    guarantee_state_key: guaranteeStateKey || null,
  };

  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("rule_set_featured_rules").upsert(payload);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function deleteRuleSetPityRule(rule_set_id: string, rarity: number) {
  const supabase = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("rule_set_pity_rules")
    .delete()
    .eq("rule_set_id", rule_set_id)
    .eq("rarity", rarity);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function deleteRuleSetPityRules(keys: RuleSetPityRuleKey[]) {
  const filter = buildCompositeDeleteFilter(
    keys.map((key) => [
      ["rule_set_id", key.rule_set_id],
      ["rarity", key.rarity],
    ]),
    "模板保底规则",
  );
  const supabase = await createGachaAdminClient();
  const { error } = await supabase
    .schema("gacha")
    .from("rule_set_pity_rules")
    .delete()
    .or(filter);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

export async function upsertRuleSetPityRule(formData: FormData) {
  const rule_set_id = getString(formData, "rule_set_id", 100);
  const rarity = getInteger(formData, "rarity");

  if (!rule_set_id || !highRarities.has(rarity)) {
    throw new Error("模板或稀有度不合法");
  }

  const softPityStart = getString(formData, "soft_pity_start", 10);
  const payload = {
    rule_set_id,
    rarity,
    counter_key: getString(formData, "counter_key", 100),
    hard_pity: getInteger(formData, "hard_pity"),
    soft_pity_start: softPityStart ? parseInt(softPityStart, 10) : null,
    soft_pity_increment_ppm: getInteger(formData, "soft_pity_increment_ppm", 0),
    resets_lower_rarity: formData.get("resets_lower_rarity") === "true",
  };

  const supabase = await createGachaAdminClient();
  const { error } = await supabase.schema("gacha").from("rule_set_pity_rules").upsert(payload);
  if (error) throw new Error(error.message);
  revalidateRuleSets();
}

function getString(formData: FormData, key: string, maxLength: number) {
  return String(formData.get(key) ?? "").trim().slice(0, maxLength);
}

function getInteger(formData: FormData, key: string, fallback?: number) {
  const rawValue = getString(formData, key, 20);
  if (!rawValue && fallback !== undefined) {
    return fallback;
  }

  const parsed = parseInt(rawValue, 10);
  if (!Number.isInteger(parsed)) {
    throw new Error(`${key} 必须是整数`);
  }

  return parsed;
}

function parseMetadata(formData: FormData) {
  const metadataStr = getString(formData, "metadata", 4000);
  if (!metadataStr) {
    return {};
  }

  try {
    const metadata = JSON.parse(metadataStr);
    if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
      throw new Error("Invalid metadata JSON");
    }

    return metadata;
  } catch {
    throw new Error("元数据必须是 JSON 对象");
  }
}
