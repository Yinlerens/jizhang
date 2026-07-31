import assert from "node:assert/strict";
import test from "node:test";
import { createSandboxCatalogFromReleaseSnapshot } from "../lib/sandbox/release-catalog.ts";

const NOW = new Date("2026-07-27T08:00:00.000Z");

test("builds the Sandbox catalog from an engine release snapshot", () => {
  const catalog = createSandboxCatalogFromReleaseSnapshot(
    {
      items: [
        item("five", 5),
        item("four", 4),
        item("three", 3),
      ],
      banners: [
        {
          id: "banner-limited",
          name: "限时角色活动",
          short_name: "限时活动",
          banner_type: "limited-character",
          description: "发布快照中的卡池",
          sort_order: 0,
          theme: {
            primary: "#f05a67",
            secondary: "#2f8f83",
            glow: "rgba(240, 90, 103, 0.24)",
          },
        },
      ],
      banner_versions: [
        {
          id: "version-live",
          banner_id: "banner-limited",
          rule_set_id: "rule-set-live",
          version: 3,
          status: "published",
          effective_from: "2026-07-01T00:00:00.000Z",
          effective_to: null,
        },
      ],
      banner_items: [
        poolItem("version-live", "five", "featured", "five_up", 0),
        poolItem("version-live", "four", "featured", "four_up", 1),
        poolItem("version-live", "three", "standard", null, 2),
      ],
      rarity_rates: [],
      pity_rules: [],
      featured_rules: [],
      rule_set_rarity_rates: [
        { rule_set_id: "rule-set-live", rarity: 5, base_rate_ppm: 8_000, roll_order: 0 },
        { rule_set_id: "rule-set-live", rarity: 4, base_rate_ppm: 60_000, roll_order: 1 },
        { rule_set_id: "rule-set-live", rarity: 3, base_rate_ppm: 932_000, roll_order: 2 },
      ],
      rule_set_pity_rules: [
        {
          rule_set_id: "rule-set-live",
          rarity: 5,
          counter_key: "since_five",
          hard_pity: 80,
          soft_pity_start: 65,
          soft_pity_increment_ppm: 50_000,
          resets_lower_rarity: true,
        },
        {
          rule_set_id: "rule-set-live",
          rarity: 4,
          counter_key: "since_four",
          hard_pity: 10,
          soft_pity_start: null,
          soft_pity_increment_ppm: 0,
          resets_lower_rarity: false,
        },
      ],
      rule_set_featured_rules: [
        {
          rule_set_id: "rule-set-live",
          rarity: 5,
          featured_group: "five_up",
          featured_rate_ppm: 500_000,
          guarantee_after_miss: true,
          miss_sets_guarantee: true,
          guarantee_state_key: "five_featured",
        },
      ],
    },
    NOW,
  );

  assert.equal(catalog.banners.length, 1);
  assert.deepEqual(catalog.banners[0], {
    id: "banner-limited",
    name: "限时角色活动",
    shortName: "限时活动",
    type: "limited-character",
    description: "发布快照中的卡池",
    backgroundPosition: "center center",
    endsAt: "长期开放",
    featuredFiveId: "five",
    featuredFourIds: ["four"],
    itemPool: ["five", "four", "three"],
    poolEntries: [
      { itemId: "five", poolGroup: "featured", featuredGroup: "five_up", weight: 1, sortOrder: 0 },
      { itemId: "four", poolGroup: "featured", featuredGroup: "four_up", weight: 1, sortOrder: 1 },
      { itemId: "three", poolGroup: "standard", featuredGroup: null, weight: 1, sortOrder: 2 },
    ],
    rarityRules: [
      {
        rarity: 5,
        baseRatePpm: 8_000,
        rollOrder: 0,
        hardPity: 80,
        softPityStart: 65,
        softPityIncrementPpm: 50_000,
        resetsLowerRarity: true,
      },
      {
        rarity: 4,
        baseRatePpm: 60_000,
        rollOrder: 1,
        hardPity: 10,
        softPityStart: null,
        softPityIncrementPpm: 0,
        resetsLowerRarity: false,
      },
      {
        rarity: 3,
        baseRatePpm: 932_000,
        rollOrder: 2,
        hardPity: undefined,
        softPityStart: null,
        softPityIncrementPpm: 0,
        resetsLowerRarity: false,
      },
    ],
    featuredRules: [
      {
        rarity: 5,
        featuredGroup: "five_up",
        featuredRatePpm: 500_000,
        guaranteeAfterMiss: true,
        missSetsGuarantee: true,
        guaranteeStateKey: "five_featured",
      },
    ],
    theme: {
      primary: "#f05a67",
      secondary: "#2f8f83",
      glow: "rgba(240, 90, 103, 0.24)",
    },
  });
});

test("does not expose unpublished or malformed snapshot rows", () => {
  assert.deepEqual(createSandboxCatalogFromReleaseSnapshot(null, NOW), { banners: [] });
  assert.deepEqual(
    createSandboxCatalogFromReleaseSnapshot(
      {
        items: [item("five", 5)],
        banners: [{ id: "banner", name: "草稿", short_name: "草稿", banner_type: "standard", description: "", theme: {} }],
        banner_versions: [
          {
            id: "draft-version",
            banner_id: "banner",
            rule_set_id: null,
            version: 1,
            status: "draft",
            effective_from: "2026-07-01T00:00:00.000Z",
            effective_to: null,
          },
        ],
        banner_items: [poolItem("draft-version", "five", "standard", null, 0)],
      },
      NOW,
    ),
    { banners: [] },
  );

  assert.deepEqual(
    createSandboxCatalogFromReleaseSnapshot(
      {
        items: [item("five", 5)],
        banners: [
          {
            id: "banner",
            name: "损坏快照",
            short_name: "损坏快照",
            banner_type: "standard",
            description: "",
            sort_order: 0,
            theme: {},
          },
        ],
        banner_versions: [
          {
            id: "published-version",
            banner_id: "banner",
            rule_set_id: null,
            version: 1,
            status: "published",
            effective_from: "2026-07-01T00:00:00.000Z",
            effective_to: null,
          },
        ],
        banner_items: [
          poolItem("published-version", "missing-item", "standard", null, 0),
        ],
      },
      NOW,
    ),
    { banners: [] },
  );
});

function item(id: string, rarity: 3 | 4 | 5) {
  return {
    id,
    name: id,
    subtitle: "",
    item_type: "character" as const,
    rarity,
    element: "",
    role: "",
    faction: "",
    accent: "#64748b",
    quote: "",
  };
}

function poolItem(
  bannerVersionId: string,
  itemId: string,
  poolGroup: "standard" | "featured",
  featuredGroup: "five_up" | "four_up" | null,
  sortOrder: number,
) {
  return {
    banner_version_id: bannerVersionId,
    item_id: itemId,
    pool_group: poolGroup,
    featured_group: featuredGroup,
    weight: 1,
    sort_order: sortOrder,
  };
}
