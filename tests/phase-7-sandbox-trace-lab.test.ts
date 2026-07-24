import assert from "node:assert/strict";
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

test("attributes dependency errors to the node where the request stopped", () => {
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
