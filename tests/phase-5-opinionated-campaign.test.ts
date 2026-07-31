import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { validateCampaignDraftInput } from "../lib/control-plane/campaign.ts";

test("accepts only the four business inputs required for a limited campaign", () => {
  const result = validateCampaignDraftInput({
    effectiveFrom: "2026-07-25T10:00",
    effectiveTo: "2026-08-15T11:30",
    featuredItemId: "char-five",
    name: "  夏日限定招募  ",
  });

  assert.deepEqual(result, {
    ok: true,
    value: {
      effectiveFrom: "2026-07-25T02:00:00.000Z",
      effectiveTo: "2026-08-15T03:30:00.000Z",
      featuredItemId: "char-five",
      name: "夏日限定招募",
    },
  });
});

test("requires one five-star featured item and a valid schedule", () => {
  const missingFeatured = validateCampaignDraftInput({
    effectiveFrom: "2026-07-25T10:00",
    effectiveTo: "2026-08-15T11:30",
    featuredItemId: "",
    name: "夏日限定招募",
  });
  assert.deepEqual(missingFeatured, { ok: false, message: "请选择五星 UP 角色。" });

  const invalidSchedule = validateCampaignDraftInput({
    effectiveFrom: "2026-08-15T11:30",
    effectiveTo: "2026-07-25T10:00",
    featuredItemId: "char-five",
    name: "夏日限定招募",
  });
  assert.deepEqual(invalidSchedule, { ok: false, message: "结束时间必须晚于开始时间。" });
});

test("renders one minimal form instead of a configuration wizard", () => {
  const form = read("../app/console/pools/CampaignDraftForm.tsx");

  assert.match(form, /name="name"/);
  assert.match(form, /name="featured_item_id"/);
  assert.match(form, /name="effective_from"/);
  assert.match(form, /name="effective_to"/);
  assert.doesNotMatch(form, /FORM_STEPS|CAMPAIGN_TEMPLATES|featured_four_star|notes|banner_type/);
  assert.doesNotMatch(form, /下一步|上一步|选择模板|确认保存/);
});

test("server actions use one fixed product type and no configurable rule fields", () => {
  const actions = read("../app/console/pools/actions.ts");

  assert.match(actions, /rpc\("create_product_campaign_draft"/);
  assert.match(actions, /rpc\("update_product_campaign_draft"/);
  assert.match(actions, /featured_item_id:\s*input\.featuredItemId/);
  assert.doesNotMatch(actions, /banner_type|draft_notes|featured_item_ids/);
  assert.doesNotMatch(actions, /formData\.get\("banner_type"\)/);
  assert.doesNotMatch(actions, /formData\.getAll\("featured_four_star_item_ids"\)/);
  assert.doesNotMatch(actions, /formData\.get\("notes"\)/);
});

test("retires independent configuration navigation and routes", () => {
  const navigation = read("../app/admin/gacha/AdminShell.tsx");
  assert.doesNotMatch(navigation, /label: "高级"/);
  assert.doesNotMatch(navigation, /\/admin\/gacha\/rule-sets/);

  const retiredPages = [
    "../app/admin/gacha/banners/page.tsx",
    "../app/admin/gacha/banner-versions/page.tsx",
    "../app/admin/gacha/banner-items/page.tsx",
    "../app/admin/gacha/rule-sets/page.tsx",
    "../app/admin/gacha/rarity-rates/page.tsx",
    "../app/admin/gacha/featured-rules/page.tsx",
    "../app/admin/gacha/pity-rules/page.tsx",
  ];

  for (const page of retiredPages) {
    assert.match(read(page), /redirect\("\/console\/pools"\)/);
  }
});

test("database migration installs and enforces one product-managed campaign policy", () => {
  const migrationDirectory = new URL("../../ops/supabase/migrations/", import.meta.url);
  const migrationName = readdirSync(migrationDirectory).find((name) =>
    name.endsWith("_phase_5_product_campaign_policy.sql"),
  );

  assert.ok(migrationName, "phase 5 product policy migration is missing");
  const migration = readFileSync(new URL(migrationName, migrationDirectory), "utf8");
  assert.match(migration, /ensure_product_campaign_policy/);
  assert.match(migration, /create_product_campaign_draft/);
  assert.match(migration, /update_product_campaign_draft/);
  assert.match(migration, /default-limited-character/);
  assert.match(migration, /'product-managed',\s*true/);
  assert.match(migration, /ensure_product_campaign_policy\(target_project_id\)/);
  assert.doesNotMatch(migration, /banner_type text|featured_item_ids text\[\]|draft_notes text/);
});

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
