import GachaExperience from "./GachaExperience";
import { getAssetAccount } from "@/lib/gateway/assets";
import {
  getBackpackInventory,
  getBackpackPullRecords,
  type BackpackInventoryItem,
  type BackpackPullRecord,
} from "@/lib/gateway/backpack";
import { getGachaPity, type GatewayPitySnapshot } from "@/lib/gateway/gacha";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type {
  Banner,
  BannerPoolEntry,
  BannerTheme,
  FeaturedGroup,
  GachaFeaturedRule,
  GachaItem,
  GachaRarityRule,
  PityState,
  PullRecord,
} from "@/lib/gacha/types";
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
} from "@/lib/supabase/database.gacha.types";

type Catalog = {
  banners: Banner[];
  items: GachaItem[];
  dataSource: "supabase";
};

type GatewayInitialState = {
  history?: PullRecord[];
  inventory?: Record<string, number>;
  pityByBannerId?: Record<string, PityState>;
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    redirect("/login?next=/");
  }

  const accessToken = session?.access_token;
  const catalogPromise = loadCatalog(supabase);
  const balancePromise = loadAssetBalance(accessToken);
  const catalog = await catalogPromise;
  const [initialBalanceMinor, gatewayState] = await Promise.all([
    balancePromise,
    loadGatewayInitialState(accessToken, catalog.banners),
  ]);

  return (
    <GachaExperience
      banners={catalog.banners}
      dataSource={catalog.dataSource}
      initialHistory={gatewayState.history}
      initialBalanceMinor={initialBalanceMinor}
      initialInventory={gatewayState.inventory}
      initialPityByBannerId={gatewayState.pityByBannerId}
      items={catalog.items}
    />
  );
}

async function loadAssetBalance(accessToken: string | undefined) {
  if (!accessToken) {
    return undefined;
  }

  try {
    const account = await getAssetAccount(accessToken);
    return account.balance_minor;
  } catch {
    return undefined;
  }
}

async function loadCatalog(supabase: Awaited<ReturnType<typeof createClient>>): Promise<Catalog> {
  try {
    const nowIso = new Date().toISOString();
    const [
      { data: items, error: itemsError },
      { data: banners, error: bannersError },
      { data: versions, error: versionsError },
      { data: bannerItems, error: bannerItemsError },
      { data: rates, error: ratesError },
      { data: pityRules, error: pityRulesError },
      { data: featuredRules, error: featuredRulesError },
      { data: ruleSetRates, error: ruleSetRatesError },
      { data: ruleSetPityRules, error: ruleSetPityRulesError },
      { data: ruleSetFeaturedRules, error: ruleSetFeaturedRulesError },
    ] = await Promise.all([
      supabase
        .schema("gacha")
        .from("items")
        .select("*")
        .eq("is_enabled", true)
        .order("rarity", { ascending: false }),
      supabase
        .schema("gacha")
        .from("banners")
        .select("*")
        .eq("is_enabled", true)
        .order("sort_order", { ascending: true }),
      supabase
        .schema("gacha")
        .from("banner_versions")
        .select("*")
        .eq("status", "published")
        .lte("effective_from", nowIso)
        .or(`effective_to.is.null,effective_to.gt.${nowIso}`)
        .order("effective_from", { ascending: false }),
      supabase.schema("gacha").from("banner_items").select("*").order("sort_order", { ascending: true }),
      supabase.schema("gacha").from("rarity_rates").select("*").order("roll_order", { ascending: true }),
      supabase.schema("gacha").from("pity_rules").select("*"),
      supabase.schema("gacha").from("featured_rules").select("*"),
      supabase
        .schema("gacha")
        .from("rule_set_rarity_rates")
        .select("*")
        .order("roll_order", { ascending: true }),
      supabase.schema("gacha").from("rule_set_pity_rules").select("*"),
      supabase.schema("gacha").from("rule_set_featured_rules").select("*"),
    ]);

    const error =
      itemsError ||
      bannersError ||
      versionsError ||
      bannerItemsError ||
      ratesError ||
      pityRulesError ||
      featuredRulesError ||
      ruleSetRatesError ||
      ruleSetPityRulesError ||
      ruleSetFeaturedRulesError;

    if (error || !items?.length || !banners?.length || !versions?.length) {
      return emptyCatalog();
    }

    const mappedItems = ((items ?? []) as GachaItemRow[]).map(mapItem);
    const mappedBanners = mapBanners({
      banners: (banners ?? []) as GachaBannerRow[],
      versions: (versions ?? []) as GachaBannerVersionRow[],
      bannerItems: (bannerItems ?? []) as GachaBannerItemRow[],
      rates: (rates ?? []) as GachaRarityRateRow[],
      pityRules: (pityRules ?? []) as GachaPityRuleRow[],
      featuredRuleRows: (featuredRules ?? []) as GachaFeaturedRuleRow[],
      ruleSetRates: (ruleSetRates ?? []) as GachaRuleSetRarityRateRow[],
      ruleSetPityRules: (ruleSetPityRules ?? []) as GachaRuleSetPityRuleRow[],
      ruleSetFeaturedRuleRows: (ruleSetFeaturedRules ?? []) as GachaRuleSetFeaturedRuleRow[],
      items: mappedItems,
      now: new Date(nowIso),
    });

    return {
      banners: mappedBanners,
      items: mappedItems,
      dataSource: "supabase",
    };
  } catch {
    return emptyCatalog();
  }
}

async function loadGatewayInitialState(
  accessToken: string | undefined,
  banners: Banner[],
): Promise<GatewayInitialState> {
  if (!accessToken) {
    return {};
  }

  const [pityResult, inventoryResult, recordsResult] = await Promise.allSettled([
    loadPityByBannerId(accessToken, banners),
    getBackpackInventory({ accessToken, limit: 100 }),
    getBackpackPullRecords({ accessToken, limit: 100 }),
  ]);

  return {
    history:
      recordsResult.status === "fulfilled"
        ? recordsResult.value.items.map(mapBackpackPullRecord)
        : undefined,
    inventory:
      inventoryResult.status === "fulfilled"
        ? mapInventoryQuantities(inventoryResult.value.items)
        : undefined,
    pityByBannerId: pityResult.status === "fulfilled" ? pityResult.value : undefined,
  };
}

async function loadPityByBannerId(accessToken: string, banners: Banner[]) {
  if (banners.length === 0) {
    return {};
  }

  const results = await Promise.allSettled(
    banners.map(async (banner) => {
      const pity = await getGachaPity({ accessToken, bannerId: banner.id });
      return [banner.id, mapGatewayPity(pity)] as const;
    }),
  );
  const entries = results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function mapGatewayPity(pity: GatewayPitySnapshot): PityState {
  return {
    sinceFive: Math.max(0, Math.floor(pity.since_five)),
    sinceFour: Math.max(0, Math.floor(pity.since_four)),
    guaranteedFeaturedFive: pity.guaranteed_featured_five,
    guarantees: {},
  };
}

function mapInventoryQuantities(items: BackpackInventoryItem[]) {
  return Object.fromEntries(
    items.map((item) => [item.item_id, Math.max(0, Math.floor(item.quantity))]),
  );
}

function mapBackpackPullRecord(record: BackpackPullRecord): PullRecord {
  return {
    id: record.id,
    itemId: record.item_id,
    itemName: record.item_name,
    itemType: record.item_type,
    rarity: record.rarity,
    bannerId: record.banner_id,
    bannerName: record.banner_name,
    at: record.received_at,
    pityAtFive: record.pity_at_five,
    pityAtFour: record.pity_at_four,
    isFeatured: record.is_featured,
  };
}

function emptyCatalog(): Catalog {
  return {
    banners: [],
    items: [],
    dataSource: "supabase",
  };
}

function mapItem(row: GachaItemRow): GachaItem {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle,
    rarity: row.rarity,
    type: row.item_type,
    element: row.element,
    role: row.role,
    faction: row.faction,
    accent: row.accent,
    quote: row.quote,
    imageUrl: row.image_url,
    profile: row.profile,
  };
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
  banners: GachaBannerRow[];
  versions: GachaBannerVersionRow[];
  bannerItems: GachaBannerItemRow[];
  rates: GachaRarityRateRow[];
  pityRules: GachaPityRuleRow[];
  featuredRuleRows: GachaFeaturedRuleRow[];
  ruleSetRates: GachaRuleSetRarityRateRow[];
  ruleSetPityRules: GachaRuleSetPityRuleRow[];
  ruleSetFeaturedRuleRows: GachaRuleSetFeaturedRuleRow[];
  items: GachaItem[];
  now: Date;
}) {
  const itemById = new Map(items.map((item) => [item.id, item]));
  const versionsByBannerId = new Map<string, GachaBannerVersionRow>();

  for (const version of versions) {
    if (!isVersionActive(version, now)) {
      continue;
    }

    if (!versionsByBannerId.has(version.banner_id)) {
      versionsByBannerId.set(version.banner_id, version);
    }
  }

  return banners.flatMap((banner) => {
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
          weight: Math.max(0, entry.weight),
          sortOrder: entry.sort_order,
        };
      })
      .filter((entry): entry is BannerPoolEntry => Boolean(entry))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const itemPool = poolEntries.map((item) => item.itemId);
    if (itemPool.length === 0) {
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

    return [
      {
        id: banner.id,
        name: banner.name,
        shortName: banner.short_name,
        type: banner.banner_type,
        description: banner.description,
        coverImageUrl: optionalText(banner.cover_image_url),
        backgroundImageUrl: optionalText(banner.background_image_url),
        mobileBackgroundImageUrl: optionalText(banner.mobile_background_image_url),
        backgroundPosition: optionalText(banner.background_position) ?? "center center",
        endsAt: version.effective_to ? formatDate(version.effective_to) : "长期开放",
        featuredFiveId,
        featuredFourIds,
        itemPool,
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
      } satisfies Banner,
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
  rates: GachaRarityRateRow[];
  pityRules: GachaPityRuleRow[];
  ruleSetRates: GachaRuleSetRarityRateRow[];
  ruleSetPityRules: GachaRuleSetPityRuleRow[];
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
  const pityByRarity = new Map(
    sourcePityRules.map((rule) => [rule.rarity, rule]),
  );

  return sourceRates
    .map((rate) => {
      const pityRule =
        rate.rarity === 4 || rate.rarity === 5 ? pityByRarity.get(rate.rarity) : undefined;

      return {
        rarity: rate.rarity,
        baseRatePpm: clampPpm(rate.base_rate_ppm),
        rollOrder: rate.roll_order,
        hardPity: positiveInteger(pityRule?.hard_pity),
        softPityStart: positiveInteger(pityRule?.soft_pity_start) ?? null,
        softPityIncrementPpm: Math.max(0, pityRule?.soft_pity_increment_ppm ?? 0),
        resetsLowerRarity: pityRule?.resets_lower_rarity ?? rate.rarity === 5,
      };
    })
    .sort((a, b) => a.rollOrder - b.rollOrder || b.rarity - a.rarity);
}

function mapFeaturedRules({
  versionId,
  ruleSetId,
  featuredRules,
  ruleSetFeaturedRules,
}: {
  versionId: string;
  ruleSetId: string | null;
  featuredRules: GachaFeaturedRuleRow[];
  ruleSetFeaturedRules: GachaRuleSetFeaturedRuleRow[];
}): GachaFeaturedRule[] {
  const templateRules = ruleSetId
    ? ruleSetFeaturedRules.filter((rule) => rule.rule_set_id === ruleSetId)
    : [];
  const sourceRules = templateRules.length
    ? templateRules
    : featuredRules.filter((rule) => rule.banner_version_id === versionId);

  return sourceRules
    .map((rule) => ({
      rarity: rule.rarity,
      featuredGroup: rule.featured_group as FeaturedGroup,
      featuredRatePpm: clampPpm(rule.featured_rate_ppm),
      guaranteeAfterMiss: rule.guarantee_after_miss,
      missSetsGuarantee: rule.miss_sets_guarantee,
      guaranteeStateKey: rule.guarantee_state_key,
    }))
    .sort((a, b) => b.rarity - a.rarity);
}

function mapTheme(value: JsonObject): BannerTheme {
  return {
    primary: getThemeValue(value, "primary", "#ffcf66"),
    secondary: getThemeValue(value, "secondary", "#78f0d0"),
    glow: getThemeValue(value, "glow", "rgba(255, 207, 102, 0.26)"),
  };
}

function getThemeValue(value: JsonObject, key: string, fallback: string) {
  const nextValue = value[key];
  return typeof nextValue === "string" && nextValue ? nextValue : fallback;
}

function optionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function clampPpm(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(1_000_000, Math.round(value)));
}

function positiveInteger(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

function isVersionActive(version: GachaBannerVersionRow, now: Date) {
  if (version.status !== "published") {
    return false;
  }

  const effectiveFrom = new Date(version.effective_from);
  if (Number.isNaN(effectiveFrom.getTime()) || effectiveFrom > now) {
    return false;
  }

  if (!version.effective_to) {
    return true;
  }

  const effectiveTo = new Date(version.effective_to);
  return !Number.isNaN(effectiveTo.getTime()) && now < effectiveTo;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
