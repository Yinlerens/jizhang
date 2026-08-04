import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  compareGachaHistoricalTraces,
  createGachaHistoricalTrace,
  selectGachaTraceBaseline,
  toGachaTraceHistoryEntry,
  type GachaTraceHistoryEntry,
} from "../lib/trace/gacha-history.ts";
import { createGachaOperationTrace } from "../lib/trace/gacha-operation-replay.ts";
import type { PlayerSupportPullReplayResponse } from "../lib/gateway/player-support.ts";
import { createLoginPath } from "../lib/auth/redirect.ts";

const successfulAudit = {
  requestId: "11111111-1111-4111-8111-111111111111",
  startedAt: "2026-07-27T04:00:00.000Z",
  finishedAt: "2026-07-27T04:00:00.120Z",
  durationMs: 120,
  upstreamUrl: "http://gacha-engine/api/v1/gacha/me/pulls",
  responseStatus: 200,
  errorCode: null,
  errorMessage: null,
  requestBody: { banner_id: "banner-limited", count: 10 },
  responseBody: {
    event_id: "22222222-2222-4222-8222-222222222222",
    banner_version_id: "version-7",
    seed: "volatile-seed",
    state_version: 9,
    next_pity: { since_five: 18, since_four: 2 },
    records: [
      {
        id: "record-1",
        item_id: "item-five",
        item_name: "五星角色",
        item_type: "character",
        rarity: 5,
        is_featured: true,
      },
    ],
  },
};

const failedAudit = {
  ...successfulAudit,
  requestId: "33333333-3333-4333-8333-333333333333",
  startedAt: "2026-07-27T04:01:00.000Z",
  finishedAt: "2026-07-27T04:01:00.450Z",
  durationMs: 450,
  responseStatus: 502,
  errorCode: "gacha_unavailable",
  errorMessage: "Gacha Engine unavailable",
  responseBody: {
    code: "gacha_unavailable",
    message: "Gacha Engine unavailable",
  },
};

test("reconstructs a successful historical pull from its audited packets", () => {
  const trace = createGachaHistoricalTrace(successfulAudit);

  assert.equal(trace.entry.bannerId, "banner-limited");
  assert.equal(trace.entry.count, 10);
  assert.equal(trace.entry.outcome, "success");
  assert.equal(trace.run.requestId, successfulAudit.requestId);
  assert.equal(trace.run.eventId, successfulAudit.responseBody.event_id);
  assert.equal(trace.run.nodes.gateway.evidence, "observed");
  assert.equal(trace.run.nodes.gateway.httpStatus, 200);
  assert.equal(trace.results[0]?.itemName, "五星角色");
});

test("attributes a failed historical pull to the audited dependency", () => {
  const trace = createGachaHistoricalTrace(failedAudit);

  assert.equal(trace.entry.outcome, "error");
  assert.equal(trace.run.status, "error");
  assert.equal(trace.run.failedNodeId, "gacha");
  assert.equal(trace.run.nodes.gateway.httpStatus, 502);
  assert.equal(trace.run.nodes.gacha.errorCode, "gacha_unavailable");
});

test("selects the nearest successful call with the same banner and pull count", () => {
  const target = entry({
    requestId: failedAudit.requestId,
    startedAt: failedAudit.startedAt,
    outcome: "error",
  });
  const candidates = [
    entry({
      requestId: "44444444-4444-4444-8444-444444444444",
      startedAt: "2026-07-27T03:20:00.000Z",
      outcome: "success",
    }),
    entry({
      requestId: "55555555-5555-4555-8555-555555555555",
      startedAt: "2026-07-27T04:00:50.000Z",
      outcome: "success",
    }),
    entry({
      requestId: "66666666-6666-4666-8666-666666666666",
      startedAt: "2026-07-27T04:00:59.000Z",
      outcome: "success",
      count: 1,
    }),
  ];

  assert.equal(selectGachaTraceBaseline(target, candidates)?.requestId, candidates[1]?.requestId);
});

test("compares node outcomes and meaningful packet fields without volatile IDs", () => {
  const comparison = compareGachaHistoricalTraces(
    createGachaHistoricalTrace(failedAudit),
    createGachaHistoricalTrace(successfulAudit),
  );

  assert.equal(comparison.target.requestId, failedAudit.requestId);
  assert.equal(comparison.baseline.requestId, successfulAudit.requestId);
  assert.equal(comparison.durationDeltaMs, 330);
  assert.ok(comparison.nodeChanges.some((change) => change.nodeId === "gacha"));
  assert.ok(comparison.packetChanges.some((change) => change.path === "response.code"));
  assert.ok(comparison.packetChanges.every((change) => !/event_id|seed|\.id$/.test(change.path)));
});

test("maps audit list previews into compact history entries", () => {
  const history = toGachaTraceHistoryEntry({
    request_id: successfulAudit.requestId,
    started_at: successfulAudit.startedAt,
    duration_ms: 120,
    response_status: 200,
    error_code: null,
    error_message: null,
    request_body_preview: JSON.stringify(successfulAudit.requestBody),
  });

  assert.deepEqual(history, entry({ requestId: successfulAudit.requestId }));
});

test("exposes durable pull history and success comparison from the Sandbox", () => {
  const lab = read("../app/SandboxTraceLab.tsx");
  const actions = read("../app/gacha/actions.ts");
  const historyDialog = read("../components/trace/TraceHistoryDialog.tsx");
  const comparisonDialog = read("../components/trace/TraceComparisonDialog.tsx");

  assert.match(lab, /TraceHistoryDialog/);
  assert.match(lab, /TraceComparisonDialog/);
  assert.match(lab, /抽卡记录/);
  assert.doesNotMatch(lab, /API 记录/);
  assert.match(actions, /export async function loadGachaTraceHistory/);
  assert.match(actions, /export async function loadHistoricalGachaTrace/);
  assert.match(actions, /export async function compareHistoricalGachaTrace/);
  assert.match(actions, /getAuthenticatedSession\(\)/);
  assert.match(actions, /getPlayerSupport/);
  assert.match(actions, /getPlayerPullReplay/);
  assert.match(historyDialog, /Operation ID/);
  assert.match(historyDialog, /同卡池成功记录/);
  assert.doesNotMatch(historyDialog, /Request ID/);
  assert.match(comparisonDialog, /数据包差异/);
});

test("opens a persisted pull operation directly in the Sandbox", () => {
  const sandboxRoute = read("../app/sandbox/page.tsx");
  const lab = read("../app/SandboxTraceLab.tsx");
  const playerSupport = read("../app/console/players/page.tsx");

  assert.match(sandboxRoute, /searchParams/);
  assert.match(sandboxRoute, /initialOperationId/);
  assert.match(sandboxRoute, /initialPlayerId/);
  assert.doesNotMatch(sandboxRoute, /request_id/);
  assert.match(lab, /loadHistoricalGachaTrace/);
  assert.match(lab, /initialOperationId/);
  assert.match(lab, /initialPlayerId/);
  assert.match(playerSupport, /operation_id/);
  assert.match(playerSupport, /player_id/);
});

test("preserves the player and operation ids through the login redirect", () => {
  const nextPath = "/sandbox?player_id=aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa&operation_id=11111111-1111-4111-8111-111111111111";

  assert.equal(
    createLoginPath(nextPath),
    "/login?next=%2Fsandbox%3Fplayer_id%3Daaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa%26operation_id%3D11111111-1111-4111-8111-111111111111",
  );
});

test("replays a successful pull entirely from durable operation evidence", () => {
  const trace = createGachaOperationTrace(successfulOperationReplay());

  assert.equal(trace.entry.operationId, "77777777-7777-4777-8777-777777777777");
  assert.equal(trace.entry.requestId, null);
  assert.equal(trace.run.operationId, trace.entry.operationId);
  assert.equal(trace.run.requestId, null);
  assert.equal(trace.run.status, "success");
  assert.equal(trace.run.nodes.gacha.evidence, "durable");
  assert.equal(trace.run.nodes.asset.status, "success");
  assert.equal(trace.run.nodes.backpack.status, "success");
  assert.equal(trace.run.nodes["backpack-db"].status, "success");
  assert.equal(trace.results[0]?.itemName, "五星角色");
});

test("marks unavailable replay evidence as pending instead of a business failure", () => {
  const replay = successfulOperationReplay();
  replay.partial = true;
  replay.asset_spend = {
    status: "unavailable",
    data: null,
    error: { code: "upstream_unavailable", message: "asset service is unavailable" },
  };

  const trace = createGachaOperationTrace(replay);

  assert.equal(trace.run.status, "waiting");
  assert.equal(trace.run.failedNodeId, null);
  assert.equal(trace.run.nodes.asset.status, "waiting");
  assert.equal(trace.run.nodes.asset.evidence, "pending");
});

function entry(overrides: Partial<GachaTraceHistoryEntry> = {}): GachaTraceHistoryEntry {
  return {
    requestId: successfulAudit.requestId,
    startedAt: successfulAudit.startedAt,
    durationMs: 120,
    responseStatus: 200,
    errorCode: null,
    errorMessage: null,
    bannerId: "banner-limited",
    count: 10,
    outcome: "success",
    ...overrides,
  };
}

function successfulOperationReplay(): PlayerSupportPullReplayResponse {
  return {
    player_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    generated_at: "2026-07-27T04:00:01.000Z",
    partial: false,
    operation: {
      operation_id: "77777777-7777-4777-8777-777777777777",
      request_id: null,
      status: "succeeded",
      request: {
        source: "persisted_result",
        banner_id: "banner-limited",
        banner_version_id: "version-7",
        pity_group_id: "limited-character",
        count: 10,
        seed: "persisted-seed",
        event_id: "22222222-2222-4222-8222-222222222222",
        amount_minor: 1600,
        accepted_at: "2026-07-27T04:00:00.000Z",
      },
      response: successfulAudit.responseBody,
      event: {
        event_id: "22222222-2222-4222-8222-222222222222",
        event_type: "gacha.pull_completed.v1",
      },
      error: null,
      created_at: "2026-07-27T04:00:00.000Z",
      updated_at: "2026-07-27T04:00:00.120Z",
    },
    asset_spend: {
      status: "ok",
      data: {
        id: "ledger-1",
        idempotency_key: "spend:gacha-pull:22222222-2222-4222-8222-222222222222",
        delta_minor: -1600,
        balance_before_minor: 3200,
        balance_after_minor: 1600,
        reason: "gacha_pull",
        created_at: "2026-07-27T04:00:00.020Z",
      },
    },
    backpack_delivery: {
      status: "ok",
      data: {
        event: {
          event_id: "22222222-2222-4222-8222-222222222222",
          event_type: "gacha.pull_completed.v1",
          banner_id: "banner-limited",
          seed: "persisted-seed",
          state_version: 9,
          previous_pity: { since_five: 8 },
          next_pity: { since_five: 18 },
          received_at: "2026-07-27T04:00:00.100Z",
        },
        records: [
          {
            id: "record-1",
            event_id: "22222222-2222-4222-8222-222222222222",
            index: 0,
            item_id: "item-five",
            item_name: "五星角色",
            item_type: "character",
            rarity: 5,
            banner_id: "banner-limited",
            banner_name: "限定角色池",
            pity_at_five: 9,
            pity_at_four: 1,
            is_featured: true,
            received_at: "2026-07-27T04:00:00.100Z",
          },
        ],
      },
    },
  };
}

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
