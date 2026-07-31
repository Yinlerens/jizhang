import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  createGachaConcurrencyPlan,
  createGachaConcurrencyTrace,
  summarizeGachaConcurrencyBatch,
  validateGachaConcurrencyInput,
  type GachaConcurrencyRequestResult,
} from "../lib/trace/gacha-concurrency.ts";

test("validates the bounded concurrency controls", () => {
  for (const requestCount of [2, 10]) {
    for (const intervalMs of [0, 500]) {
      const result = validateGachaConcurrencyInput({
        bannerId: "limited-character-1",
        count: 10,
        requestCount,
        intervalMs,
        mode: "independent-idempotency",
      });

      assert.equal(result.ok, true);
    }
  }

  for (const invalid of [
    { requestCount: 1, intervalMs: 0 },
    { requestCount: 11, intervalMs: 0 },
    { requestCount: 5, intervalMs: -1 },
    { requestCount: 5, intervalMs: 501 },
  ]) {
    const result = validateGachaConcurrencyInput({
      bannerId: "limited-character-1",
      count: 1,
      mode: "shared-idempotency",
      ...invalid,
    });

    assert.equal(result.ok, false);
  }
});

test("builds unique request ids while sharing only the selected idempotency key", () => {
  let sequence = 0;
  const createId = () => `generated-${++sequence}`;
  const shared = createGachaConcurrencyPlan(
    {
      requestCount: 4,
      intervalMs: 50,
      mode: "shared-idempotency",
    },
    createId,
  );

  assert.equal(new Set(shared.map((item) => item.requestId)).size, 4);
  assert.equal(new Set(shared.map((item) => item.idempotencyKey)).size, 1);
  assert.deepEqual(shared.map((item) => item.delayMs), [0, 50, 100, 150]);

  const independent = createGachaConcurrencyPlan(
    {
      requestCount: 4,
      intervalMs: 0,
      mode: "independent-idempotency",
    },
    createId,
  );

  assert.equal(new Set(independent.map((item) => item.requestId)).size, 4);
  assert.equal(new Set(independent.map((item) => item.idempotencyKey)).size, 4);
});

test("summarizes duplicate events, idempotency protection, conflicts, and real deduction", () => {
  const items = [
    requestResult({ sequence: 1, eventId: "event-a" }),
    requestResult({ sequence: 2, requestId: "request-2", eventId: "event-a" }),
    requestResult({
      sequence: 3,
      requestId: "request-3",
      ok: false,
      eventId: null,
      errorCode: "pull_in_progress",
      httpStatus: 409,
    }),
    requestResult({
      sequence: 4,
      requestId: "request-4",
      ok: false,
      eventId: null,
      errorCode: "pity_version_conflict",
      httpStatus: 409,
    }),
    requestResult({ sequence: 5, requestId: "request-5", eventId: "event-b" }),
  ];

  assert.deepEqual(summarizeGachaConcurrencyBatch(items, 20_000, 18_400), {
    submittedCount: 5,
    successCount: 3,
    uniqueEventCount: 2,
    idempotencyProtectedCount: 2,
    versionConflictCount: 1,
    failureCount: 2,
    balanceBeforeMinor: 20_000,
    balanceAfterMinor: 18_400,
    actualDeductionMinor: 1_600,
  });
});

test("turns one concurrent response into the complete main trace model", () => {
  const trace = createGachaConcurrencyTrace({
    bannerId: "limited-character-1",
    count: 1,
    item: requestResult({
      ok: false,
      eventId: null,
      errorCode: "redis_unavailable",
      errorMessage: "pull idempotency is unavailable",
      httpStatus: 503,
      audit: {
        requestId: "request-1",
        startedAt: "2026-07-27T08:00:00.000Z",
        finishedAt: "2026-07-27T08:00:00.120Z",
        durationMs: 120,
        upstreamUrl: "http://gacha-engine/api/v1/gacha/me/pulls",
        responseStatus: 503,
        errorCode: "redis_unavailable",
        errorMessage: "pull idempotency is unavailable",
        requestBody: { banner_id: "limited-character-1", count: 1 },
        responseBody: {
          error: {
            code: "redis_unavailable",
            message: "pull idempotency is unavailable",
          },
        },
      },
    }),
  });

  assert.equal(trace.run.requestId, "request-1");
  assert.equal(trace.run.failedNodeId, "redis");
  assert.equal(trace.run.nodes.gacha.status, "success");
  assert.equal(trace.run.nodes.gacha.httpStatus, 503);
  assert.equal(trace.run.nodes.redis.status, "error");
  assert.deepEqual(trace.results, []);
});

test("exposes a lazy concurrency lab backed by one parallel server action", () => {
  const lab = read("../app/SandboxTraceLab.tsx");
  const actions = read("../app/gacha/actions.ts");
  const dialog = read("../components/trace/TraceConcurrencyDialog.tsx");

  assert.match(lab, /dynamic\(\(\) => import\("@\/components\/trace\/TraceConcurrencyDialog"\)\)/);
  assert.match(lab, /并发抽取/);
  assert.match(lab, /traceSource[\s\S]*"concurrency"/);
  assert.match(actions, /export async function runGachaConcurrencyBatch/);
  assert.match(actions, /getAuthenticatedSession\(\)/);
  assert.match(actions, /Promise\.all\(/);
  assert.match(dialog, /data-testid="trace-concurrency-dialog"/);
  assert.match(dialog, /同一幂等键/);
  assert.match(dialog, /独立幂等键/);
  assert.match(dialog, /载入主拓扑/);
});

test("allows a concurrency batch to reach Asset Service when the displayed balance is low", () => {
  const dialog = read("../components/trace/TraceConcurrencyDialog.tsx");

  assert.doesNotMatch(dialog, /const insufficientBalance/);
  assert.doesNotMatch(dialog, /disabled=\{[^}]*insufficientBalance/);
  assert.match(dialog, /理论请求额/);
  assert.match(dialog, /当前[\s\S]*balanceMinor/);
});

function requestResult(
  overrides: Partial<GachaConcurrencyRequestResult> = {},
): GachaConcurrencyRequestResult {
  return {
    sequence: 1,
    requestId: "request-1",
    idempotencyKey: "idempotency-1",
    startedAt: "2026-07-27T08:00:00.000Z",
    finishedAt: "2026-07-27T08:00:00.100Z",
    durationMs: 100,
    ok: true,
    httpStatus: 200,
    errorCode: null,
    errorMessage: null,
    eventId: "event-1",
    stateVersion: 7,
    records: [],
    audit: null,
    ...overrides,
  };
}

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
