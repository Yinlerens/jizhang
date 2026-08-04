"use server";

import { randomUUID } from "node:crypto";

import {
  getGachaPullOperation,
  pullGacha,
  type GatewayPitySnapshot,
  type GatewayPullRecord,
  type PullGachaResponse,
} from "@/lib/gateway/gacha";
import { GatewayFetchError } from "@/lib/gateway/client";
import {
  shouldPreservePullOperation,
  shouldPreservePullRecoveryLookup,
} from "@/lib/gacha/pull-recovery";
import { getAuditLogDetail } from "@/lib/gateway/audit";
import { getAssetAccount } from "@/lib/gateway/assets";
import {
  getBackpackInventory,
  getBackpackPullEvent,
  getBackpackPullEvents,
  getBackpackPullRecords,
  type BackpackInventoryItem,
  type BackpackPullEvent,
  type BackpackPullRecord,
} from "@/lib/gateway/backpack";
import { getAuthenticatedSession } from "@/lib/supabase/server";
import { getPlayerPullReplay, getPlayerSupport } from "@/lib/gateway/player-support";
import { toGachaTraceAuditSnapshot } from "@/lib/trace/gacha-audit";
import {
  compareGachaHistoricalTraces,
  selectGachaTraceBaseline,
  type GachaHistoricalTrace,
  type GachaTraceComparison,
  type GachaTraceHistoryEntry,
} from "@/lib/trace/gacha-history";
import {
  createGachaOperationTrace,
  toGachaOperationHistoryEntry,
} from "@/lib/trace/gacha-operation-replay";
import {
  createGachaConcurrencyPlan,
  summarizeGachaConcurrencyBatch,
  validateGachaConcurrencyInput,
  type GachaConcurrencyBatch,
  type GachaConcurrencyInput,
  type GachaConcurrencyRequestResult,
} from "@/lib/trace/gacha-concurrency";
import {
  KAFKA_MONITOR_CONSUMER_GROUP,
  KAFKA_MONITOR_TOPIC,
  type KafkaMonitorSignal,
} from "@/lib/trace/kafka-monitor";
import type { GachaTraceAuditSnapshot } from "@/lib/trace/gacha-run";

export type PullGachaActionResult =
  | {
      ok: true;
      requestId: string;
      eventId: string;
      records: GatewayPullRecord[];
      nextPity: GatewayPitySnapshot;
      stateVersion: number;
    }
  | {
      ok: false;
      requestId: string;
      message: string;
      code?: string;
      httpStatus?: number;
      preserveOperation: boolean;
    };

type PullGachaActionInput = {
  bannerId: string;
  count: 1 | 10;
  idempotencyKey: string;
  requestId?: string;
};

type NormalizedPullGachaActionInput = {
  bannerId: string;
  count: 1 | 10;
  idempotencyKey: string;
  requestId: string;
};

export type BackpackSyncActionResult =
  | {
      ok: true;
      state: "success";
      event: BackpackPullEvent;
      eventRecords: BackpackPullRecord[];
      history: BackpackPullRecord[];
      inventory: BackpackInventoryItem[];
    }
  | {
      ok: false;
      state: "pending";
      code: "pull_event_pending";
      attempts: number;
      retryAfterMs: number;
      message: string;
    }
  | {
      ok: false;
      state: "error";
      code: string;
      httpStatus?: number;
      message: string;
    };

export type GachaTraceAuditActionResult =
  | { ok: true; audit: GachaTraceAuditSnapshot }
  | { ok: false; message: string };

export type SandboxInitialStateResult =
  | {
      ok: true;
      balanceMinor?: number;
      history: Array<{
        id: string;
        itemId: string;
        itemName: string;
        rarity: 3 | 4 | 5;
        isFeatured: boolean;
      }>;
    }
  | { ok: false; message: string };

export type GachaTraceHistoryActionResult =
  | { ok: true; entries: GachaTraceHistoryEntry[] }
  | { ok: false; message: string };

export type HistoricalGachaTraceActionResult =
  | { ok: true; trace: GachaHistoricalTrace }
  | { ok: false; message: string };

export type HistoricalGachaComparisonActionResult =
  | { ok: true; comparison: GachaTraceComparison }
  | { ok: false; message: string };

export type GachaConcurrencyActionResult =
  | { ok: true; batch: GachaConcurrencyBatch }
  | { ok: false; code: string; message: string };

export type KafkaTopicMonitorActionResult =
  | { ok: true; observedAt: string; signals: KafkaMonitorSignal[] }
  | { ok: false; code: string; message: string };

export async function loadSandboxInitialState(): Promise<SandboxInitialStateResult> {
  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    return { ok: false, message: "登录状态已失效。" };
  }

  const [accountResult, recordsResult] = await Promise.allSettled([
    getAssetAccount(session.access_token),
    getBackpackPullRecords({ accessToken: session.access_token, limit: 10 }),
  ]);

  return {
    ok: true,
    balanceMinor:
      accountResult.status === "fulfilled" ? accountResult.value.balance_minor : undefined,
    history:
      recordsResult.status === "fulfilled"
        ? recordsResult.value.items.map((record) => ({
            id: record.id,
            itemId: record.item_id,
            itemName: record.item_name,
            rarity: record.rarity,
            isFeatured: record.is_featured,
          }))
        : [],
  };
}

export async function loadKafkaTopicMonitor(): Promise<KafkaTopicMonitorActionResult> {
  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    return {
      ok: false,
      code: "next_auth_missing",
      message: "登录状态已失效，请重新登录。",
    };
  }

  try {
    const events = await getBackpackPullEvents({
      accessToken: session.access_token,
      limit: 100,
    });

    return {
      ok: true,
      observedAt: new Date().toISOString(),
      signals: events.items.map((event) => ({
        requestId: null,
        eventId: event.event_id,
        stage: "consumed",
        at: event.received_at,
        stateVersion: event.state_version,
        errorCode: null,
        payload: {
          topic: KAFKA_MONITOR_TOPIC,
          consumer_group: KAFKA_MONITOR_CONSUMER_GROUP,
          event_id: event.event_id,
          event_type: event.event_type,
          banner_id: event.banner_id,
          state_version: event.state_version,
          previous_pity: event.previous_pity,
          next_pity: event.next_pity,
          received_at: event.received_at,
        },
      })),
    };
  } catch (error) {
    return {
      ok: false,
      code:
        error instanceof GatewayFetchError
          ? error.code ?? "kafka_monitor_unavailable"
          : "kafka_monitor_unavailable",
      message: error instanceof Error ? error.message : "Kafka 消息状态暂不可用。",
    };
  }
}

export async function drawGachaPull(
  input: PullGachaActionInput,
): Promise<PullGachaActionResult> {
  const validation = validatePullGachaActionInput(input);
  if (!validation.ok) {
    return validation.result;
  }
  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    return {
      ok: false,
      requestId: validation.value.requestId,
      code: "next_auth_missing",
      message: "登录状态已失效，请重新登录。",
      preserveOperation: false,
    };
  }

  return executeAuthenticatedPull({
    ...validation.value,
    accessToken: session.access_token,
  });
}

export async function recoverGachaPull(
  input: PullGachaActionInput,
): Promise<PullGachaActionResult> {
  const validation = validatePullGachaActionInput(input);
  if (!validation.ok) {
    return validation.result;
  }

  const pullInput = validation.value;
  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    return {
      ok: false,
      requestId: pullInput.requestId,
      code: "next_auth_missing",
      message: "登录状态已失效；登录后仍可继续确认上一笔抽卡。",
      preserveOperation: true,
    };
  }

  try {
    const operationResult = await getGachaPullOperation({
      accessToken: session.access_token,
      idempotencyKey: pullInput.idempotencyKey,
      requestId: pullInput.requestId,
    });
    const operation = operationResult.data;

    if (operation.status === "succeeded" || operation.status === "event_published") {
      if (!operation.response) {
        return {
          ok: false,
          requestId: operationResult.requestId,
          code: "pull_operation_incomplete",
          message: "服务器已完成抽卡，但结果暂时无法读取，请稍后再次确认。",
          preserveOperation: true,
        };
      }
      return toSuccessfulPullResult(operation.response, operationResult.requestId);
    }

    if (operation.status === "failed") {
      return {
        ok: false,
        requestId: operationResult.requestId,
        code: operation.error?.code ?? "pull_failed",
        httpStatus: 409,
        message: operation.error?.message ?? "上一笔抽卡已明确失败，可以重新发起。",
        preserveOperation: false,
      };
    }

    if (operation.status === "processing") {
      return {
        ok: false,
        requestId: operationResult.requestId,
        code: "pull_in_progress",
        httpStatus: 409,
        message: "上一笔抽卡仍在服务器处理中，请稍后再次确认。",
        preserveOperation: true,
      };
    }

    if (
      operation.status === "event_pending" || operation.status === "refund_pending"
    ) {
      return executeAuthenticatedPull({
        ...pullInput,
        accessToken: session.access_token,
        requestId: randomUUID(),
      });
    }

    return {
      ok: false,
      requestId: operationResult.requestId,
      code: "pull_operation_unknown_status",
      message: "服务器返回了无法识别的抽卡状态，系统已停止自动恢复。",
      preserveOperation: true,
    };
  } catch (error) {
    if (error instanceof GatewayFetchError) {
      const preserveOperation = shouldPreservePullRecoveryLookup({
        code: error.code,
        httpStatus: error.status,
      });
      const operationNotFound = !preserveOperation;
      return {
        ok: false,
        requestId: error.requestId ?? pullInput.requestId,
        code: operationNotFound ? "pull_operation_not_found" : error.code,
        httpStatus: error.status,
        message: operationNotFound
          ? "服务器已找不到上一笔操作，系统没有自动重抽；请再次点击发起一笔新抽卡。"
          : error.message,
        preserveOperation,
      };
    }

    return {
      ok: false,
      requestId: pullInput.requestId,
      message: error instanceof Error ? error.message : "上一笔抽卡状态暂时无法确认。",
      preserveOperation: true,
    };
  }
}

async function executeAuthenticatedPull({
  accessToken,
  bannerId,
  count,
  idempotencyKey,
  requestId,
}: NormalizedPullGachaActionInput & { accessToken: string }): Promise<PullGachaActionResult> {
  try {
    const result = await pullGachaWithRetry({
      accessToken,
      bannerId,
      count,
      idempotencyKey,
      requestId,
    });
    return toSuccessfulPullResult(result.data, result.requestId);
  } catch (error) {
    if (error instanceof GatewayFetchError) {
      return {
        ok: false,
        requestId: error.requestId ?? requestId,
        code: error.code,
        httpStatus: error.status,
        message:
          error.code === "kafka_unavailable"
            ? "抽卡结果已生成但暂未同步，请再次点击同一卡池同一抽数恢复结果。"
            : error.message,
        preserveOperation: shouldPreservePullOperation({
          code: error.code,
          httpStatus: error.status,
        }),
      };
    }

    return {
      ok: false,
      requestId,
      message: error instanceof Error ? error.message : "抽取失败，请稍后重试。",
      preserveOperation: true,
    };
  }
}

function toSuccessfulPullResult(
  data: PullGachaResponse,
  requestId: string,
): PullGachaActionResult {
  return {
    ok: true,
    requestId,
    eventId: data.event_id,
    records: data.records,
    nextPity: data.next_pity,
    stateVersion: data.state_version,
  };
}

function validatePullGachaActionInput(
  input: PullGachaActionInput,
):
  | { ok: true; value: NormalizedPullGachaActionInput }
  | { ok: false; result: PullGachaActionResult } {
  const requestId = normalizeRequestId(input.requestId);
  const bannerId = typeof input.bannerId === "string" ? input.bannerId.trim() : "";
  if (!bannerId || bannerId.length > 100) {
    return {
      ok: false,
      result: {
        ok: false,
        requestId,
        code: "invalid_banner_id",
        message: "卡池 ID 不合法，请刷新页面后重试。",
        preserveOperation: false,
      },
    };
  }

  if (input.count !== 1 && input.count !== 10) {
    return {
      ok: false,
      result: {
        ok: false,
        requestId,
        code: "invalid_pull_count",
        message: "只能执行 1 抽或 10 抽。",
        preserveOperation: false,
      },
    };
  }

  const idempotencyKey =
    typeof input.idempotencyKey === "string" ? input.idempotencyKey.trim() : "";
  if (!isUuidLike(idempotencyKey)) {
    return {
      ok: false,
      result: {
        ok: false,
        requestId,
        code: "invalid_idempotency_key",
        message: "抽卡请求标识不合法，请刷新页面后重试。",
        preserveOperation: false,
      },
    };
  }

  return {
    ok: true,
    value: {
      bannerId,
      count: input.count,
      idempotencyKey,
      requestId,
    },
  };
}

export async function runGachaConcurrencyBatch(
  input: GachaConcurrencyInput,
): Promise<GachaConcurrencyActionResult> {
  const validation = validateGachaConcurrencyInput(input);
  if (!validation.ok) {
    return validation;
  }

  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    return {
      ok: false,
      code: "next_auth_missing",
      message: "登录状态已失效，请重新登录。",
    };
  }

  const batchId = randomUUID();
  const balanceBeforeMinor = await readAssetBalance(session.access_token);
  const batchStartedAt = Date.now();
  const plan = createGachaConcurrencyPlan(validation.value, randomUUID);
  const requests = await Promise.all(
    plan.map(async (planned) => {
      if (planned.delayMs > 0) {
        await delay(planned.delayMs);
      }

      const startedAt = Date.now();
      try {
        const result = await pullGacha({
          accessToken: session.access_token,
          bannerId: validation.value.bannerId,
          count: validation.value.count,
          idempotencyKey: planned.idempotencyKey,
          requestId: planned.requestId,
        });
        const finishedAt = Date.now();

        return {
          sequence: planned.sequence,
          requestId: result.requestId,
          idempotencyKey: planned.idempotencyKey,
          startedAt: new Date(startedAt).toISOString(),
          finishedAt: new Date(finishedAt).toISOString(),
          durationMs: Math.max(0, finishedAt - startedAt),
          ok: true,
          httpStatus: 200,
          errorCode: null,
          errorMessage: null,
          eventId: result.data.event_id,
          stateVersion: result.data.state_version,
          nextPity: result.data.next_pity,
          records: result.data.records.map((record) => ({
            id: record.id,
            itemId: record.item_id,
            itemName: record.item_name,
            itemType: record.item_type,
            rarity: record.rarity,
            isFeatured: record.is_featured,
          })),
          audit: null,
        } satisfies GachaConcurrencyRequestResult;
      } catch (error) {
        const finishedAt = Date.now();
        return {
          sequence: planned.sequence,
          requestId:
            error instanceof GatewayFetchError
              ? error.requestId ?? planned.requestId
              : planned.requestId,
          idempotencyKey: planned.idempotencyKey,
          startedAt: new Date(startedAt).toISOString(),
          finishedAt: new Date(finishedAt).toISOString(),
          durationMs: Math.max(0, finishedAt - startedAt),
          ok: false,
          httpStatus: error instanceof GatewayFetchError ? error.status : null,
          errorCode:
            error instanceof GatewayFetchError
              ? error.code ?? "gateway_request_failed"
              : "unknown_error",
          errorMessage:
            error instanceof Error ? error.message : "并发抽卡请求失败。",
          eventId: null,
          stateVersion: null,
          records: [],
          audit: null,
        } satisfies GachaConcurrencyRequestResult;
      }
    }),
  );
  const batchFinishedAt = Date.now();
  const [balanceAfterMinor, requestsWithAudit] = await Promise.all([
    readAssetBalance(session.access_token),
    attachConcurrencyAudits(session.access_token, requests),
  ]);

  return {
    ok: true,
    batch: {
      batchId,
      bannerId: validation.value.bannerId,
      count: validation.value.count,
      mode: validation.value.mode,
      requestCount: validation.value.requestCount,
      intervalMs: validation.value.intervalMs,
      startedAt: new Date(batchStartedAt).toISOString(),
      finishedAt: new Date(batchFinishedAt).toISOString(),
      durationMs: Math.max(0, batchFinishedAt - batchStartedAt),
      requests: requestsWithAudit,
      summary: summarizeGachaConcurrencyBatch(
        requestsWithAudit,
        balanceBeforeMinor,
        balanceAfterMinor,
      ),
    },
  };
}

async function pullGachaWithRetry({
  accessToken,
  bannerId,
  count,
  idempotencyKey,
  requestId,
}: {
  accessToken: string;
  bannerId: string;
  count: 1 | 10;
  idempotencyKey: string;
  requestId: string;
}) {
  let lastError: unknown;
  let activeRequestId = requestId;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await pullGacha({
        accessToken,
        bannerId,
        count,
        idempotencyKey,
        requestId: activeRequestId,
      });
    } catch (error) {
      lastError = error;
      if (!(error instanceof GatewayFetchError) || error.code !== "kafka_unavailable") {
        throw error;
      }
      await delay(300);
      activeRequestId = randomUUID();
    }
  }

  throw lastError instanceof Error ? lastError : new Error("抽取失败，请稍后重试。");
}

export async function loadGachaTraceAudit({
  requestId,
}: {
  requestId: string;
}): Promise<GachaTraceAuditActionResult> {
  const normalizedRequestId = requestId.trim();
  if (!isUuidLike(normalizedRequestId)) {
    return { ok: false, message: "请求编号不合法。" };
  }

  const { user, session } = await getAuthenticatedSession();

  if (!user || !session?.access_token) {
    return { ok: false, message: "登录状态已失效。" };
  }

  try {
    const detail = await getAuditLogDetail(session.access_token, normalizedRequestId);
    return { ok: true, audit: toGachaTraceAuditSnapshot(detail) };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "请求审计详情暂不可用。",
    };
  }
}

export async function loadGachaTraceHistory({
  playerId,
}: {
  playerId?: string;
} = {}): Promise<GachaTraceHistoryActionResult> {
  const { user, session } = await getAuthenticatedSession();

  if (!user || !session?.access_token) {
    return { ok: false, message: "登录状态已失效。" };
  }

  const targetPlayerId = playerId?.trim() || user.id;
  if (!isUuidLike(targetPlayerId)) {
    return { ok: false, message: "玩家 ID 不合法。" };
  }

  try {
    const support = await getPlayerSupport(session.access_token, targetPlayerId);
    if (support.sections.pull_operations.status !== "ok") {
      return {
        ok: false,
        message: support.sections.pull_operations.error?.message ?? "抽卡记录暂时不可用。",
      };
    }
    const entries = (support.sections.pull_operations.data?.items ?? []).map(
      toGachaOperationHistoryEntry,
    );

    return { ok: true, entries };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "抽卡记录暂时不可用。",
    };
  }
}

export async function loadHistoricalGachaTrace({
  operationId,
  playerId,
}: {
  operationId: string;
  playerId?: string;
}): Promise<HistoricalGachaTraceActionResult> {
  const normalizedOperationId = operationId.trim();
  if (!isUuidLike(normalizedOperationId)) {
    return { ok: false, message: "请输入完整有效的抽卡操作 ID。" };
  }

  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    return { ok: false, message: "登录状态已失效。" };
  }

  const targetPlayerId = playerId?.trim() || user.id;
  if (!isUuidLike(targetPlayerId)) {
    return { ok: false, message: "玩家 ID 不合法。" };
  }

  try {
    const replay = await getPlayerPullReplay(
      session.access_token,
      targetPlayerId,
      normalizedOperationId,
    );
    return {
      ok: true,
      trace: createGachaOperationTrace(replay),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "抽卡记录加载失败。",
    };
  }
}

export async function compareHistoricalGachaTrace({
  operationId,
  playerId,
}: {
  operationId: string;
  playerId?: string;
}): Promise<HistoricalGachaComparisonActionResult> {
  const normalizedOperationId = operationId.trim();
  if (!isUuidLike(normalizedOperationId)) {
    return { ok: false, message: "请输入完整有效的抽卡操作 ID。" };
  }

  const { user, session } = await getAuthenticatedSession();
  if (!user || !session?.access_token) {
    return { ok: false, message: "登录状态已失效。" };
  }

  const targetPlayerId = playerId?.trim() || user.id;
  if (!isUuidLike(targetPlayerId)) {
    return { ok: false, message: "玩家 ID 不合法。" };
  }

  try {
    const [targetReplay, support] = await Promise.all([
      getPlayerPullReplay(session.access_token, targetPlayerId, normalizedOperationId),
      getPlayerSupport(session.access_token, targetPlayerId),
    ]);
    const target = createGachaOperationTrace(targetReplay);
    const candidates = (support.sections.pull_operations.data?.items ?? []).map(
      toGachaOperationHistoryEntry,
    );
    const baselineEntry = selectGachaTraceBaseline(target.entry, candidates);

    if (!baselineEntry) {
      return { ok: false, message: "没有找到同卡池、同抽数的成功记录。" };
    }
    if (!baselineEntry.operationId) {
      return { ok: false, message: "对比记录缺少抽卡操作 ID。" };
    }

    const baselineReplay = await getPlayerPullReplay(
      session.access_token,
      targetPlayerId,
      baselineEntry.operationId,
    );
    const baseline = createGachaOperationTrace(baselineReplay);

    return {
      ok: true,
      comparison: compareGachaHistoricalTraces(target, baseline),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "抽卡记录对比失败。",
    };
  }
}

export async function syncGachaBackpackAfterPull({
  eventId,
}: {
  eventId: string;
}): Promise<BackpackSyncActionResult> {
  const normalizedEventId = eventId.trim();
  if (!isUuidLike(normalizedEventId)) {
    return {
      ok: false,
      state: "error",
      code: "invalid_event_id",
      message: "抽卡事件 ID 不合法，请刷新页面后重试。",
    };
  }

  const { user, session } = await getAuthenticatedSession();

  if (!user || !session?.access_token) {
    return {
      ok: false,
      state: "error",
      code: "next_auth_missing",
      message: "登录状态已失效，请重新登录。",
    };
  }

  try {
    const lookup = await waitForPullEvent(session.access_token, normalizedEventId);
    if (lookup.state === "pending") {
      return {
        ok: false,
        state: "pending",
        code: "pull_event_pending",
        attempts: lookup.attempts,
        retryAfterMs: lookup.retryAfterMs,
        message: "Kafka 事件已发布，但 Backpack 尚未消费。可稍后重新检查本次事件。",
      };
    }

    const detail = lookup.detail;
    const [inventory, history] = await Promise.all([
      getBackpackInventory({ accessToken: session.access_token, limit: 100 }),
      getBackpackPullRecords({ accessToken: session.access_token, limit: 100 }),
    ]);

    return {
      ok: true,
      state: "success",
      event: detail.event,
      eventRecords: detail.records,
      history: history.items,
      inventory: inventory.items,
    };
  } catch (error) {
    return {
      ok: false,
      state: "error",
      code: error instanceof GatewayFetchError ? error.code ?? "backpack_sync_failed" : "backpack_sync_failed",
      httpStatus: error instanceof GatewayFetchError ? error.status : undefined,
      message: error instanceof Error ? error.message : "背包同步失败，请稍后刷新。",
    };
  }
}

async function waitForPullEvent(accessToken: string, eventId: string) {
  const retryDelaysMs = [200, 350, 600, 900, 1_300] as const;
  const maxAttempts = retryDelaysMs.length + 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const detail = await getBackpackPullEvent({ accessToken, eventId });
      return { state: "success" as const, detail, attempts: attempt };
    } catch (error) {
      if (!isRetryablePullEventError(error)) {
        throw error;
      }
      if (attempt === maxAttempts) {
        return {
          state: "pending" as const,
          attempts: attempt,
          retryAfterMs: 3_000,
        };
      }
      await delay(retryDelaysMs[attempt - 1]);
    }
  }

  return { state: "pending" as const, attempts: maxAttempts, retryAfterMs: 3_000 };
}

function isRetryablePullEventError(error: unknown) {
  return error instanceof GatewayFetchError && error.status === 404;
}

async function readAssetBalance(accessToken: string) {
  try {
    const account = await getAssetAccount(accessToken);
    return account.balance_minor;
  } catch {
    return null;
  }
}

async function attachConcurrencyAudits(
  accessToken: string,
  requests: GachaConcurrencyRequestResult[],
) {
  return Promise.all(
    requests.map(async (request) => {
      const audit = await loadConcurrencyAudit(accessToken, request.requestId);
      return audit ? { ...request, audit } : request;
    }),
  );
}

async function loadConcurrencyAudit(accessToken: string, requestId: string) {
  const retryDelaysMs = [0, 150, 350] as const;

  for (const retryDelayMs of retryDelaysMs) {
    if (retryDelayMs > 0) {
      await delay(retryDelayMs);
    }
    try {
      const detail = await getAuditLogDetail(accessToken, requestId);
      return toGachaTraceAuditSnapshot(detail);
    } catch {
      // Audit persistence can trail the gateway response by a few hundred milliseconds.
    }
  }

  return null;
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizeRequestId(value: string | undefined) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return isUuidLike(normalized) ? normalized : randomUUID();
}
