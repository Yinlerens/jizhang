export type GachaTraceNodeId =
  | "browser"
  | "next"
  | "gateway"
  | "gacha"
  | "config"
  | "asset"
  | "redis"
  | "kafka"
  | "backpack"
  | "backpack-db";

export type TraceTraffic = "north-south" | "east-west" | "async";
export type TraceNodeStatus =
  | "idle"
  | "waiting"
  | "running"
  | "success"
  | "error"
  | "skipped";
export type TraceEvidence = "observed" | "derived" | "pending";
export type TraceRunStatus = "idle" | "running" | "waiting" | "success" | "error";

export type TracePacketEnvelope = {
  evidence: TraceEvidence;
  evidenceLabel: "实测" | "路径判定" | "待确认";
  direction: "request" | "response";
  protocol: string;
  note: string;
  payload: unknown;
};

export type GachaTracePullRecordSnapshot = {
  id: string;
  itemId: string;
  itemName: string;
  itemType?: string;
  rarity: 3 | 4 | 5;
  isFeatured?: boolean;
};

export type GachaTracePullResultSnapshot = {
  stateVersion: number;
  nextPity: unknown;
  records: GachaTracePullRecordSnapshot[];
};

export type GachaTraceBackpackSnapshot = {
  event: {
    eventId: string;
    eventType: string;
    bannerId: string;
    stateVersion: number;
    receivedAt: string;
  };
  eventRecords: GachaTracePullRecordSnapshot[];
  historyCount: number;
  inventory: {
    distinctItemCount: number;
    totalQuantity: number;
  };
};

export type GachaTraceNodeDefinition = {
  id: GachaTraceNodeId;
  label: string;
  role: string;
  traffic: TraceTraffic;
  kind: "client" | "service" | "database" | "queue";
};

export type GachaTraceEdge = {
  id: string;
  source: GachaTraceNodeId;
  target: GachaTraceNodeId;
  label: string;
  traffic: TraceTraffic;
};

export type TraceNodeSnapshot = {
  id: GachaTraceNodeId;
  status: TraceNodeStatus;
  evidence: TraceEvidence;
  summary: string;
  startedAt: number | null;
  finishedAt: number | null;
  durationMs: number | null;
  httpStatus: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  request: unknown | null;
  response: unknown | null;
};

export type GachaTraceAuditSnapshot = {
  requestId: string;
  startedAt: string;
  finishedAt: string | null;
  durationMs: number | null;
  upstreamUrl: string | null;
  responseStatus: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  requestBody: unknown | null;
  responseBody: unknown | null;
};

export type GachaTraceRun = {
  runId: string;
  requestId: string | null;
  eventId: string | null;
  bannerId: string;
  count: 1 | 10;
  status: TraceRunStatus;
  summary: string;
  startedAt: number;
  finishedAt: number | null;
  failedNodeId: GachaTraceNodeId | null;
  nodes: Record<GachaTraceNodeId, TraceNodeSnapshot>;
};

export type GachaTraceSignal =
  | {
      type: "request_started";
      at: number;
      requestId?: string;
      idempotencyKey?: string;
    }
  | {
      type: "pull_succeeded";
      at: number;
      requestId: string;
      eventId: string;
      result?: GachaTracePullResultSnapshot;
    }
  | {
      type: "pull_failed";
      at: number;
      requestId?: string;
      code?: string;
      message: string;
    }
  | { type: "audit_loaded"; audit: GachaTraceAuditSnapshot }
  | { type: "backpack_succeeded"; at: number; result?: GachaTraceBackpackSnapshot }
  | {
      type: "backpack_pending";
      at: number;
      attempts: number;
      retryAfterMs: number;
      message: string;
    }
  | {
      type: "backpack_failed";
      at: number;
      message: string;
      code?: string;
      httpStatus?: number;
    };

export const GACHA_TRACE_NODE_ORDER: GachaTraceNodeId[] = [
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
];

export const GACHA_TRACE_NODE_DEFINITIONS: Record<
  GachaTraceNodeId,
  GachaTraceNodeDefinition
> = {
  browser: {
    id: "browser",
    label: "Sandbox",
    role: "浏览器交互",
    traffic: "north-south",
    kind: "client",
  },
  next: {
    id: "next",
    label: "Next.js",
    role: "身份与服务端动作",
    traffic: "north-south",
    kind: "service",
  },
  gateway: {
    id: "gateway",
    label: "Gateway",
    role: "鉴权与请求分发",
    traffic: "north-south",
    kind: "service",
  },
  gacha: {
    id: "gacha",
    label: "Gacha Engine",
    role: "抽卡事务编排",
    traffic: "east-west",
    kind: "service",
  },
  config: {
    id: "config",
    label: "Release Config",
    role: "生效卡池快照",
    traffic: "east-west",
    kind: "database",
  },
  asset: {
    id: "asset",
    label: "Asset Service",
    role: "资源扣减与退款",
    traffic: "east-west",
    kind: "service",
  },
  redis: {
    id: "redis",
    label: "Gacha State DB",
    role: "持久化幂等、保底与 Outbox",
    traffic: "east-west",
    kind: "database",
  },
  kafka: {
    id: "kafka",
    label: "Kafka",
    role: "发布抽卡完成事件",
    traffic: "async",
    kind: "queue",
  },
  backpack: {
    id: "backpack",
    label: "Backpack",
    role: "异步消费抽卡事件",
    traffic: "async",
    kind: "service",
  },
  "backpack-db": {
    id: "backpack-db",
    label: "Backpack DB",
    role: "背包与抽卡记录",
    traffic: "async",
    kind: "database",
  },
};

export const GACHA_TRACE_EDGES: GachaTraceEdge[] = [
  {
    id: "browser-next",
    source: "browser",
    target: "next",
    label: "Server Action",
    traffic: "north-south",
  },
  {
    id: "next-gateway",
    source: "next",
    target: "gateway",
    label: "POST /api/v1/gacha/me/pulls",
    traffic: "north-south",
  },
  {
    id: "gateway-gacha",
    source: "gateway",
    target: "gacha",
    label: "HTTP proxy",
    traffic: "east-west",
  },
  {
    id: "gacha-config",
    source: "gacha",
    target: "config",
    label: "active release",
    traffic: "east-west",
  },
  {
    id: "gacha-asset",
    source: "gacha",
    target: "asset",
    label: "spend / refund",
    traffic: "east-west",
  },
  {
    id: "gacha-redis",
    source: "gacha",
    target: "redis",
    label: "state transaction",
    traffic: "east-west",
  },
  {
    id: "gacha-kafka",
    source: "gacha",
    target: "kafka",
    label: "gacha.pull_completed.v1",
    traffic: "async",
  },
  {
    id: "kafka-backpack",
    source: "kafka",
    target: "backpack",
    label: "consume event",
    traffic: "async",
  },
  {
    id: "backpack-db",
    source: "backpack",
    target: "backpack-db",
    label: "transaction",
    traffic: "async",
  },
];

const SYNC_SUCCESS_NODES: GachaTraceNodeId[] = [
  "browser",
  "next",
  "gateway",
  "gacha",
  "config",
  "asset",
  "redis",
  "kafka",
];

export function createGachaTraceRun({
  runId,
  bannerId,
  count,
  startedAt,
}: {
  runId: string;
  bannerId: string;
  count: 1 | 10;
  startedAt: number;
}): GachaTraceRun {
  return {
    runId,
    requestId: null,
    eventId: null,
    bannerId,
    count,
    status: "idle",
    summary: "等待发起抽卡请求",
    startedAt,
    finishedAt: null,
    failedNodeId: null,
    nodes: Object.fromEntries(
      GACHA_TRACE_NODE_ORDER.map((id) => [id, createNodeSnapshot(id)]),
    ) as Record<GachaTraceNodeId, TraceNodeSnapshot>,
  };
}

export function reduceGachaTrace(
  run: GachaTraceRun,
  signal: GachaTraceSignal,
): GachaTraceRun {
  switch (signal.type) {
    case "request_started":
      return requestStarted(run, signal);
    case "pull_succeeded":
      return pullSucceeded(run, signal);
    case "pull_failed":
      return pullFailed(run, signal);
    case "audit_loaded":
      return auditLoaded(run, signal.audit);
    case "backpack_succeeded":
      return backpackSucceeded(run, signal.at, signal.result);
    case "backpack_pending":
      return backpackPending(run, signal);
    case "backpack_failed":
      return backpackFailed(run, signal);
  }
}

export function locateGachaFailure(code?: string): {
  nodeId: GachaTraceNodeId;
  summary: string;
} {
  const normalized = (code ?? "").trim().toLowerCase();

  if (
    normalized === "next_auth_missing" ||
    normalized === "invalid_banner_id" ||
    normalized === "invalid_pull_count" ||
    normalized === "invalid_idempotency_key"
  ) {
    return { nodeId: "next", summary: "服务端动作在请求校验阶段终止" };
  }

  if (normalized === "gateway_connection_failed") {
    return { nodeId: "gateway", summary: "无法连接 Gateway" };
  }

  if (
    normalized.includes("upstream") ||
    normalized === "bad_gateway" ||
    normalized === "service_unavailable"
  ) {
    return { nodeId: "gacha", summary: "Gateway 无法连接 Gacha Engine" };
  }

  if (normalized.includes("config") || normalized.includes("banner_catalog")) {
    return { nodeId: "config", summary: "卡池发布配置不可用" };
  }

  if (
    normalized.includes("asset") ||
    normalized.includes("balance") ||
    normalized.includes("insufficient")
  ) {
    return { nodeId: "asset", summary: "资源扣减没有完成" };
  }

  if (
    normalized.includes("state_store") ||
    normalized.includes("postgres") ||
    normalized.includes("redis") ||
    normalized.includes("pity") ||
    normalized.includes("idempotency") ||
    normalized === "pull_in_progress"
  ) {
    return { nodeId: "redis", summary: "持久化幂等或保底状态处理失败" };
  }

  if (normalized.includes("kafka") || normalized.includes("event_publish")) {
    return { nodeId: "kafka", summary: "Kafka 事件没有发布成功" };
  }

  if (normalized.includes("backpack")) {
    return { nodeId: "backpack", summary: "背包消费或同步失败" };
  }

  return { nodeId: "gacha", summary: "抽卡引擎返回失败" };
}

function requestStarted(
  run: GachaTraceRun,
  signal: Extract<GachaTraceSignal, { type: "request_started" }>,
): GachaTraceRun {
  const { at } = signal;
  const requestId = signal.requestId ?? run.requestId;
  let nodes = updateNode(run.nodes, "browser", {
    status: "success",
    evidence: "observed",
    summary: "已提交抽卡操作",
    startedAt: at,
    finishedAt: at,
    durationMs: 0,
    request: tracePacket("observed", "request", "browser event", "用户在 Sandbox 发起的真实操作", {
      action: "gacha_pull",
      banner_id: run.bannerId,
      count: run.count,
      request_id: requestId,
      idempotency_key: signal.idempotencyKey ?? null,
    }),
    response: pendingPacket("response", "等待服务端动作返回"),
  });
  nodes = updateNode(nodes, "next", {
    status: "running",
    evidence: "observed",
    summary: "正在执行服务端动作",
    startedAt: at,
    request: tracePacket("observed", "request", "React Server Action", "浏览器提交到 Next.js 的真实参数", {
      action: "drawGachaPull",
      banner_id: run.bannerId,
      count: run.count,
      request_id: requestId,
      idempotency_key: signal.idempotencyKey ?? null,
    }),
    response: pendingPacket("response", "服务端动作正在执行"),
  });

  for (const id of GACHA_TRACE_NODE_ORDER.slice(2, 8)) {
    nodes = updateNode(nodes, id, {
      status: "waiting",
      evidence: "pending",
      summary: "等待上游信号",
    });
  }

  nodes = seedDownstreamPackets(nodes, run, {
    requestId,
    idempotencyKey: signal.idempotencyKey ?? null,
  });

  return {
    ...run,
    requestId,
    status: "running",
    summary: "抽卡请求正在执行",
    nodes,
  };
}

function pullSucceeded(
  run: GachaTraceRun,
  signal: Extract<GachaTraceSignal, { type: "pull_succeeded" }>,
): GachaTraceRun {
  let nodes = run.nodes;
  const resultPayload = {
    request_id: signal.requestId,
    event_id: signal.eventId,
    banner_id: run.bannerId,
    count: run.count,
    state_version: signal.result?.stateVersion ?? null,
    result_count: signal.result?.records.length ?? run.count,
    records: signal.result?.records ?? null,
    next_pity: signal.result?.nextPity ?? null,
  };

  for (const id of SYNC_SUCCESS_NODES) {
    const observed = id === "browser" || id === "next" || id === "gateway" || id === "gacha";
    nodes = updateNode(nodes, id, {
      status: "success",
      evidence: observed ? "observed" : "derived",
      summary: successSummary(id),
      finishedAt: observed ? signal.at : null,
      durationMs: id === "next" ? Math.max(0, signal.at - run.startedAt) : null,
      response: successfulResponsePacket(id, resultPayload, signal.result),
    });
  }

  nodes = updateNode(nodes, "backpack", {
    status: "waiting",
    evidence: "pending",
    summary: "等待消费 Kafka 事件",
    startedAt: signal.at,
    request: tracePacket("observed", "request", "HTTPS", "按真实 event_id 查询 Backpack 消费结果", {
      method: "GET",
      path: `/api/v1/backpack/me/pull-events/${signal.eventId}`,
      event_id: signal.eventId,
    }),
    response: pendingPacket("response", "等待 Backpack 消费 Kafka 事件"),
  });
  nodes = updateNode(nodes, "backpack-db", {
    status: "waiting",
    evidence: "pending",
    summary: "等待背包事务提交",
    request: tracePacket("derived", "request", "database transaction", "由 Backpack 消费流程判定的预期事务", {
      operation: "persist_pull_event_and_inventory",
      event_id: signal.eventId,
    }),
    response: pendingPacket("response", "尚未观察到事件、记录和库存落库"),
  });

  return {
    ...run,
    requestId: signal.requestId,
    eventId: signal.eventId,
    status: "waiting",
    summary: "抽卡完成，等待背包消费事件",
    nodes,
  };
}

function pullFailed(
  run: GachaTraceRun,
  signal: Extract<GachaTraceSignal, { type: "pull_failed" }>,
): GachaTraceRun {
  const failure = locateGachaFailure(signal.code);
  const successful = successfulNodesBefore(failure.nodeId);
  let nodes = run.nodes;

  for (const id of GACHA_TRACE_NODE_ORDER) {
    if (successful.has(id)) {
      nodes = updateNode(nodes, id, {
        status: "success",
        evidence: id === "browser" || id === "next" || id === "gateway" ? "observed" : "derived",
        summary: successSummary(id),
        finishedAt: id === "next" ? signal.at : null,
        durationMs: id === "next" ? Math.max(0, signal.at - run.startedAt) : null,
        response: tracePacket(
          id === "browser" || id === "next" || id === "gateway" ? "observed" : "derived",
          "response",
          nodeProtocol(id),
          "根据失败位置确认该上游步骤已经完成",
          { status: "completed_before_failure", request_id: signal.requestId ?? run.requestId },
        ),
      });
      continue;
    }

    if (id === failure.nodeId) {
      nodes = updateNode(nodes, id, {
        status: "error",
        evidence: "observed",
        summary: failure.summary,
        finishedAt: signal.at,
        errorCode: signal.code ?? "unknown_error",
        errorMessage: signal.message,
        response: tracePacket("observed", "response", nodeProtocol(id), "调用在此节点返回错误", {
          status: "error",
          code: signal.code ?? "unknown_error",
          message: signal.message,
          request_id: signal.requestId ?? run.requestId,
        }),
      });
      continue;
    }

    nodes = updateNode(nodes, id, {
      status: "skipped",
      evidence: "derived",
      summary: "上游失败，未执行",
      response: tracePacket("derived", "response", nodeProtocol(id), "上游已经失败，本节点没有执行", {
        status: "not_executed",
        blocked_by: failure.nodeId,
      }),
    });
  }

  return {
    ...run,
    requestId: signal.requestId ?? run.requestId,
    status: "error",
    summary: failure.summary,
    failedNodeId: failure.nodeId,
    finishedAt: signal.at,
    nodes,
  };
}

function auditLoaded(
  run: GachaTraceRun,
  audit: GachaTraceAuditSnapshot,
): GachaTraceRun {
  const startedAt = Date.parse(audit.startedAt);
  const finishedAt = audit.finishedAt ? Date.parse(audit.finishedAt) : Number.NaN;
  const hasError = typeof audit.responseStatus === "number" && audit.responseStatus >= 400;
  const attributedRun =
    hasError && audit.errorCode
      ? pullFailed(run, {
          type: "pull_failed",
          at: Number.isFinite(finishedAt) ? finishedAt : run.finishedAt ?? run.startedAt,
          requestId: audit.requestId,
          code: audit.errorCode,
          message: audit.errorMessage ?? "上游调用返回错误",
        })
      : run;
  const gatewayIsFailurePoint = attributedRun.failedNodeId === "gateway";
  let nodes = updateNode(attributedRun.nodes, "gateway", {
    evidence: "observed",
    status: hasError && gatewayIsFailurePoint ? "error" : attributedRun.nodes.gateway.status,
    summary:
      hasError && gatewayIsFailurePoint
        ? audit.errorMessage ?? "网关返回服务错误"
        : attributedRun.nodes.gateway.summary,
    startedAt: Number.isFinite(startedAt) ? startedAt : attributedRun.nodes.gateway.startedAt,
    finishedAt: Number.isFinite(finishedAt)
      ? finishedAt
      : attributedRun.nodes.gateway.finishedAt,
    durationMs: audit.durationMs,
    httpStatus: audit.responseStatus,
    errorCode: gatewayIsFailurePoint ? audit.errorCode : null,
    errorMessage: gatewayIsFailurePoint ? audit.errorMessage : null,
    request: tracePacket("observed", "request", "HTTPS", "Gateway 审计日志记录的真实请求体，认证头已移除", {
      method: "POST",
      path: "/api/v1/gacha/me/pulls",
      request_id: audit.requestId,
      body: audit.requestBody,
    }),
    response: tracePacket("observed", "response", "HTTPS", "Gateway 审计日志记录的真实响应体，内部响应头已移除", {
      status: audit.responseStatus,
      error_code: audit.errorCode,
      error_message: audit.errorMessage,
      body: audit.responseBody,
    }),
  });

  if (audit.upstreamUrl) {
    nodes = updateNode(nodes, "gacha", {
      evidence: "observed",
      httpStatus: audit.responseStatus,
      request: tracePacket("observed", "request", "HTTP", "Gateway 审计日志确认的真实上游地址与请求体", {
        upstream_url: audit.upstreamUrl,
        request_id: audit.requestId,
        body: audit.requestBody,
      }),
      response: tracePacket("observed", "response", "HTTP", "Gateway 从 Gacha Engine 收到的真实上游结果", {
        status: audit.responseStatus,
        error_code: audit.errorCode,
        body: audit.responseBody,
      }),
    });
  }

  return {
    ...attributedRun,
    requestId: audit.requestId || attributedRun.requestId,
    nodes,
  };
}

function backpackSucceeded(
  run: GachaTraceRun,
  at: number,
  result?: GachaTraceBackpackSnapshot,
): GachaTraceRun {
  let nodes = updateNode(run.nodes, "backpack", {
    status: "success",
    evidence: "observed",
    summary: "Kafka 事件已消费",
    finishedAt: at,
    durationMs:
      run.nodes.backpack.startedAt === null
        ? null
        : Math.max(0, at - run.nodes.backpack.startedAt),
    httpStatus: 200,
    errorCode: null,
    errorMessage: null,
    response: tracePacket("observed", "response", "HTTPS", "Backpack API 返回的真实事件与本次记录", {
      status: 200,
      event: result?.event ?? { event_id: run.eventId },
      event_records: result?.eventRecords ?? null,
    }),
  });
  nodes = updateNode(nodes, "backpack-db", {
    status: "success",
    evidence: "observed",
    summary: "背包与抽卡记录已提交",
    finishedAt: at,
    httpStatus: 200,
    errorCode: null,
    errorMessage: null,
    response: tracePacket("observed", "response", "HTTPS readback", "通过 Backpack 查询结果确认数据库已经落库", {
      event_id: run.eventId,
      history_count: result?.historyCount ?? null,
      inventory: result?.inventory ?? null,
    }),
  });

  return {
    ...run,
    status: "success",
    summary: "完整抽卡链路执行成功",
    finishedAt: at,
    nodes,
  };
}

function backpackPending(
  run: GachaTraceRun,
  signal: Extract<GachaTraceSignal, { type: "backpack_pending" }>,
): GachaTraceRun {
  let nodes = updateNode(run.nodes, "backpack", {
    status: "waiting",
    evidence: "observed",
    summary: "Kafka 事件尚未被 Backpack 消费",
    finishedAt: null,
    durationMs:
      run.nodes.backpack.startedAt === null
        ? null
        : Math.max(0, signal.at - run.nodes.backpack.startedAt),
    httpStatus: 404,
    errorCode: "pull_event_pending",
    errorMessage: signal.message,
    response: tracePacket("observed", "response", "HTTPS", "Backpack 查询真实返回 404，表示事件尚未落库", {
      status: 404,
      code: "pull_event_pending",
      event_id: run.eventId,
      attempts: signal.attempts,
      retry_after_ms: signal.retryAfterMs,
    }),
  });
  nodes = updateNode(nodes, "backpack-db", {
    status: "waiting",
    evidence: "pending",
    summary: "尚未观察到背包事务提交",
    response: tracePacket("pending", "response", "database readback", "Backpack 未返回事件，因此无法确认数据库写入", {
      status: "not_observed",
      event_id: run.eventId,
      blocked_by: "backpack_consumer",
    }),
  });

  return {
    ...run,
    status: "waiting",
    summary: "Kafka 已发布，Backpack 尚未消费本次事件",
    failedNodeId: null,
    finishedAt: null,
    nodes,
  };
}

function backpackFailed(
  run: GachaTraceRun,
  signal: Extract<GachaTraceSignal, { type: "backpack_failed" }>,
): GachaTraceRun {
  let nodes = updateNode(run.nodes, "backpack", {
    status: "error",
    evidence: "observed",
    summary: "Backpack 查询或消费链路失败",
    finishedAt: signal.at,
    durationMs:
      run.nodes.backpack.startedAt === null
        ? null
        : Math.max(0, signal.at - run.nodes.backpack.startedAt),
    httpStatus: signal.httpStatus ?? null,
    errorCode: signal.code ?? "backpack_sync_failed",
    errorMessage: signal.message,
    response: tracePacket("observed", "response", "HTTPS", "Backpack 查询返回不可重试错误", {
      status: signal.httpStatus ?? null,
      code: signal.code ?? "backpack_sync_failed",
      message: signal.message,
      event_id: run.eventId,
    }),
  });
  nodes = updateNode(nodes, "backpack-db", {
    status: "skipped",
    evidence: "derived",
    summary: "Backpack 失败，无法确认事务提交",
    response: tracePacket("derived", "response", "database readback", "上游 Backpack 查询失败，本节点无法确认", {
      status: "not_confirmed",
      blocked_by: "backpack",
    }),
  });

  return {
    ...run,
    status: "error",
    summary: "抽卡已完成，但 Backpack 链路返回故障",
    failedNodeId: "backpack",
    finishedAt: signal.at,
    nodes,
  };
}

function createNodeSnapshot(id: GachaTraceNodeId): TraceNodeSnapshot {
  return {
    id,
    status: "idle",
    evidence: "pending",
    summary: "尚未执行",
    startedAt: null,
    finishedAt: null,
    durationMs: null,
    httpStatus: null,
    errorCode: null,
    errorMessage: null,
    request: null,
    response: null,
  };
}

function updateNode(
  nodes: GachaTraceRun["nodes"],
  id: GachaTraceNodeId,
  patch: Partial<TraceNodeSnapshot>,
): GachaTraceRun["nodes"] {
  return {
    ...nodes,
    [id]: {
      ...nodes[id],
      ...patch,
    },
  };
}

function seedDownstreamPackets(
  initialNodes: GachaTraceRun["nodes"],
  run: GachaTraceRun,
  context: { requestId: string | null; idempotencyKey: string | null },
) {
  const common = {
    banner_id: run.bannerId,
    count: run.count,
    request_id: context.requestId,
    idempotency_key: context.idempotencyKey,
  };
  const requests: Partial<Record<GachaTraceNodeId, TracePacketEnvelope>> = {
    gateway: tracePacket("observed", "request", "HTTPS", "Next.js 即将发送到 Gateway 的真实请求", {
      method: "POST",
      path: "/api/v1/gacha/me/pulls",
      ...common,
    }),
    gacha: tracePacket("derived", "request", "HTTP proxy", "根据 Gateway 路由配置判定的上游请求", {
      operation: "execute_gacha_pull",
      ...common,
    }),
    config: tracePacket("derived", "request", "database read", "根据 Gacha Engine 事务路径判定的配置读取", {
      operation: "load_active_release_snapshot",
      banner_id: run.bannerId,
    }),
    asset: tracePacket("derived", "request", "service call", "根据 Gacha Engine 事务路径判定的资源操作", {
      operation: "spend_or_refund_pull_currency",
      pull_count: run.count,
      request_id: context.requestId,
    }),
    redis: tracePacket("derived", "request", "Postgres transaction", "根据 Gacha Engine 事务路径判定的持久化状态提交", {
      operations: ["idempotency", "pity_state", "event_outbox"],
      banner_id: run.bannerId,
      idempotency_key: context.idempotencyKey,
    }),
    kafka: tracePacket("derived", "request", "Kafka", "根据 Gacha Engine 事务路径判定的事件发布", {
      operation: "publish",
      topic: "gacha.pull_completed.v1",
      event_id: null,
    }),
    backpack: tracePacket("pending", "request", "Kafka consumer", "event_id 生成后才能检查 Backpack 消费结果", {
      operation: "consume_gacha_pull_event",
      topic: "gacha.pull_completed.v1",
      event_id: null,
    }),
    "backpack-db": tracePacket("pending", "request", "database transaction", "Backpack 消费事件后才会执行落库", {
      operation: "persist_pull_event_and_inventory",
      event_id: null,
    }),
  };

  let nodes = initialNodes;
  for (const id of GACHA_TRACE_NODE_ORDER.slice(2)) {
    nodes = updateNode(nodes, id, {
      request: requests[id] ?? pendingPacket("request", "等待本节点请求"),
      response: pendingPacket("response", "等待本节点返回"),
    });
  }
  return nodes;
}

function successfulResponsePacket(
  id: GachaTraceNodeId,
  resultPayload: Record<string, unknown>,
  result?: GachaTracePullResultSnapshot,
) {
  switch (id) {
    case "browser":
      return tracePacket("observed", "response", "React Server Action", "浏览器收到的真实抽卡结果", resultPayload);
    case "next":
      return tracePacket("observed", "response", "React Server Action", "Next.js 返回给浏览器的真实结果", resultPayload);
    case "gateway":
      return tracePacket("observed", "response", "HTTPS", "Server Action 从 Gateway 收到的真实结果；审计详情加载后会补全 HTTP 状态", resultPayload);
    case "gacha":
      return tracePacket("observed", "response", "HTTP proxy", "Gateway 返回结果确认 Gacha Engine 已生成本次抽卡", resultPayload);
    case "config":
      return tracePacket("derived", "response", "database read", "抽卡事务成功，因此判定生效配置读取成功", {
        status: "available",
        banner_id: resultPayload.banner_id ?? null,
      });
    case "asset":
      return tracePacket("derived", "response", "service call", "抽卡事务成功，因此判定资源步骤已完成", {
        status: "completed",
        pull_count: resultPayload.count,
      });
    case "redis":
      return tracePacket("derived", "response", "Postgres transaction", "抽卡结果携带新状态版本，据此判定状态事务已经提交", {
        status: "committed",
        state_version: result?.stateVersion ?? null,
        next_pity: result?.nextPity ?? null,
      });
    case "kafka":
      return tracePacket("derived", "response", "Kafka", "抽卡结果返回 event_id，据此判定发布步骤已执行；消费状态由 Backpack 单独确认", {
        status: "published",
        topic: "gacha.pull_completed.v1",
        event_id: resultPayload.event_id,
      });
    default:
      return pendingPacket("response", "等待异步消费结果");
  }
}

function tracePacket(
  evidence: TraceEvidence,
  direction: TracePacketEnvelope["direction"],
  protocol: string,
  note: string,
  payload: unknown,
): TracePacketEnvelope {
  return {
    evidence,
    evidenceLabel: evidenceLabel(evidence),
    direction,
    protocol,
    note,
    payload,
  };
}

function pendingPacket(direction: TracePacketEnvelope["direction"], note: string) {
  return tracePacket("pending", direction, "pending", note, { status: "pending" });
}

function evidenceLabel(evidence: TraceEvidence): TracePacketEnvelope["evidenceLabel"] {
  const labels: Record<TraceEvidence, TracePacketEnvelope["evidenceLabel"]> = {
    observed: "实测",
    derived: "路径判定",
    pending: "待确认",
  };
  return labels[evidence];
}

function nodeProtocol(id: GachaTraceNodeId) {
  return {
    browser: "browser event",
    next: "React Server Action",
    gateway: "HTTPS",
    gacha: "HTTP proxy",
    config: "database read",
    asset: "service call",
    redis: "Postgres transaction",
    kafka: "Kafka",
    backpack: "HTTPS",
    "backpack-db": "database transaction",
  }[id];
}

function successfulNodesBefore(failedNodeId: GachaTraceNodeId) {
  const paths: Record<GachaTraceNodeId, GachaTraceNodeId[]> = {
    browser: [],
    next: ["browser"],
    gateway: ["browser", "next"],
    gacha: ["browser", "next", "gateway"],
    config: ["browser", "next", "gateway", "gacha"],
    asset: ["browser", "next", "gateway", "gacha", "config", "redis"],
    redis: ["browser", "next", "gateway", "gacha", "config"],
    kafka: ["browser", "next", "gateway", "gacha", "config", "asset", "redis"],
    backpack: [
      "browser",
      "next",
      "gateway",
      "gacha",
      "config",
      "asset",
      "redis",
      "kafka",
    ],
    "backpack-db": [
      "browser",
      "next",
      "gateway",
      "gacha",
      "config",
      "asset",
      "redis",
      "kafka",
      "backpack",
    ],
  };

  return new Set(paths[failedNodeId]);
}

function successSummary(id: GachaTraceNodeId) {
  const summaries: Record<GachaTraceNodeId, string> = {
    browser: "已收到服务端响应",
    next: "服务端动作已完成",
    gateway: "鉴权与分发成功",
    gacha: "抽卡事务执行成功",
    config: "生效配置可用",
    asset: "资源扣减成功",
    redis: "幂等、保底与待发送事件已持久化",
    kafka: "抽卡事件已发布",
    backpack: "Kafka 事件已消费",
    "backpack-db": "背包事务已提交",
  };
  return summaries[id];
}
