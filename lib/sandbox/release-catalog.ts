import type {
  Banner,
  BannerPoolEntry,
  BannerTheme,
  FeaturedGroup,
  GachaFeaturedRule,
  GachaRarityRule,
} from "../gacha/types.ts";
import type {
  GachaBannerItemRow,
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaFeaturedRuleRow,
  GachaItemRow,
  GachaPityRuleRow,
  GachaRarityRateRow,
  GachaRuleSetFeaturedRuleRow,
  GachaRuleSetPityRuleRow,
  GachaRuleSetRarityRateRow,
  JsonObject,
} from "../supabase/database.gacha.types.ts";

export type SandboxCatalog = {
  banners: Banner[];
};

type SnapshotItemRow = Pick<GachaItemRow, "id" | "rarity">;
type SnapshotBannerRow = Pick<
  GachaBannerRow,
  "id" | "name" | "short_name" | "banner_type" | "description" | "sort_order" | "theme"
> &
  Partial<
    Pick<
      GachaBannerRow,
      | "cover_image_url"
      | "background_image_url"
      | "mobile_background_image_url"
      | "background_position"
    >
  >;
type SnapshotBannerVersionRow = Pick<
  GachaBannerVersionRow,
  | "id"
  | "banner_id"
  | "rule_set_id"
  | "status"
  | "effective_from"
  | "effective_to"
>;
type SnapshotBannerItemRow = Pick<
  GachaBannerItemRow,
  | "banner_version_id"
  | "item_id"
  | "pool_group"
  | "featured_group"
  | "weight"
  | "sort_order"
>;
type SnapshotRarityRateRow = Pick<
  GachaRarityRateRow,
  "banner_version_id" | "rarity" | "base_rate_ppm" | "roll_order"
>;
type SnapshotPityRuleRow = Pick<
  GachaPityRuleRow,
  | "banner_version_id"
  | "rarity"
  | "hard_pity"
  | "soft_pity_start"
  | "soft_pity_increment_ppm"
  | "resets_lower_rarity"
>;
type SnapshotFeaturedRuleRow = Pick<
  GachaFeaturedRuleRow,
  | "banner_version_id"
  | "rarity"
  | "featured_group"
  | "featured_rate_ppm"
  | "guarantee_after_miss"
  | "miss_sets_guarantee"
  | "guarantee_state_key"
>;
type SnapshotRuleSetRarityRateRow = Pick<
  GachaRuleSetRarityRateRow,
  "rule_set_id" | "rarity" | "base_rate_ppm" | "roll_order"
>;
type SnapshotRuleSetPityRuleRow = Pick<
  GachaRuleSetPityRuleRow,
  | "rule_set_id"
  | "rarity"
  | "hard_pity"
  | "soft_pity_start"
  | "soft_pity_increment_ppm"
  | "resets_lower_rarity"
>;
type SnapshotRuleSetFeaturedRuleRow = Pick<
  GachaRuleSetFeaturedRuleRow,
  | "rule_set_id"
  | "rarity"
  | "featured_group"
  | "featured_rate_ppm"
  | "guarantee_after_miss"
  | "miss_sets_guarantee"
  | "guarantee_state_key"
>;

export function createSandboxCatalogFromReleaseSnapshot(
  snapshot: unknown,
  now = new Date(),
): SandboxCatalog {
  const items = snapshotRows<SnapshotItemRow>(snapshot, "items");
  const banners = snapshotRows<SnapshotBannerRow>(snapshot, "banners");
  const versions = snapshotRows<SnapshotBannerVersionRow>(snapshot, "banner_versions");

  if (!items.length || !banners.length || !versions.length) {
    return emptySandboxCatalog();
  }

  return {
    banners: mapBanners({
      banners,
      versions,
      bannerItems: snapshotRows(snapshot, "banner_items"),
      rates: snapshotRows(snapshot, "rarity_rates"),
      pityRules: snapshotRows(snapshot, "pity_rules"),
      featuredRuleRows: snapshotRows(snapshot, "featured_rules"),
      ruleSetRates: snapshotRows(snapshot, "rule_set_rarity_rates"),
      ruleSetPityRules: snapshotRows(snapshot, "rule_set_pity_rules"),
      ruleSetFeaturedRuleRows: snapshotRows(snapshot, "rule_set_featured_rules"),
      items,
      now,
    }),
  };
}

export function emptySandboxCatalog(): SandboxCatalog {
  return { banners: [] };
}

function mapBanners({
  banners,
  versions,
  bannerItems,
  rates,
  pityRules,
  featuredRuleRows,
  ruleSetRates,
  ruleSetPityRules,
  ruleSetFeaturedRuleRows,
  items,
  now,
}: {
  banners: SnapshotBannerRow[];
  versions: SnapshotBannerVersionRow[];
  bannerItems: SnapshotBannerItemRow[];
  rates: SnapshotRarityRateRow[];
  pityRules: SnapshotPityRuleRow[];
  featuredRuleRows: SnapshotFeaturedRuleRow[];
  ruleSetRates: SnapshotRuleSetRarityRateRow[];
  ruleSetPityRules: SnapshotRuleSetPityRuleRow[];
  ruleSetFeaturedRuleRows: SnapshotRuleSetFeaturedRuleRow[];
  items: SnapshotItemRow[];
  now: Date;
}): Banner[] {
  const itemById = new Map(items.map((item) => [item.id, item]));
  const versionsByBannerId = new Map<string, SnapshotBannerVersionRow>();
  const newestVersions = [...versions].sort(
    (left, right) => timestamp(right.effective_from) - timestamp(left.effective_from),
  );

  for (const version of newestVersions) {
    if (isVersionActive(version, now) && !versionsByBannerId.has(version.banner_id)) {
      versionsByBannerId.set(version.banner_id, version);
    }
  }

  return [...banners]
    .sort((left, right) => finiteNumber(left.sort_order) - finiteNumber(right.sort_order))
    .flatMap((banner): Banner[] => {
      const version = versionsByBannerId.get(banner.id);
      if (!version) {
        return [];
      }

      const poolEntries = bannerItems
        .filter((item) => item.banner_version_id === version.id)
        .map((entry): BannerPoolEntry | null => {
          if (!itemById.has(entry.item_id)) {
            return null;
          }

          return {
            itemId: entry.item_id,
            poolGroup: entry.pool_group,
            featuredGroup: entry.featured_group,
            weight: Math.max(0, finiteNumber(entry.weight)),
            sortOrder: finiteNumber(entry.sort_order),
          };
        })
        .filter((entry): entry is BannerPoolEntry => Boolean(entry))
        .sort((left, right) => left.sortOrder - right.sortOrder);

      if (!poolEntries.length) {
        return [];
      }

      const featuredFiveId = poolEntries.find((entry) => {
        const item = itemById.get(entry.itemId);
        return entry.featuredGroup === "five_up" && item?.rarity === 5;
      })?.itemId;
      const featuredFourIds = poolEntries
        .filter((entry) => entry.featuredGroup === "four_up")
        .map((entry) => entry.itemId)
        .filter((id) => itemById.get(id)?.rarity === 4);
      const coverImageUrl = optionalText(banner.cover_image_url);
      const backgroundImageUrl = optionalText(banner.background_image_url);
      const mobileBackgroundImageUrl = optionalText(banner.mobile_background_image_url);

      return [
        {
          id: banner.id,
          name: banner.name,
          shortName: banner.short_name,
          type: banner.banner_type,
          description: banner.description,
          ...(coverImageUrl ? { coverImageUrl } : {}),
          ...(backgroundImageUrl ? { backgroundImageUrl } : {}),
          ...(mobileBackgroundImageUrl ? { mobileBackgroundImageUrl } : {}),
          backgroundPosition: optionalText(banner.background_position) ?? "center center",
          endsAt: version.effective_to ? formatDate(version.effective_to) : "长期开放",
          featuredFiveId,
          featuredFourIds,
          itemPool: poolEntries.map((entry) => entry.itemId),
          poolEntries,
          rarityRules: mapRarityRules({
            versionId: version.id,
            ruleSetId: version.rule_set_id,
            rates,
            pityRules,
            ruleSetRates,
            ruleSetPityRules,
          }),
          featuredRules: mapFeaturedRules({
            versionId: version.id,
            ruleSetId: version.rule_set_id,
            featuredRules: featuredRuleRows,
            ruleSetFeaturedRules: ruleSetFeaturedRuleRows,
          }),
          theme: mapTheme(banner.theme),
        },
      ];
    });
}

function mapRarityRules({
  versionId,
  ruleSetId,
  rates,
  pityRules,
  ruleSetRates,
  ruleSetPityRules,
}: {
  versionId: string;
  ruleSetId: string | null;
  rates: SnapshotRarityRateRow[];
  pityRules: SnapshotPityRuleRow[];
  ruleSetRates: SnapshotRuleSetRarityRateRow[];
  ruleSetPityRules: SnapshotRuleSetPityRuleRow[];
}): GachaRarityRule[] {
  const templateRates = ruleSetId
    ? ruleSetRates.filter((rate) => rate.rule_set_id === ruleSetId)
    : [];
  const templatePityRules = ruleSetId
    ? ruleSetPityRules.filter((rule) => rule.rule_set_id === ruleSetId)
    : [];
  const sourceRates = templateRates.length
    ? templateRates
    : rates.filter((rate) => rate.banner_version_id === versionId);
  const sourcePityRules = templatePityRules.length
    ? templatePityRules
    : pityRules.filter((rule) => rule.banner_version_id === versionId);
  const pityByRarity = new Map(sourcePityRules.map((rule) => [rule.rarity, rule]));

  return sourceRates
    .map((rate): GachaRarityRule => {
      const pityRule =
        rate.rarity === 4 || rate.rarity === 5
          ? pityByRarity.get(rate.rarity)
          : undefined;

      return {
        rarity: rate.rarity,
        baseRatePpm: clampPpm(rate.base_rate_ppm),
        rollOrder: finiteNumber(rate.roll_order),
        hardPity: positiveInteger(pityRule?.hard_pity),
        softPityStart: positiveInteger(pityRule?.soft_pity_start) ?? null,
        softPityIncrementPpm: Math.max(
          0,
          finiteNumber(pityRule?.soft_pity_increment_ppm),
        ),
        resetsLowerRarity: pityRule?.resets_lower_rarity ?? rate.rarity === 5,
      };
    })
    .sort((left, right) => left.rollOrder - right.rollOrder || right.rarity - left.rarity);
}

function mapFeaturedRules({
  versionId,
  ruleSetId,
  featuredRules,
  ruleSetFeaturedRules,
}: {
  versionId: string;
  ruleSetId: string | null;
  featuredRules: SnapshotFeaturedRuleRow[];
  ruleSetFeaturedRules: SnapshotRuleSetFeaturedRuleRow[];
}): GachaFeaturedRule[] {
  const templateRules = ruleSetId
    ? ruleSetFeaturedRules.filter((rule) => rule.rule_set_id === ruleSetId)
    : [];
  const sourceRules = templateRules.length
    ? templateRules
    : featuredRules.filter((rule) => rule.banner_version_id === versionId);

  return sourceRules
    .map((rule): GachaFeaturedRule => ({
      rarity: rule.rarity,
      featuredGroup: rule.featured_group as FeaturedGroup,
      featuredRatePpm: clampPpm(rule.featured_rate_ppm),
      guaranteeAfterMiss: rule.guarantee_after_miss,
      missSetsGuarantee: rule.miss_sets_guarantee,
      guaranteeStateKey: rule.guarantee_state_key,
    }))
    .sort((left, right) => right.rarity - left.rarity);
}

function snapshotRows<T>(snapshot: unknown, key: string): T[] {
  if (!isRecord(snapshot)) {
    return [];
  }
  const value = snapshot[key];
  return Array.isArray(value) ? (value.filter(isRecord) as T[]) : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mapTheme(value: JsonObject): BannerTheme {
  return {
    primary: getThemeValue(value, "primary", "#ffcf66"),
    secondary: getThemeValue(value, "secondary", "#78f0d0"),
    glow: getThemeValue(value, "glow", "rgba(255, 207, 102, 0.26)"),
  };
}

function getThemeValue(value: JsonObject, key: string, fallback: string) {
  const nextValue = value?.[key];
  return typeof nextValue === "string" && nextValue ? nextValue : fallback;
}

function optionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function finiteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function clampPpm(value: unknown) {
  return Math.max(0, Math.min(1_000_000, Math.round(finiteNumber(value))));
}

function positiveInteger(value: unknown) {
  const number = finiteNumber(value);
  return number > 0 ? Math.round(number) : undefined;
}

function isVersionActive(version: SnapshotBannerVersionRow, now: Date) {
  if (version.status !== "published") {
    return false;
  }

  const effectiveFrom = timestamp(version.effective_from);
  if (!Number.isFinite(effectiveFrom) || effectiveFrom > now.getTime()) {
    return false;
  }

  if (!version.effective_to) {
    return true;
  }

  const effectiveTo = timestamp(version.effective_to);
  return Number.isFinite(effectiveTo) && now.getTime() < effectiveTo;
}

function timestamp(value: string) {
  return new Date(value).getTime();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
