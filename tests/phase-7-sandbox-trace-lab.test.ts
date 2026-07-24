import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  GACHA_TRACE_EDGES,
  GACHA_TRACE_NODE_ORDER,
  createGachaTraceRun,
  locateGachaFailure,
  reduceGachaTrace,
} from "../lib/trace/gacha-run.ts";
import { toGachaTraceAuditSnapshot } from "../lib/trace/gacha-audit.ts";

test("models the complete north-south and east-west gacha path", () => {
  assert.deepEqual(GACHA_TRACE_NODE_ORDER, [
    "browser",
    "next",
    "gateway",
    "gacha",
    "config",
    "asset",
    "redis",
    "kafka",
    "backpack",
    "backpack-db",
  ]);

  assert.ok(GACHA_TRACE_EDGES.some((edge) => edge.traffic === "north-south"));
  assert.ok(GACHA_TRACE_EDGES.some((edge) => edge.traffic === "east-west"));
  assert.ok(GACHA_TRACE_EDGES.some((edge) => edge.traffic === "async"));
});

test("keeps downstream storage waiting until the Kafka event is consumed", () => {
  const startedAt = 1_000;
  const initial = createGachaTraceRun({
    runId: "run-1",
    bannerId: "limited-character-1",
    count: 10,
    startedAt,
  });
  const running = reduceGachaTrace(initial, {
    type: "request_started",
    at: startedAt,
  });
  const pulled = reduceGachaTrace(running, {
    type: "pull_succeeded",
    at: 1_240,
    requestId: "request-1",
    eventId: "event-1",
  });

  assert.equal(pulled.nodes.gateway.status, "success");
  assert.equal(pulled.nodes.gacha.status, "success");
  assert.equal(pulled.nodes.asset.status, "success");
  assert.equal(pulled.nodes.redis.status, "success");
  assert.equal(pulled.nodes.kafka.status, "success");
  assert.equal(pulled.nodes.backpack.status, "waiting");
  assert.equal(pulled.nodes["backpack-db"].status, "waiting");
  assert.equal(pulled.status, "waiting");

  const completed = reduceGachaTrace(pulled, {
    type: "backpack_succeeded",
    at: 1_510,
  });

  assert.equal(completed.nodes.backpack.status, "success");
  assert.equal(completed.nodes["backpack-db"].status, "success");
  assert.equal(completed.status, "success");
  assert.equal(completed.finishedAt, 1_510);
});

test("treats an unconsumed Backpack event as pending instead of a failed pull", () => {
  const startedAt = 2_000;
  const initial = createGachaTraceRun({
    runId: "run-pending",
    bannerId: "limited-character-1",
    count: 10,
    startedAt,
  });
  const running = reduceGachaTrace(initial, {
    type: "request_started",
    at: startedAt,
    requestId: "request-pending",
    idempotencyKey: "idempotency-pending",
  });
  const pulled = reduceGachaTrace(running, {
    type: "pull_succeeded",
    at: 2_240,
    requestId: "request-pending",
    eventId: "event-pending",
    result: {
      stateVersion: 7,
      nextPity: { pulls_since_last_5: 3, pulls_since_last_4: 1 },
      records: [{ id: "record-1", itemId: "item-1", itemName: "今汐", rarity: 5 }],
    },
  });
  const pending = reduceGachaTrace(pulled, {
    type: "backpack_pending",
    at: 5_500,
    attempts: 6,
    retryAfterMs: 3_000,
    message: "Backpack 尚未消费本次 Kafka 事件，可重新检查。",
  });

  assert.equal(pending.status, "waiting");
  assert.equal(pending.failedNodeId, null);
  assert.equal(pending.finishedAt, null);
  assert.equal(pending.nodes.backpack.status, "waiting");
  assert.equal(pending.nodes.backpack.httpStatus, 404);
  assert.equal(pending.nodes.backpack.errorCode, "pull_event_pending");
  assert.equal(pending.nodes["backpack-db"].status, "waiting");
  assert.doesNotMatch(JSON.stringify(pending), /backpack_sync_failed/);
});

test("keeps a useful sanitized packet on every hop of a completed pull", () => {
  const startedAt = 3_000;
  const initial = createGachaTraceRun({
    runId: "run-packets",
    bannerId: "limited-character-1",
    count: 1,
    startedAt,
  });
  const running = reduceGachaTrace(initial, {
    type: "request_started",
    at: startedAt,
    requestId: "request-packets",
    idempotencyKey: "idempotency-packets",
  });
  const pulled = reduceGachaTrace(running, {
    type: "pull_succeeded",
    at: 3_180,
    requestId: "request-packets",
    eventId: "event-packets",
    result: {
      stateVersion: 8,
      nextPity: { pulls_since_last_5: 4, pulls_since_last_4: 0 },
      records: [{ id: "record-2", itemId: "item-2", itemName: "异构武器", rarity: 4 }],
    },
  });
  const pending = reduceGachaTrace(pulled, {
    type: "backpack_pending",
    at: 6_400,
    attempts: 6,
    retryAfterMs: 3_000,
    message: "Backpack 尚未消费本次 Kafka 事件，可重新检查。",
  });

  for (const nodeId of GACHA_TRACE_NODE_ORDER) {
    assert.notEqual(pending.nodes[nodeId].request, null, `${nodeId} should expose its request packet`);
    assert.notEqual(pending.nodes[nodeId].response, null, `${nodeId} should expose its response packet`);
  }

  const packets = JSON.stringify(pending.nodes);
  assert.match(packets, /request-packets/);
  assert.match(packets, /event-packets/);
  assert.match(packets, /observed/);
  assert.match(packets, /derived/);
  assert.doesNotMatch(packets, /authorization|bearer|access[_-]?token/i);
});

test("builds deterministic replay frames for the complete packet path", async () => {
  const { buildGachaReplayFrames } = await import("../lib/trace/gacha-replay.ts");
  const initial = createGachaTraceRun({
    runId: "run-replay",
    bannerId: "limited-character-1",
    count: 1,
    startedAt: 4_000,
  });
  const running = reduceGachaTrace(initial, {
    type: "request_started",
    at: 4_000,
    requestId: "request-replay",
    idempotencyKey: "idempotency-replay",
  });
  const pulled = reduceGachaTrace(running, {
    type: "pull_succeeded",
    at: 4_220,
    requestId: "request-replay",
    eventId: "event-replay",
    result: {
      stateVersion: 9,
      nextPity: { pulls_since_last_5: 5, pulls_since_last_4: 1 },
      records: [{ id: "record-3", itemId: "item-3", itemName: "测试道具", rarity: 3 }],
    },
  });
  const pending = reduceGachaTrace(pulled, {
    type: "backpack_pending",
    at: 7_500,
    attempts: 6,
    retryAfterMs: 3_000,
    message: "Backpack 尚未消费本次 Kafka 事件，可重新检查。",
  });

  const frames = buildGachaReplayFrames(pending);

  assert.deepEqual(
    frames.map((frame) => frame.edgeId),
    GACHA_TRACE_EDGES.map((edge) => edge.id),
  );
  assert.equal(frames[0]?.sourceNodeId, "browser");
  assert.equal(frames.at(-1)?.targetNodeId, "backpack-db");
  assert.equal(frames.at(-1)?.status, "waiting");
  assert.ok(frames.every((frame) => frame.packet !== null));
});

test("attributes dependency errors to the node where the request stopped", () => {
  assert.equal(locateGachaFailure("next_auth_missing").nodeId, "next");
  assert.equal(locateGachaFailure("invalid_idempotency_key").nodeId, "next");
  assert.equal(locateGachaFailure("gateway_connection_failed").nodeId, "gateway");
  assert.equal(locateGachaFailure("upstream_unavailable").nodeId, "gacha");
  assert.equal(locateGachaFailure("gacha_config_unavailable").nodeId, "config");
  assert.equal(locateGachaFailure("insufficient_balance").nodeId, "asset");
  assert.equal(locateGachaFailure("redis_unavailable").nodeId, "redis");
  assert.equal(locateGachaFailure("kafka_unavailable").nodeId, "kafka");
});

test("marks the failed node and skips work that cannot run afterward", () => {
  const initial = createGachaTraceRun({
    runId: "run-2",
    bannerId: "limited-character-1",
    count: 1,
    startedAt: 2_000,
  });
  const running = reduceGachaTrace(initial, {
    type: "request_started",
    at: 2_000,
  });
  const failed = reduceGachaTrace(running, {
    type: "pull_failed",
    at: 2_180,
    requestId: "request-2",
    code: "kafka_unavailable",
    message: "pull event could not be published",
  });

  assert.equal(failed.status, "error");
  assert.equal(failed.failedNodeId, "kafka");
  assert.equal(failed.nodes.asset.status, "success");
  assert.equal(failed.nodes.redis.status, "success");
  assert.equal(failed.nodes.kafka.status, "error");
  assert.equal(failed.nodes.backpack.status, "skipped");
  assert.equal(failed.nodes["backpack-db"].status, "skipped");
  assert.match(failed.summary, /Kafka/);
});

test("converts gateway audit details without exposing authentication headers", () => {
  const snapshot = toGachaTraceAuditSnapshot({
    request_id: "request-3",
    started_at: "2026-07-24T03:00:00.000Z",
    finished_at: "2026-07-24T03:00:00.125Z",
    duration_ms: 125,
    upstream_url: "http://gacha-engine-service/v1/me/pulls",
    response_status: 200,
    error_code: null,
    error_message: null,
    request_body_json: { banner_id: "limited-character-1", count: 10 },
    response_body_json: { event_id: "event-3" },
    request_headers: { authorization: ["Bearer secret"] },
    response_headers: { "x-internal-token": ["secret"] },
  });

  assert.deepEqual(snapshot, {
    requestId: "request-3",
    startedAt: "2026-07-24T03:00:00.000Z",
    finishedAt: "2026-07-24T03:00:00.125Z",
    durationMs: 125,
    upstreamUrl: "http://gacha-engine-service/v1/me/pulls",
    responseStatus: 200,
    errorCode: null,
    errorMessage: null,
    requestBody: { banner_id: "limited-character-1", count: 10 },
    responseBody: { event_id: "event-3" },
  });
  assert.equal("requestHeaders" in snapshot, false);
  assert.equal("responseHeaders" in snapshot, false);
});

test("replaces the old Sandbox experience with an interactive trace lab", () => {
  const page = read("../app/page.tsx");
  const lab = read("../app/SandboxTraceLab.tsx");
  const canvas = read("../components/trace/GachaTraceCanvas.tsx");
  const waterfall = read("../components/trace/TraceWaterfall.tsx");
  const packageJson = read("../package.json");

  assert.match(page, /import SandboxTraceLab from "\.\/SandboxTraceLab"/);
  assert.doesNotMatch(page, /import GachaExperience from "\.\/GachaExperience"/);
  assert.match(packageJson, /"@xyflow\/react"/);
  assert.match(canvas, /ReactFlow/);
  assert.match(canvas, /north-south/);
  assert.match(canvas, /east-west/);
  assert.match(waterfall, /GACHA_TRACE_NODE_ORDER/);
  assert.match(lab, /drawGachaPull/);
  assert.match(lab, /loadGachaTraceAudit/);
  assert.match(lab, /syncGachaBackpackAfterPull/);
  assert.match(lab, /南北流量/);
  assert.match(lab, /东西流量/);
});

test("keeps trace nodes operable on keyboard and readable on narrow screens", () => {
  const canvas = read("../components/trace/GachaTraceCanvas.tsx");

  assert.match(canvas, /COMPACT_NODE_POSITIONS/);
  assert.match(canvas, /data-testid={`trace-node-\${data\.nodeId}`}/);
  assert.match(canvas, /aria-pressed={selected}/);
  assert.match(canvas, /type="button"/);
});

test("opens node details in a wide light dialog and gives the canvas the freed width", () => {
  const lab = read("../app/SandboxTraceLab.tsx");
  const inspector = read("../components/trace/TraceNodeInspector.tsx");

  assert.match(lab, /const \[isInspectorOpen, setIsInspectorOpen\]/);
  assert.match(lab, /onSelectNode={openNodeInspector}/);
  assert.match(lab, /open={isInspectorOpen}/);
  assert.match(lab, /xl:grid-cols-\[232px_minmax\(620px,1fr\)\]/);
  assert.doesNotMatch(lab, /_288px/);
  assert.match(lab, /bg-white px-4 py-2 text-\[#17251e\]/);

  assert.match(inspector, /DialogContent/);
  assert.match(inspector, /data-testid="trace-node-inspector-dialog"/);
  assert.match(inspector, /bg-\[#f8faf9\]/);
  assert.match(inspector, /bg-\[#f3f6f4\]/);
  assert.doesNotMatch(inspector, /bg-\[#17231d\]/);
});

test("allows a pending idempotent pull to recover without charging the display twice", () => {
  const lab = read("../app/SandboxTraceLab.tsx");

  assert.match(lab, /recoverableOperation/);
  assert.match(lab, /isRecovery/);
  assert.match(lab, /if \(!isRecovery\)/);
  assert.match(lab, /恢复上一笔/);
});

test("classifies Backpack 404 responses as retryable pending state", () => {
  const actions = read("../app/gacha/actions.ts");
  const lab = read("../app/SandboxTraceLab.tsx");

  assert.match(actions, /error instanceof GatewayFetchError\s*&&\s*error\.status === 404/);
  assert.match(actions, /state: "pending"/);
  assert.match(actions, /code: "pull_event_pending"/);
  assert.match(lab, /backpack_pending/);
  assert.match(lab, /重新检查/);
});

test("provides replay controls and projects replay state onto the graph", () => {
  const lab = read("../app/SandboxTraceLab.tsx");
  const controls = read("../components/trace/TraceReplayControls.tsx");
  const canvas = read("../components/trace/GachaTraceCanvas.tsx");

  assert.match(lab, /buildGachaReplayFrames/);
  assert.match(controls, /播放/);
  assert.match(controls, /暂停/);
  assert.match(controls, /重新播放/);
  assert.match(controls, /type="range"/);
  assert.match(controls, /播放速度/);
  assert.match(canvas, /replayEdgeId/);
  assert.match(canvas, /replayNodeId/);
});

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
