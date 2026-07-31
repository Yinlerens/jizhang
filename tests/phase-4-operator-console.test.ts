import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  createCampaignScheduleDefaults,
  getCampaignLifecycle,
  summarizeCampaigns,
  toHongKongDateTimeInput,
  validateCampaignDraftInput,
} from "../lib/control-plane/campaign.ts";
import { getControlActivityLabel } from "../lib/control-plane/activity.ts";
import { hasControlCapability } from "../lib/control-plane/roles.ts";

test("operators can manage campaigns without receiving advanced configuration access", () => {
  assert.equal(hasControlCapability("operator", "campaign:manage"), true);
  assert.equal(hasControlCapability("operator", "configuration:write"), false);
  assert.equal(hasControlCapability("designer", "campaign:manage"), true);
});

test("normalizes a limited campaign draft and interprets dates in Hong Kong time", () => {
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

test("rejects incomplete limited campaigns and invalid schedules", () => {
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

test("classifies campaign lifecycle using schedule and publication state", () => {
  const now = new Date("2026-07-23T04:00:00.000Z");
  assert.equal(
    getCampaignLifecycle(
      { status: "draft", effectiveFrom: "2026-07-25T02:00:00.000Z", effectiveTo: null },
      now,
    ),
    "draft",
  );
  assert.equal(
    getCampaignLifecycle(
      {
        status: "published",
        effectiveFrom: "2026-07-25T02:00:00.000Z",
        effectiveTo: "2026-08-15T03:30:00.000Z",
      },
      now,
    ),
    "scheduled",
  );
  assert.equal(
    getCampaignLifecycle(
      {
        status: "published",
        effectiveFrom: "2026-07-01T02:00:00.000Z",
        effectiveTo: "2026-08-15T03:30:00.000Z",
      },
      now,
    ),
    "active",
  );
  assert.equal(
    getCampaignLifecycle(
      {
        status: "published",
        effectiveFrom: "2026-06-01T02:00:00.000Z",
        effectiveTo: "2026-06-15T03:30:00.000Z",
      },
      now,
    ),
    "ended",
  );
});

test("formats persisted UTC schedules for Hong Kong datetime inputs", () => {
  assert.equal(
    toHongKongDateTimeInput("2026-07-25T02:00:00.000Z"),
    "2026-07-25T10:00",
  );
  assert.equal(toHongKongDateTimeInput("not-a-date"), "");
});

test("prefills a new campaign with the next full hour and a 21 day schedule", () => {
  assert.deepEqual(
    createCampaignScheduleDefaults(new Date("2026-07-23T04:15:00.000Z")),
    {
      effectiveFrom: "2026-07-23T13:00",
      effectiveTo: "2026-08-13T13:00",
    },
  );
});

test("summarizes campaign states for the operator board", () => {
  assert.deepEqual(
    summarizeCampaigns([
      { lifecycle: "draft" },
      { lifecycle: "scheduled" },
      { lifecycle: "active" },
      { lifecycle: "ended" },
      { lifecycle: "archived" },
    ]),
    { all: 5, draft: 1, scheduled: 1, active: 1, ended: 2 },
  );
});

test("uses operator language for campaign activity", () => {
  assert.equal(getControlActivityLabel("banner.draft_created"), "创建卡池草稿");
  assert.equal(getControlActivityLabel("banner.draft_updated"), "更新卡池草稿");
  assert.equal(getControlActivityLabel("banner.published"), "发布卡池");
  assert.equal(getControlActivityLabel("unknown.event"), "unknown.event");
});

test("exposes one campaign workflow without raw configuration navigation", () => {
  const workflowFiles = [
    "../app/console/pools/page.tsx",
    "../app/console/pools/new/page.tsx",
    "../app/console/pools/[versionId]/page.tsx",
    "../app/console/pools/CampaignBoard.tsx",
    "../app/console/pools/CampaignDraftForm.tsx",
    "../app/console/pools/PublishCampaignForm.tsx",
  ];

  for (const path of workflowFiles) {
    assert.doesNotThrow(() => readFileSync(new URL(path, import.meta.url), "utf8"));
  }

  const navigation = readFileSync(
    new URL("../app/admin/gacha/AdminShell.tsx", import.meta.url),
    "utf8",
  );
  assert.match(navigation, /卡池管理/);
  assert.match(navigation, /日常操作/);
  assert.doesNotMatch(navigation, /高级/);
  assert.doesNotMatch(navigation, /label: "活动池"/);
  assert.doesNotMatch(navigation, /label: "发布版本"/);
  assert.doesNotMatch(navigation, /label: "池内容"/);
});
