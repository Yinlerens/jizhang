export type GachaItemType = 'character' | 'weapon';
export type GachaRarity = 3 | 4 | 5;
export type JsonObject = Record<string, unknown>;

export interface GachaItemRow {
  id: string;
  name: string;
  subtitle: string;
  item_type: GachaItemType;
  rarity: GachaRarity;
  element: string;
  role: string;
  faction: string;
  accent: string;
  quote: string;
  image_url: string;
  profile: string;
  is_enabled: boolean;
  metadata: JsonObject;
  created_at: string;
  updated_at: string;
}

export interface GachaBannerRow {
  id: string;
  name: string;
  short_name: string;
  banner_type: 'limited-character' | 'standard';
  description: string;
  cover_image_url: string;
  background_image_url: string;
  mobile_background_image_url: string;
  background_position: string;
  theme: JsonObject;
  sort_order: number;
  is_enabled: boolean;
  metadata: JsonObject;
  created_at: string;
  updated_at: string;
}

export interface GachaBannerVersionRow {
  id: string;
  banner_id: string;
  rule_set_id: string | null;
  version: number;
  status: 'draft' | 'published' | 'archived';
  effective_from: string;
  effective_to: string | null;
  published_at: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface GachaRuleSetRow {
  id: string;
  name: string;
  description: string;
  banner_type: 'limited-character' | 'standard' | null;
  is_enabled: boolean;
  metadata: JsonObject;
  created_at: string;
  updated_at: string;
}

export interface GachaRuleSetRarityRateRow {
  rule_set_id: string;
  rarity: GachaRarity;
  base_rate_ppm: number;
  roll_order: number;
  created_at: string;
  updated_at: string;
}

export interface GachaRuleSetFeaturedRuleRow {
  rule_set_id: string;
  rarity: 4 | 5;
  featured_group: 'five_up' | 'four_up';
  featured_rate_ppm: number;
  guarantee_after_miss: boolean;
  miss_sets_guarantee: boolean;
  guarantee_state_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface GachaRuleSetPityRuleRow {
  rule_set_id: string;
  rarity: 4 | 5;
  counter_key: string;
  hard_pity: number;
  soft_pity_start: number | null;
  soft_pity_increment_ppm: number;
  resets_lower_rarity: boolean;
  created_at: string;
  updated_at: string;
}

export interface GachaBannerItemRow {
  banner_version_id: string;
  item_id: string;
  pool_group: 'standard' | 'featured';
  featured_group: 'five_up' | 'four_up' | null;
  weight: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GachaRarityRateRow {
  banner_version_id: string;
  rarity: GachaRarity;
  base_rate_ppm: number;
  roll_order: number;
  created_at: string;
  updated_at: string;
}

export interface GachaFeaturedRuleRow {
  banner_version_id: string;
  rarity: 4 | 5;
  featured_group: 'five_up' | 'four_up';
  featured_rate_ppm: number;
  guarantee_after_miss: boolean;
  miss_sets_guarantee: boolean;
  guarantee_state_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface GachaPityRuleRow {
  banner_version_id: string;
  rarity: 4 | 5;
  counter_key: string;
  hard_pity: number;
  soft_pity_start: number | null;
  soft_pity_increment_ppm: number;
  resets_lower_rarity: boolean;
  created_at: string;
  updated_at: string;
}
