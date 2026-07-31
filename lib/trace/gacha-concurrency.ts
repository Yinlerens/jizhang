import {
  createGachaTraceRun,
  reduceGachaTrace,
  type GachaTraceAuditSnapshot,
  type GachaTracePullRecordSnapshot,
  type GachaTraceRun,
} from "./gacha-run.ts";

export const GACHA_CONCURRENCY_MIN_REQUESTS = 2;
export const GACHA_CONCURRENCY_MAX_REQUESTS = 10;
export const GACHA_CONCURRENCY_MAX_INTERVAL_MS = 500;

export type GachaConcurrencyMode =
  | "shared-idempotency"
  | "independent-idempotency";

export type GachaConcurrencyInput = {
  bannerId: string;
  count: 1 | 10;
  requestCount: number;
  intervalMs: number;
  mode: GachaConcurrencyMode;
};

export type GachaConcurrencyPlanItem = {
  sequence: number;
  requestId: string;
  idempotencyKey: string;
  delayMs: number;
};

export type GachaConcurrencyPullRecord = GachaTracePullRecordSnapshot & {
  itemType: string;
  isFeatured: boolean;
};

export type GachaConcurrencyRequestResult = {
  sequence: number;
  requestId: string;
  idempotencyKey: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  ok: boolean;
  httpStatus: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  eventId: string | null;
  stateVersion: number | null;
  nextPity?: unknown;
  records: GachaConcurrencyPullRecord[];
  audit: GachaTraceAuditSnapshot | null;
};

export type GachaConcurrencySummary = {
  submittedCount: number;
  successCount: number;
  uniqueEventCount: number;
  idempotencyProtectedCount: number;
  versionConflictCount: number;
  failureCount: number;
  balanceBeforeMinor: number | null;
  balanceAfterMinor: number | null;
  actualDeductionMinor: number | null;
};

export type GachaConcurrencyBatch = {
  batchId: string;
  bannerId: string;
  count: 1 | 10;
  mode: GachaConcurrencyMode;
  requestCount: number;
  intervalMs: number;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  requests: GachaConcurrencyRequestResult[];
  summary: GachaConcurrencySummary;
};

export type GachaConcurrencyTrace = {
  run: GachaTraceRun;
  results: Array<{
    id: string;
    itemId: string;
    itemName: string;
    rarity: 3 | 4 | 5;
    isFeatured: boolean;
  }>;
};

type ConcurrencyValidationResult =
  | { ok: true; value: GachaConcurrencyInput }
  | { ok: false; code: string; message: string };

export function validateGachaConcurrencyInput(input: unknown): ConcurrencyValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return invalid("invalid_concurrency_input", "并发抽取参数不合法。");
  }

  const candidate = input as Record<string, unknown>;
  const bannerId = typeof candidate.bannerId === "string" ? candidate.bannerId.trim() : "";
  if (!bannerId || bannerId.length > 100) {
    return invalid("invalid_banner_id", "卡池 ID 不合法，请刷新页面后重试。");
  }

  if (candidate.count !== 1 && candidate.count !== 10) {
    return invalid("invalid_pull_count", "只能执行 1 抽或 10 抽。");
  }

  if (
    !Number.isInteger(candidate.requestCount) ||
    (candidate.requestCount as number) < GACHA_CONCURRENCY_MIN_REQUESTS ||
    (candidate.requestCount as number) > GACHA_CONCURRENCY_MAX_REQUESTS
  ) {
    return invalid(
      "invalid_request_count",
      `并发请求数必须在 ${GACHA_CONCURRENCY_MIN_REQUESTS} 到 ${GACHA_CONCURRENCY_MAX_REQUESTS} 之间。`,
    );
  }

  if (
    !Number.isInteger(candidate.intervalMs) ||
    (candidate.intervalMs as number) < 0 ||
    (candidate.intervalMs as number) > GACHA_CONCURRENCY_MAX_INTERVAL_MS
  ) {
    return invalid(
      "invalid_request_interval",
      `请求间隔必须在 0 到 ${GACHA_CONCURRENCY_MAX_INTERVAL_MS}ms 之间。`,
    );
  }

  if (
    candidate.mode !== "shared-idempotency" &&
    candidate.mode !== "independent-idempotency"
  ) {
    return invalid("invalid_concurrency_mode", "并发模式不合法。");
  }

  return {
    ok: true,
    value: {
      bannerId,
      count: candidate.count,
      requestCount: candidate.requestCount as number,
      intervalMs: candidate.intervalMs as number,
      mode: candidate.mode,
    },
  };
}

export function createGachaConcurrencyPlan(
  input: Pick<GachaConcurrencyInput, "requestCount" | "intervalMs" | "mode">,
  createId: () => string = () => crypto.randomUUID(),
): GachaConcurrencyPlanItem[] {
  const sharedIdempotencyKey =
    input.mode === "shared-idempotency" ? createId() : null;

  return Array.from({ length: input.requestCount }, (_, index) => ({
    sequence: index + 1,
    requestId: createId(),
    idempotencyKey: sharedIdempotencyKey ?? createId(),
    delayMs: index * input.intervalMs,
  }));
}

export function summarizeGachaConcurrencyBatch(
  requests: GachaConcurrencyRequestResult[],
  balanceBeforeMinor: number | null,
  balanceAfterMinor: number | null,
): GachaConcurrencySummary {
  const successfulEvents = requests.flatMap((request) =>
    request.ok && request.eventId ? [request.eventId] : [],
  );
  const uniqueEventCount = new Set(successfulEvents).size;
  const replayedEventCount = successfulEvents.length - uniqueEventCount;
  const rejectedByIdempotency = requests.filter(
    (request) =>
      !request.ok &&
      (request.errorCode === "pull_in_progress" ||
        request.errorCode?.includes("idempotency") === true),
  ).length;

  return {
    submittedCount: requests.length,
    successCount: requests.filter((request) => request.ok).length,
    uniqueEventCount,
    idempotencyProtectedCount: replayedEventCount + rejectedByIdempotency,
    versionConflictCount: requests.filter(
      (request) => request.errorCode === "pity_version_conflict",
    ).length,
    failureCount: requests.filter((request) => !request.ok).length,
    balanceBeforeMinor,
    balanceAfterMinor,
    actualDeductionMinor:
      balanceBeforeMinor === null || balanceAfterMinor === null
        ? null
        : Math.max(0, balanceBeforeMinor - balanceAfterMinor),
  };
}

export function createGachaConcurrencyTrace({
  bannerId,
  count,
  item,
}: {
  bannerId: string;
  count: 1 | 10;
  item: GachaConcurrencyRequestResult;
}): GachaConcurrencyTrace {
  const startedAt = timestamp(item.startedAt, 0);
  const finishedAt = timestamp(item.finishedAt, startedAt + item.durationMs);
  let run = createGachaTraceRun({
    runId: `concurrency:${item.requestId}`,
    bannerId,
    count,
    startedAt,
  });

  run = reduceGachaTrace(run, {
    type: "request_started",
    at: startedAt,
    requestId: item.requestId,
    idempotencyKey: item.idempotencyKey,
  });

  if (item.ok && item.eventId) {
    run = reduceGachaTrace(run, {
      type: "pull_succeeded",
      at: finishedAt,
      requestId: item.requestId,
      eventId: item.eventId,
      result: {
        stateVersion: item.stateVersion ?? 0,
        nextPity: item.nextPity ?? null,
        records: item.records,
      },
    });
  } else {
    run = reduceGachaTrace(run, {
      type: "pull_failed",
      at: finishedAt,
      requestId: item.requestId,
      code: item.errorCode ?? "concurrency_response_incomplete",
      message: item.errorMessage ?? "并发请求未返回完整抽卡结果。",
    });
  }

  if (item.audit) {
    run = reduceGachaTrace(run, { type: "audit_loaded", audit: item.audit });
  }

  return {
    run,
    results: item.records.map((record) => ({
      id: record.id,
      itemId: record.itemId,
      itemName: record.itemName,
      rarity: record.rarity,
      isFeatured: record.isFeatured,
    })),
  };
}

function invalid(code: string, message: string): ConcurrencyValidationResult {
  return { ok: false, code, message };
}

function timestamp(value: string, fallback: number) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
