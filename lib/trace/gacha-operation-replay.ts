import type {
  PlayerSupportOperation,
  PlayerSupportPullReplayResponse,
} from "../gateway/player-support.ts";
import {
  createGachaTraceRun,
  locateGachaFailure,
  type GachaTraceNodeId,
  type GachaTraceRun,
  type TraceEvidence,
  type TraceNodeSnapshot,
  type TracePacketEnvelope,
  type TraceRunStatus,
} from "./gacha-run.ts";
import type {
  GachaHistoricalTrace,
  GachaTraceHistoryEntry,
  HistoricalPullResult,
} from "./gacha-history.ts";

export function createGachaOperationTrace(
  replay: PlayerSupportPullReplayResponse,
): GachaHistoricalTrace {
  const { operation } = replay;
  const request = operation.request;
  const response = asRecord(operation.response);
  const event = asRecord(operation.event);
  const count = request.count === 10 ? 10 : 1;
  const bannerId = request.banner_id ?? pullBannerId(response) ?? "unknown-banner";
  const eventId = request.event_id ?? optionalString(response?.event_id) ?? optionalString(event?.event_id);
  const startedAt = timestamp(request.accepted_at ?? operation.created_at, 0);
  const finishedAt = timestamp(operation.updated_at, startedAt);
  const durationMs = Math.max(0, finishedAt - startedAt);
  const results = pullResults(response, replay);
  const outcome = operationOutcome(operation.status);
  const entry: GachaTraceHistoryEntry = {
    operationId: operation.operation_id,
    requestId: operation.request_id,
    startedAt: operation.created_at,
    durationMs,
    responseStatus: null,
    errorCode: operation.error?.code ?? null,
    errorMessage: operation.error?.message ?? null,
    bannerId,
    count,
    outcome,
  };
  const base = createGachaTraceRun({
    runId: `operation:${operation.operation_id}`,
    bannerId,
    count,
    startedAt,
  });
  const requestPacket = {
    operation_id: operation.operation_id,
    request_id: operation.request_id,
    banner_id: request.banner_id,
    banner_version_id: request.banner_version_id,
    pity_group_id: request.pity_group_id,
    count: request.count,
    seed: request.seed,
    event_id: eventId,
    amount_minor: request.amount_minor,
    accepted_at: request.accepted_at,
    reconstruction_source: request.source,
  };
  const nodes = cloneNodes(base.nodes);

  setNode(nodes, "browser", {
    status: "success",
    evidence: "derived",
    summary: "该操作已进入服务端抽卡流程",
    startedAt,
    finishedAt: startedAt,
    durationMs: null,
    request: packet("derived", "request", "browser event", "服务端持久记录无法还原浏览器瞬时事件，入口路径由抽卡操作反推", requestPacket),
    response: packet("durable", "response", "operation replay", "最终状态来自持久化抽卡操作", { operation_id: operation.operation_id, status: operation.status }),
  });
  setNode(nodes, "next", {
    status: "success",
    evidence: "derived",
    summary: "请求已通过 Next.js 服务端动作",
    startedAt,
    finishedAt: startedAt,
    request: packet("derived", "request", "React Server Action", "抽卡操作已到达 Gacha，据此确认入口服务链路已通过", requestPacket),
    response: packet("durable", "response", "operation replay", "不依赖 API 日志，展示抽卡操作的持久化最终状态", { operation_id: operation.operation_id, status: operation.status }),
  });
  setNode(nodes, "gateway", {
    status: "success",
    evidence: "derived",
    summary: "Gateway 已将请求分发到 Gacha Engine",
    startedAt,
    finishedAt: startedAt,
    request: packet("derived", "request", "HTTPS", "Gacha 已持久化本次操作，因此 Gateway 分发路径确定成立", { method: "POST", path: "/api/v1/gacha/me/pulls", ...requestPacket }),
    response: packet("durable", "response", "operation replay", "响应内容取自 Gacha 持久化结果，不是 Gateway API 日志", operation.response ?? { status: operation.status, error: operation.error }),
  });

  const historicalFailure = operation.status === "failed" || operation.status === "refund_pending"
    ? locateGachaFailure(operation.error?.code)
    : null;
  setNode(nodes, "gacha", {
    status: operation.status === "processing" ? "running" : historicalFailure?.nodeId === "gacha" ? "error" : "success",
    evidence: "durable",
    summary: operation.status === "processing"
      ? "抽卡操作仍在处理中"
      : historicalFailure?.nodeId === "gacha"
        ? historicalFailure.summary
        : "抽卡编排状态已持久化",
    startedAt,
    finishedAt: operation.status === "processing" ? null : finishedAt,
    durationMs: operation.status === "processing" ? null : durationMs,
    errorCode: historicalFailure?.nodeId === "gacha" ? operation.error?.code ?? "pull_failed" : null,
    errorMessage: historicalFailure?.nodeId === "gacha" ? operation.error?.message ?? "抽卡操作失败" : null,
    request: packet("durable", "request", "Postgres operation", "请求字段来自不可过期的抽卡操作记录", requestPacket),
    response: packet("durable", "response", "Postgres operation", "Gacha 的响应、事件与错误均来自持久记录", { status: operation.status, response: operation.response, error: operation.error }),
  });

  setNode(nodes, "config", configNode(replay, historicalFailure?.nodeId, finishedAt));
  setNode(nodes, "asset", assetNode(replay, historicalFailure?.nodeId, finishedAt));
  setNode(nodes, "redis", stateNode(replay, finishedAt));
  setNode(nodes, "kafka", kafkaNode(replay, eventId, historicalFailure?.nodeId, finishedAt));
  const backpack = backpackNode(replay, eventId, finishedAt);
  setNode(nodes, "backpack", backpack.service);
  setNode(nodes, "backpack-db", backpack.database);

  const diagnosticFailure = firstErrorNode(nodes);
  const status = runStatus(replay, diagnosticFailure);
  const summary = runSummary(replay, diagnosticFailure);
  const run: GachaTraceRun = {
    ...base,
    operationId: operation.operation_id,
    requestId: operation.request_id,
    eventId,
    status,
    summary,
    finishedAt: status === "running" || status === "waiting" ? null : finishedAt,
    failedNodeId: diagnosticFailure,
    nodes,
  };

  return {
    entry,
    run,
    results,
    requestBody: requestPacket,
    responseBody: {
      operation_status: operation.status,
      response: operation.response,
      event: operation.event,
      asset_spend: replay.asset_spend,
      backpack_delivery: replay.backpack_delivery,
    },
  };
}

export function toGachaOperationHistoryEntry(
  operation: PlayerSupportOperation,
): GachaTraceHistoryEntry {
  const startedAt = timestamp(operation.created_at, 0);
  const finishedAt = timestamp(operation.updated_at, startedAt);
  return {
    operationId: operation.operation_id,
    requestId: operation.request_id,
    startedAt: operation.created_at,
    durationMs: Math.max(0, finishedAt - startedAt),
    responseStatus: null,
    errorCode: operation.error?.code ?? null,
    errorMessage: operation.error?.message ?? null,
    bannerId: operation.banner_id,
    count: operation.count === 1 || operation.count === 10 ? operation.count : null,
    outcome: operationOutcome(operation.status),
  };
}

function configNode(
  replay: PlayerSupportPullReplayResponse,
  failedNodeId: GachaTraceNodeId | undefined,
  at: number,
): Partial<TraceNodeSnapshot> {
  const request = replay.operation.request;
  const failed = failedNodeId === "config";
  return {
    status: failed ? "error" : request.banner_id ? "success" : "skipped",
    evidence: request.source === "operation_only" ? "derived" : "durable",
    summary: failed ? "生效配置读取失败" : request.banner_id ? "当次卡池版本已绑定" : "没有可还原的卡池版本",
    finishedAt: at,
    errorCode: failed ? replay.operation.error?.code ?? "configuration_unavailable" : null,
    errorMessage: failed ? replay.operation.error?.message ?? "卡池配置不可用" : null,
    request: packet("durable", "request", "release snapshot", "从抽卡操作还原当次绑定的卡池版本", {
      banner_id: request.banner_id,
      banner_version_id: request.banner_version_id,
      pity_group_id: request.pity_group_id,
    }),
    response: packet(request.banner_id ? "durable" : "pending", "response", "release snapshot", "抽卡结果保留了当次配置标识与审计摘要", {
      banner_version_id: request.banner_version_id,
      audit: asRecord(replay.operation.response)?.audit ?? null,
    }),
  };
}

function assetNode(
  replay: PlayerSupportPullReplayResponse,
  failedNodeId: GachaTraceNodeId | undefined,
  at: number,
): Partial<TraceNodeSnapshot> {
  const section = replay.asset_spend;
  const eventId = replay.operation.request.event_id;
  const expected = { idempotency_key: eventId ? `spend:gacha-pull:${eventId}` : null, amount_minor: replay.operation.request.amount_minor };
  const failed = failedNodeId === "asset";
  if (failed) {
    return {
      status: "error",
      evidence: "durable",
      summary: "资产步骤失败，未完成扣款",
      finishedAt: at,
      errorCode: replay.operation.error?.code ?? "asset_failed",
      errorMessage: replay.operation.error?.message ?? "资产扣款失败",
      request: packet("durable", "request", "asset ledger", "按本次事件的唯一幂等键核对扣款", expected),
      response: packet("durable", "response", "Gacha operation", "失败原因来自持久化抽卡操作", {
        operation_status: replay.operation.status,
        error: replay.operation.error,
        ledger_status: section.status,
      }),
    };
  }
  if (section.status === "ok") {
    return {
      status: "success", evidence: "durable", summary: "已找到本次抽卡的唯一扣款流水", finishedAt: at,
      request: packet("durable", "request", "asset ledger", "按玩家和精确幂等键核对扣款", expected),
      response: packet("durable", "response", "asset ledger", "资产流水是本次扣款的持久证据", section.data),
    };
  }
  if (section.status === "unavailable") {
    return evidenceUnavailableNode("Asset 证据查询不可用", "asset_replay_unavailable", expected, section.error);
  }
  const successful = ["event_pending", "event_published", "succeeded"].includes(replay.operation.status);
  return {
    status: successful ? "error" : replay.operation.status === "processing" ? "waiting" : "skipped",
    evidence: "durable",
    summary: successful ? "抽卡已生成结果，但未找到对应扣款" : "本次操作未进入扣款确认",
    finishedAt: successful ? at : null,
    errorCode: successful ? "asset_spend_not_found" : null,
    errorMessage: successful ? "成功抽卡缺少唯一扣款流水，需人工核查" : null,
    request: packet("durable", "request", "asset ledger", "按本次事件的唯一幂等键查询", expected),
    response: packet("durable", "response", "asset ledger", "精确查询没有找到流水", { status: section.status }),
  };
}

function stateNode(replay: PlayerSupportPullReplayResponse, at: number): Partial<TraceNodeSnapshot> {
  return {
    status: "success",
    evidence: "durable",
    summary: replay.operation.status === "processing" ? "操作与恢复上下文已持久化" : "幂等、保底与操作状态已持久化",
    finishedAt: at,
    request: packet("durable", "request", "Postgres transaction", "operation_id 是本次抽卡的长期稳定主键", {
      operation_id: replay.operation.operation_id,
      pity_group_id: replay.operation.request.pity_group_id,
    }),
    response: packet("durable", "response", "Postgres transaction", "操作状态不会依赖 Redis 或 API 日志保留期", {
      status: replay.operation.status,
      response: replay.operation.response,
      error: replay.operation.error,
      updated_at: replay.operation.updated_at,
    }),
  };
}

function kafkaNode(
  replay: PlayerSupportPullReplayResponse,
  eventId: string | null,
  failedNodeId: GachaTraceNodeId | undefined,
  at: number,
): Partial<TraceNodeSnapshot> {
  const status = replay.operation.status;
  const failed = failedNodeId === "kafka";
  const published = status === "event_published" || status === "succeeded";
  const pending = status === "event_pending";
  return {
    status: failed ? "error" : published ? "success" : pending || status === "processing" ? "waiting" : "skipped",
    evidence: published || pending ? "durable" : "derived",
    summary: failed ? "Kafka 发布失败" : published ? "事件发布状态已持久化" : pending ? "结果已生成，等待发布 Kafka" : status === "processing" ? "等待 Gacha 生成事件" : "本次操作未进入事件发布",
    finishedAt: failed || published ? at : null,
    errorCode: failed ? replay.operation.error?.code ?? "kafka_publish_failed" : null,
    errorMessage: failed ? replay.operation.error?.message ?? "Kafka 事件发布失败" : null,
    request: packet(eventId ? "durable" : "pending", "request", "Kafka", "使用持久化 event_id 定位消息", {
      topic: "gacha.pull_completed.v1",
      event_id: eventId,
      payload: replay.operation.event,
    }),
    response: packet(published || pending ? "durable" : "pending", "response", "Gacha operation", "发布阶段取自 Gacha 的耐久状态机", { operation_status: status }),
  };
}

function backpackNode(
  replay: PlayerSupportPullReplayResponse,
  eventId: string | null,
  at: number,
): { service: Partial<TraceNodeSnapshot>; database: Partial<TraceNodeSnapshot> } {
  const section = replay.backpack_delivery;
  const request = packet(eventId ? "durable" : "pending", "request", "Kafka consumer", "按玩家和 event_id 精确核对消费与落库", { event_id: eventId, topic: "gacha.pull_completed.v1" });
  if (section.status === "ok") {
    return {
      service: {
        status: "success", evidence: "durable", summary: "Backpack 已消费本次事件", finishedAt: at,
        request,
        response: packet("durable", "response", "Backpack readback", "事件消费记录来自 Backpack 数据库", section.data?.event ?? null),
      },
      database: {
        status: "success", evidence: "durable", summary: "奖励明细与背包事务已落库", finishedAt: at,
        request: packet("durable", "request", "database transaction", "使用同一 event_id 核对全部奖励记录", { event_id: eventId }),
        response: packet("durable", "response", "database readback", "返回该事件的完整奖励记录", { records: section.data?.records ?? [] }),
      },
    };
  }
  if (section.status === "unavailable") {
    return {
      service: evidenceUnavailableNode("Backpack 证据查询不可用", "backpack_replay_unavailable", { event_id: eventId }, section.error),
      database: {
        status: "skipped", evidence: "pending", summary: "无法确认背包事务", request,
        response: packet("pending", "response", "database readback", "Backpack 查询不可用，无法判断是否已落库", section.error ?? null),
      },
    };
  }
  if (section.status === "not_applicable") {
    return {
      service: { status: "skipped", evidence: "durable", summary: "尚未生成可投递事件", request, response: packet("durable", "response", "operation state", "该状态下不应存在 Backpack 事件", { status: section.status }) },
      database: { status: "skipped", evidence: "durable", summary: "没有奖励事务需要落库", request, response: packet("durable", "response", "operation state", "未进入奖励落库阶段", { status: section.status }) },
    };
  }
  const inconsistent = replay.operation.status === "succeeded";
  const waiting = replay.operation.status === "event_pending" || replay.operation.status === "event_published";
  const status = inconsistent ? "error" : waiting ? "waiting" : "skipped";
  const summary = inconsistent ? "Gacha 标记完成，但 Backpack 缺少本次事件" : waiting ? "Kafka 链路尚未在 Backpack 留下记录" : "本次操作未完成奖励投递";
  const response = packet("durable", "response", "Backpack readback", "按 event_id 精确查询的结果", { status: "not_found", event_id: eventId });
  return {
    service: {
      status, evidence: "durable", summary, finishedAt: inconsistent ? at : null,
      errorCode: inconsistent ? "backpack_event_not_found" : null,
      errorMessage: inconsistent ? "抽卡状态为成功，但背包没有对应事件" : null,
      request, response,
    },
    database: {
      status, evidence: "durable", summary: inconsistent ? "奖励事件和明细均未找到" : "等待奖励事务落库", finishedAt: inconsistent ? at : null,
      errorCode: inconsistent ? "backpack_records_not_found" : null,
      errorMessage: inconsistent ? "没有找到本次抽卡的奖励明细" : null,
      request, response,
    },
  };
}

function evidenceUnavailableNode(
  summary: string,
  code: string,
  requestPayload: unknown,
  error: { code: string; message: string } | undefined,
): Partial<TraceNodeSnapshot> {
  return {
    status: "waiting", evidence: "pending", summary,
    errorCode: error?.code ?? code,
    errorMessage: error?.message ?? summary,
    request: packet("derived", "request", "evidence lookup", "查询本次操作的精确持久证据", requestPayload),
    response: packet("pending", "response", "evidence lookup", "证据源暂时不可访问，这不等于原业务操作失败", error ?? { code }),
  };
}

function runStatus(replay: PlayerSupportPullReplayResponse, failure: GachaTraceNodeId | null): TraceRunStatus {
  if (replay.operation.status === "processing") return "running";
  if (replay.operation.status === "event_pending" || replay.operation.status === "event_published") return "waiting";
  if (replay.operation.status === "failed" || replay.operation.status === "refund_pending" || failure) return "error";
  return replay.partial ? "waiting" : "success";
}

function runSummary(replay: PlayerSupportPullReplayResponse, failure: GachaTraceNodeId | null) {
  if (replay.operation.status === "processing") return "抽卡操作仍在服务端处理中";
  if (replay.operation.status === "event_pending") return "抽卡结果已持久化，等待发布 Kafka";
  if (replay.operation.status === "event_published") return "Kafka 已接收事件，等待 Backpack 确认";
  if (replay.operation.status === "refund_pending") return "抽卡失败，退款恢复任务仍在处理";
  if (replay.operation.status === "failed") return replay.operation.error?.message ?? "抽卡操作失败";
  if (failure) return `抽卡记录存在链路不一致：${failure}`;
  if (replay.partial) return "抽卡已完成，但部分重放证据暂不可用";
  return "抽卡、扣款与奖励到账均有持久证据";
}

function firstErrorNode(nodes: GachaTraceRun["nodes"]): GachaTraceNodeId | null {
  const order: GachaTraceNodeId[] = ["browser", "next", "gateway", "gacha", "config", "asset", "redis", "kafka", "backpack", "backpack-db"];
  return order.find((id) => nodes[id].status === "error") ?? null;
}

function pullResults(
  response: Record<string, unknown> | null,
  replay: PlayerSupportPullReplayResponse,
): HistoricalPullResult[] {
  const responseRecords = Array.isArray(response?.records) ? response.records : [];
  const records = responseRecords.length ? responseRecords : replay.backpack_delivery.data?.records ?? [];
  return records.flatMap((value, index) => {
    const record = asRecord(value);
    const rarity = pullRarity(record?.rarity);
    if (!record || !rarity) return [];
    const itemId = optionalString(record.item_id) ?? `operation-item-${index}`;
    return [{
      id: optionalString(record.id) ?? `${itemId}:${index}`,
      itemId,
      itemName: optionalString(record.item_name) ?? itemId,
      rarity,
      isFeatured: record.is_featured === true,
    }];
  });
}

function cloneNodes(nodes: GachaTraceRun["nodes"]) {
  return Object.fromEntries(Object.entries(nodes).map(([id, node]) => [id, { ...node }])) as GachaTraceRun["nodes"];
}

function setNode(
  nodes: GachaTraceRun["nodes"],
  id: GachaTraceNodeId,
  patch: Partial<TraceNodeSnapshot>,
) {
  nodes[id] = { ...nodes[id], ...patch };
}

function packet(
  evidence: TraceEvidence,
  direction: TracePacketEnvelope["direction"],
  protocol: string,
  note: string,
  payload: unknown,
): TracePacketEnvelope {
  const labels: Record<TraceEvidence, TracePacketEnvelope["evidenceLabel"]> = {
    observed: "实测",
    durable: "持久记录",
    derived: "路径判定",
    pending: "待确认",
  };
  return { evidence, evidenceLabel: labels[evidence], direction, protocol, note, payload };
}

function operationOutcome(status: PlayerSupportPullReplayResponse["operation"]["status"]) {
  if (status === "succeeded") return "success" as const;
  if (status === "failed" || status === "refund_pending") return "error" as const;
  return "pending" as const;
}

function pullBannerId(response: Record<string, unknown> | null) {
  const records = Array.isArray(response?.records) ? response.records : [];
  return optionalString(asRecord(records[0])?.banner_id);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function pullRarity(value: unknown): 3 | 4 | 5 | null {
  return value === 3 || value === 4 || value === 5 ? value : null;
}

function timestamp(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
