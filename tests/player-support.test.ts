import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { hasControlCapability } from "../lib/control-plane/roles.ts";
import { summarizePlayerCase } from "../lib/player-support/summary.ts";

test("grants the player support view only to operational support roles", () => {
  for (const role of ["owner", "admin", "operator", "support"] as const) {
    assert.equal(hasControlCapability(role, "player-support:view"), true, role);
  }
  for (const role of ["designer", "reviewer", "viewer"] as const) {
    assert.equal(hasControlCapability(role, "player-support:view"), false, role);
  }
});

test("exposes a read-only player support workspace in console navigation", () => {
  const navigation = read("../app/admin/gacha/AdminShell.tsx");
  const page = read("../app/console/players/page.tsx");
  const gateway = read("../lib/gateway/player-support.ts");

  assert.match(navigation, /href: "\/console\/players"/);
  assert.match(navigation, /label: "玩家客服"/);
  assert.match(navigation, /capability: "player-support:view"/);
  assert.match(page, /createControlPlaneAdminPageClient\([\s\S]*"player-support:view"/);
  assert.match(page, /getPlayerSupport\(session\.access_token, playerId\)/);
  assert.match(page, /getAuthUserById\(supabase, playerId\)/);
  assert.match(page, /扣款与资产/);
  assert.match(page, /抽卡与保底/);
  assert.match(page, /奖励到账/);
  assert.match(page, /最近 API 请求/);
  assert.doesNotMatch(page, /creditAssets|补发|修改余额|修改保底/);
  assert.match(gateway, /import "server-only"/);
  assert.match(gateway, /\/api\/v1\/admin\/player-support\/players\//);
  assert.doesNotMatch(gateway, /NEXT_PUBLIC/);
  assert.doesNotMatch(
    gateway,
    /AuditLogListItem|BackpackPullEventsPage|BackpackPullRecordsPage/,
  );
  assert.doesNotMatch(gateway, /seed|request_body_preview|response_body_preview/);
  assert.doesNotMatch(page, /@\/lib\/gateway\/(?:audit|backpack)/);
});

test("summarizes reward delivery gaps without hiding partial evidence", () => {
  assert.deepEqual(
    summarizePlayerCase({
      partial: false,
      latestOperation: {
        status: "event_published",
        event_id: "event-1",
        error: null,
      },
      deliveredEventIds: new Set(),
    }),
    {
      code: "delivery_pending",
      label: "奖励同步中",
      detail: "抽卡结果已生成，背包尚未确认收到奖励。",
      tone: "warning",
    },
  );

  assert.deepEqual(
    summarizePlayerCase({
      partial: false,
      latestOperation: {
        status: "event_published",
        event_id: "event-1",
        error: null,
      },
      deliveredEventIds: new Set(["event-1"]),
    }),
    {
      code: "completed",
      label: "已完成",
      detail: "抽卡结果与背包奖励均已确认。",
      tone: "success",
    },
  );

  assert.equal(
    summarizePlayerCase({
      partial: true,
      latestOperation: null,
      deliveredEventIds: new Set(),
    }).code,
    "partial",
  );
});

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
