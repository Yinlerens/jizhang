import { BANNERS, GACHA_ITEMS, ITEM_BY_ID } from "./data";
import type {
  Banner,
  BannerPoolEntry,
  GachaFeaturedRule,
  GachaItem,
  GachaRarity,
  GachaRarityRule,
  PityState,
  PullRecord,
  StoredGachaState,
} from "./types";

export const GACHA_STORAGE_KEY = "gachaops:sandbox:state:v1";
export const LEGACY_GACHA_STORAGE_KEY = "wuwa-static-gacha-v1";
export const ASTRITE_PER_PULL = 160;

export function createInitialPity(): PityState {
  return {
    sinceFive: 0,
    sinceFour: 0,
    guaranteedFeaturedFive: false,
    guarantees: {},
  };
}

export function createInitialGachaState(banners: Banner[] = BANNERS): StoredGachaState {
  return {
    currencies: {
      tides: 0,
      astrite: 12800,
    },
    history: [],
    inventory: {},
    pity: Object.fromEntries(banners.map((banner) => [banner.id, createInitialPity()])),
  };
}

export function normalizeGachaState(value: unknown, banners: Banner[] = BANNERS): StoredGachaState {
  const fallback = createInitialGachaState(banners);

  if (!value || typeof value !== "object") {
    return fallback;
  }

  const partial = value as Partial<StoredGachaState>;
  const partialPity =
    partial.pity && typeof partial.pity === "object" ? partial.pity : {};
  const bannerIds = new Set(banners.map((banner) => banner.id));

  return {
    currencies: {
      tides: Number(partial.currencies?.tides ?? fallback.currencies.tides),
      astrite: Number(partial.currencies?.astrite ?? fallback.currencies.astrite),
    },
    history: Array.isArray(partial.history)
      ? partial.history.filter((record) => bannerIds.has(record.bannerId)).slice(0, 600)
      : fallback.history,
    inventory: partial.inventory && typeof partial.inventory === "object" ? partial.inventory : fallback.inventory,
    pity: Object.fromEntries(
      banners.map((banner) => [banner.id, normalizePityState(partialPity[banner.id])]),
    ),
  };
}

export function getPullCapacity(state: StoredGachaState): number {
  return Math.floor(state.currencies.astrite / ASTRITE_PER_PULL);
}

export function consumeCurrency(state: StoredGachaState, count: number): StoredGachaState {
  return {
    ...state,
    currencies: {
      ...state.currencies,
      astrite: state.currencies.astrite - count * ASTRITE_PER_PULL,
    },
  };
}

export function performPulls(params: {
  banner: Banner;
  count: number;
  state: StoredGachaState;
  items?: GachaItem[];
}): {
  records: PullRecord[];
  state: StoredGachaState;
} {
  const bannerPity = normalizePityState(params.state.pity[params.banner.id]);
  const items = params.items ?? GACHA_ITEMS;
  const itemById = Object.fromEntries(items.map((item) => [item.id, item])) as Record<string, GachaItem>;
  const inventory = { ...params.state.inventory };
  const records: PullRecord[] = [];

  for (let index = 0; index < params.count; index += 1) {
    const pityAtFive = bannerPity.sinceFive + 1;
    const pityAtFour = bannerPity.sinceFour + 1;
    const rarity = rollRarity(params.banner, bannerPity, itemById);
    const item = rollItem(params.banner, rarity, bannerPity, items, itemById);
    const isFeatured = isFeaturedItem(params.banner, item);

    updatePityCounters(bannerPity, params.banner, rarity);
    updateFeaturedGuarantees(bannerPity, params.banner, rarity, item.id);

    inventory[item.id] = (inventory[item.id] ?? 0) + 1;
    records.push({
      id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
      itemId: item.id,
      itemName: item.name,
      itemType: item.type,
      rarity,
      bannerId: params.banner.id,
      bannerName: params.banner.name,
      at: new Date().toISOString(),
      pityAtFive,
      pityAtFour,
      isFeatured,
    });
  }

  return {
    records,
    state: {
      ...params.state,
      history: [...records, ...params.state.history].slice(0, 600),
      inventory,
      pity: {
        ...params.state.pity,
        [params.banner.id]: bannerPity,
      },
    },
  };
}

export function getRarityRule(banner: Banner, rarity: GachaRarity) {
  return banner.rarityRules.find((rule) => rule.rarity === rarity);
}

export function getFeaturedRuleForRarity(banner: Banner, rarity: GachaRarity) {
  return banner.featuredRules.find((rule) => rule.rarity === rarity);
}

export function getFeaturedGuaranteeKey(rule: GachaFeaturedRule) {
  return rule.guaranteeStateKey || `${rule.rarity}:${rule.featuredGroup}`;
}

export function isFeaturedGuaranteeActive(pity: PityState | undefined, rule: GachaFeaturedRule | undefined) {
  if (!pity || !rule || !rule.guaranteeAfterMiss) {
    return false;
  }

  return Boolean(
    pity.guarantees?.[getFeaturedGuaranteeKey(rule)] ??
      (rule.rarity === 5 ? pity.guaranteedFeaturedFive : false),
  );
}

function normalizePityState(value: unknown): PityState {
  if (!value || typeof value !== "object") {
    return createInitialPity();
  }

  const partial = value as Partial<PityState>;

  return {
    sinceFive: nonNegativeInteger(partial.sinceFive),
    sinceFour: nonNegativeInteger(partial.sinceFour),
    guaranteedFeaturedFive: Boolean(partial.guaranteedFeaturedFive),
    guarantees: normalizeGuarantees(partial.guarantees),
  };
}

function normalizeGuarantees(value: unknown) {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, boolean] => typeof entry[1] === "boolean"),
  );
}

function nonNegativeInteger(value: unknown) {
  const nextValue = Number(value ?? 0);
  return Number.isFinite(nextValue) && nextValue > 0 ? Math.floor(nextValue) : 0;
}

function rollRarity(
  banner: Banner,
  pity: PityState,
  itemById: Record<string, GachaItem>,
): GachaRarity {
  const rules = getRollableRarityRules(banner, itemById);

  for (const rule of rules) {
    const hardPity = rule.hardPity ?? 0;
    if (hardPity > 0 && getPityCount(pity, rule.rarity) + 1 >= hardPity) {
      return rule.rarity;
    }
  }

  const roll = Math.floor(Math.random() * 1_000_000);
  let cursor = 0;

  for (const rule of rules) {
    cursor += getEffectiveRatePpm(rule, getPityCount(pity, rule.rarity) + 1);
    if (roll < cursor) {
      return rule.rarity;
    }
  }

  return getLowestAvailableRarity(banner, itemById);
}

function getRollableRarityRules(banner: Banner, itemById: Record<string, GachaItem>) {
  const availableRarities = new Set(
    getPoolEntries(banner)
      .map((entry) => itemById[entry.itemId]?.rarity)
      .filter((rarity): rarity is GachaRarity => Boolean(rarity)),
  );

  return banner.rarityRules
    .filter((rule) => availableRarities.has(rule.rarity))
    .slice()
    .sort((a, b) => a.rollOrder - b.rollOrder || b.rarity - a.rarity);
}

function getEffectiveRatePpm(rule: GachaRarityRule, pityAt: number) {
  let rate = rule.baseRatePpm;

  if (rule.softPityStart && pityAt >= rule.softPityStart) {
    rate += (pityAt - rule.softPityStart + 1) * rule.softPityIncrementPpm;
  }

  return clampPpm(rate);
}

function getLowestAvailableRarity(banner: Banner, itemById: Record<string, GachaItem>) {
  const rarities = getPoolEntries(banner)
    .map((entry) => itemById[entry.itemId]?.rarity)
    .filter((rarity): rarity is GachaRarity => Boolean(rarity));

  return rarities.length > 0 ? rarities.slice().sort((a, b) => a - b)[0] : 3;
}

function rollItem(
  banner: Banner,
  rarity: GachaRarity,
  pity: PityState,
  items: GachaItem[] = GACHA_ITEMS,
  itemById: Record<string, GachaItem> = ITEM_BY_ID,
): GachaItem {
  const entries = getWeightedEntriesForRarity(banner, rarity, itemById);
  const featuredRule = getFeaturedRuleForRarity(banner, rarity);

  if (featuredRule) {
    const featuredEntries = entries.filter((entry) => entry.featuredGroup === featuredRule.featuredGroup);
    const shouldUseFeatured =
      featuredEntries.length > 0 &&
      (isFeaturedGuaranteeActive(pity, featuredRule) ||
        Math.random() * 1_000_000 < featuredRule.featuredRatePpm);

    if (shouldUseFeatured) {
      return pickWeighted(featuredEntries);
    }

    const standardEntries = entries.filter((entry) => entry.featuredGroup !== featuredRule.featuredGroup);
    if (standardEntries.length > 0) {
      return pickWeighted(standardEntries);
    }
  }

  if (entries.length > 0) {
    return pickWeighted(entries);
  }

  const fallbackPool = items.filter((item) => item.rarity === rarity);
  return pickRandom(
    fallbackPool.length > 0
      ? fallbackPool
      : GACHA_ITEMS.filter((item) => item.rarity === rarity),
  );
}

function getPoolEntries(banner: Banner): BannerPoolEntry[] {
  if (banner.poolEntries.length > 0) {
    return banner.poolEntries;
  }

  return banner.itemPool.map((itemId, index) => ({
    itemId,
    poolGroup: "standard",
    featuredGroup: null,
    weight: 1,
    sortOrder: index,
  }));
}

function getWeightedEntriesForRarity(
  banner: Banner,
  rarity: GachaRarity,
  itemById: Record<string, GachaItem>,
) {
  return getPoolEntries(banner)
    .map((entry) => {
      const item = itemById[entry.itemId];
      if (!item || item.rarity !== rarity) {
        return null;
      }

      return {
        ...entry,
        item,
        weight: Math.max(0, entry.weight),
      };
    })
    .filter((entry): entry is BannerPoolEntry & { item: GachaItem } => Boolean(entry));
}

function isFeaturedItem(banner: Banner, item: GachaItem): boolean {
  return getPoolEntries(banner).some(
    (entry) => entry.itemId === item.id && entry.poolGroup === "featured" && Boolean(entry.featuredGroup),
  );
}

function updatePityCounters(pity: PityState, banner: Banner, rarity: GachaRarity) {
  const outcomeRule = getRarityRule(banner, rarity);

  for (const rule of banner.rarityRules) {
    if (rule.rarity !== 4 && rule.rarity !== 5) {
      continue;
    }

    const shouldReset =
      rarity === rule.rarity || (rarity > rule.rarity && Boolean(outcomeRule?.resetsLowerRarity));

    setPityCount(pity, rule.rarity, shouldReset ? 0 : getPityCount(pity, rule.rarity) + 1);
  }
}

function updateFeaturedGuarantees(
  pity: PityState,
  banner: Banner,
  rarity: GachaRarity,
  itemId: string,
) {
  const featuredRule = getFeaturedRuleForItem(banner, rarity, itemId) ?? getFeaturedRuleForRarity(banner, rarity);
  if (!featuredRule?.guaranteeAfterMiss) {
    return;
  }

  const key = getFeaturedGuaranteeKey(featuredRule);
  const isFeaturedForRule = getPoolEntries(banner).some(
    (entry) =>
      entry.itemId === itemId &&
      entry.poolGroup === "featured" &&
      entry.featuredGroup === featuredRule.featuredGroup,
  );

  if (isFeaturedForRule) {
    pity.guarantees[key] = false;
  } else if (featuredRule.missSetsGuarantee) {
    pity.guarantees[key] = true;
  }

  if (featuredRule.rarity === 5) {
    pity.guaranteedFeaturedFive = Boolean(pity.guarantees[key]);
  }
}

function getFeaturedRuleForItem(
  banner: Banner,
  rarity: GachaRarity,
  itemId: string,
) {
  const entry = getPoolEntries(banner).find((item) => item.itemId === itemId);
  if (!entry?.featuredGroup) {
    return undefined;
  }

  return banner.featuredRules.find(
    (rule) => rule.rarity === rarity && rule.featuredGroup === entry.featuredGroup,
  );
}

function getPityCount(pity: PityState, rarity: GachaRarity) {
  if (rarity === 5) {
    return pity.sinceFive;
  }

  if (rarity === 4) {
    return pity.sinceFour;
  }

  return 0;
}

function setPityCount(pity: PityState, rarity: GachaRarity, value: number) {
  if (rarity === 5) {
    pity.sinceFive = value;
  } else if (rarity === 4) {
    pity.sinceFour = value;
  }
}

function clampPpm(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(1_000_000, Math.round(value)));
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function pickWeighted<T extends { weight: number; item: GachaItem }>(entries: T[]): GachaItem {
  const totalWeight = entries.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);

  if (totalWeight <= 0) {
    return pickRandom(entries).item;
  }

  let roll = Math.random() * totalWeight;
  for (const entry of entries) {
    roll -= Math.max(0, entry.weight);
    if (roll <= 0) {
      return entry.item;
    }
  }

  return entries[entries.length - 1].item;
}
