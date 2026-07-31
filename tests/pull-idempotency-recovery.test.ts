import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  shouldPreservePullOperation,
  shouldPreservePullRecoveryLookup,
} from "../lib/gacha/pull-recovery.ts";

test("preserves the original operation whenever the pull outcome is uncertain", () => {
  for (const failure of [
    { code: "gateway_timeout", httpStatus: 0 },
    { code: "gateway_connection_failed", httpStatus: 0 },
    { code: "upstream_unavailable", httpStatus: 502 },
    { code: "kafka_unavailable", httpStatus: 503 },
    { code: "pull_in_progress", httpStatus: 409 },
    { code: "redis_unavailable", httpStatus: 503 },
    { code: "state_store_unavailable", httpStatus: 400 },
    { code: undefined, httpStatus: 500 },
    { code: undefined, httpStatus: undefined },
  ]) {
    assert.equal(shouldPreservePullOperation(failure), true, JSON.stringify(failure));
  }
});

test("clears the original operation only after an explicit terminal result", () => {
  for (const failure of [
    { code: "invalid_banner_id", httpStatus: undefined },
    { code: "invalid_pull_count", httpStatus: undefined },
    { code: "invalid_idempotency_key", httpStatus: undefined },
    { code: "banner_not_found", httpStatus: 404 },
    { code: "insufficient_assets", httpStatus: 409 },
    { code: "pity_version_conflict", httpStatus: 409 },
    { code: "pull_refunded", httpStatus: 409 },
    { code: "idempotency_conflict", httpStatus: 409 },
    { code: "pull_operation_not_found", httpStatus: 404 },
  ]) {
    assert.equal(shouldPreservePullOperation(failure), false, JSON.stringify(failure));
  }
});

test("does not treat a generic recovery 404 as proof that the operation is absent", () => {
  assert.equal(
    shouldPreservePullRecoveryLookup({ code: "pull_operation_not_found", httpStatus: 404 }),
    false,
  );
  assert.equal(shouldPreservePullRecoveryLookup({ code: undefined, httpStatus: 404 }), true);
  assert.equal(shouldPreservePullRecoveryLookup({ code: "request_error", httpStatus: 404 }), true);
  assert.equal(shouldPreservePullRecoveryLookup({ code: "unauthorized", httpStatus: 401 }), true);
});

test("queries operation state before recovery and reuses the original pull identity", () => {
  const gateway = read("../lib/gateway/gacha.ts");
  const actions = read("../app/gacha/actions.ts");

  assert.match(gateway, /getGachaPullOperation/);
  assert.match(gateway, /\/api\/v1\/gacha\/me\/pulls\/operation/);
  assert.match(gateway, /method: "GET"/);
  assert.match(gateway, /"Idempotency-Key": idempotencyKey/);
  assert.match(actions, /export async function recoverGachaPull/);
  assert.match(actions, /getGachaPullOperation/);
  assert.match(
    actions,
    /pullGachaWithRetry\(\{[\s\S]*bannerId:[\s\S]*count:[\s\S]*idempotencyKey:/,
  );
  assert.match(actions, /pull_operation_not_found/);
});

test("recognizes a Kafka-published pull while Backpack delivery is still confirming", () => {
  const gateway = read("../lib/gateway/gacha.ts");
  const actions = read("../app/gacha/actions.ts");

  assert.match(gateway, /\| "event_published"/);
  assert.match(actions, /operation\.status === "event_published"/);
});

test("uses the gateway response request id as the authoritative trace id", () => {
  const gateway = read("../lib/gateway/gacha.ts");
  const actions = read("../app/gacha/actions.ts");

  assert.match(gateway, /response\.headers\.get\("X-Request-Id"\)/);
  assert.match(gateway, /return \{\s*data,\s*requestId:/);
  assert.match(actions, /requestId: result\.requestId/);
  assert.doesNotMatch(actions, /return \{ data, requestId: activeRequestId \}/);
});

test("both pull experiences preserve or clear the stored key from the unified result", () => {
  for (const file of ["../app/SandboxTraceLab.tsx", "../app/GachaExperience.tsx"]) {
    const source = read(file);

    assert.match(source, /recoverGachaPull/);
    assert.match(source, /isRecovery|isRecoveringPendingPull/);
    assert.match(source, /result\.preserveOperation/);
  }

  const legacyExperience = read("../app/GachaExperience.tsx");
  assert.doesNotMatch(legacyExperience, /Date\.now\(\) - createdAt/);
});

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
