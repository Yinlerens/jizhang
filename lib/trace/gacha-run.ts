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
  | { type: "request_started"; at: number }
  | {
      type: "pull_succeeded";
      at: number;
      requestId: string;
      eventId: string;
    }
  | {
      type: "pull_failed";
      at: number;
      requestId?: string;
      code?: string;
      message: string;
    }
  | { type: "audit_loaded"; audit: GachaTraceAuditSnapshot }
  | { type: "backpack_succeeded"; at: number }
  | { type: "backpack_failed"; at: number; message: string };

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
    label: "Redis",
    role: "幂等与保底状态",
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
    label: "pity + idempotency",
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
      return requestStarted(run, signal.at);
    case "pull_succeeded":
      return pullSucceeded(run, signal);
    case "pull_failed":
      return pullFailed(run, signal);
    case "audit_loaded":
      return auditLoaded(run, signal.audit);
    case "backpack_succeeded":
      return backpackSucceeded(run, signal.at);
    case "backpack_failed":
      return backpackFailed(run, signal.at, signal.message);
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
    normalized.includes("redis") ||
    normalized.includes("pity") ||
    normalized.includes("idempotency") ||
    normalized === "pull_in_progress"
  ) {
    return { nodeId: "redis", summary: "幂等或保底状态处理失败" };
  }

  if (normalized.includes("kafka") || normalized.includes("event_publish")) {
    return { nodeId: "kafka", summary: "Kafka 事件没有发布成功" };
  }

  if (normalized.includes("backpack")) {
    return { nodeId: "backpack", summary: "背包消费或同步失败" };
  }

  return { nodeId: "gacha", summary: "抽卡引擎返回失败" };
}

function requestStarted(run: GachaTraceRun, at: number): GachaTraceRun {
  let nodes = updateNode(run.nodes, "browser", {
    status: "success",
    evidence: "observed",
    summary: "已提交抽卡操作",
    startedAt: at,
    finishedAt: at,
    durationMs: 0,
  });
  nodes = updateNode(nodes, "next", {
    status: "running",
    evidence: "observed",
    summary: "正在执行服务端动作",
    startedAt: at,
  });

  for (const id of GACHA_TRACE_NODE_ORDER.slice(2, 8)) {
    nodes = updateNode(nodes, id, {
      status: "waiting",
      evidence: "pending",
      summary: "等待上游信号",
    });
  }

  return {
    ...run,
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

  for (const id of SYNC_SUCCESS_NODES) {
    const observed = id === "browser" || id === "next" || id === "gateway" || id === "gacha";
    nodes = updateNode(nodes, id, {
      status: "success",
      evidence: observed ? "observed" : "derived",
      summary: successSummary(id),
      finishedAt: observed ? signal.at : null,
      durationMs: id === "next" ? Math.max(0, signal.at - run.startedAt) : null,
    });
  }

  nodes = updateNode(nodes, "backpack", {
    status: "waiting",
    evidence: "pending",
    summary: "等待消费 Kafka 事件",
    startedAt: signal.at,
  });
  nodes = updateNode(nodes, "backpack-db", {
    status: "waiting",
    evidence: "pending",
    summary: "等待背包事务提交",
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
      });
      continue;
    }

    nodes = updateNode(nodes, id, {
      status: "skipped",
      evidence: "derived",
      summary: "上游失败，未执行",
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
  const hasError = typeof audit.responseStatus === "number" && audit.responseStatus >= 500;
  const gatewayIsFailurePoint = run.failedNodeId === "gateway";
  const nodes = updateNode(run.nodes, "gateway", {
    evidence: "observed",
    status: hasError && gatewayIsFailurePoint ? "error" : run.nodes.gateway.status,
    summary:
      hasError && gatewayIsFailurePoint
        ? audit.errorMessage ?? "网关返回服务错误"
        : run.nodes.gateway.summary,
    startedAt: Number.isFinite(startedAt) ? startedAt : run.nodes.gateway.startedAt,
    finishedAt: Number.isFinite(finishedAt) ? finishedAt : run.nodes.gateway.finishedAt,
    durationMs: audit.durationMs,
    httpStatus: audit.responseStatus,
    errorCode: audit.errorCode,
    errorMessage: audit.errorMessage,
    request: audit.requestBody,
    response: audit.responseBody,
  });

  return {
    ...run,
    requestId: audit.requestId || run.requestId,
    nodes,
  };
}

function backpackSucceeded(run: GachaTraceRun, at: number): GachaTraceRun {
  let nodes = updateNode(run.nodes, "backpack", {
    status: "success",
    evidence: "observed",
    summary: "Kafka 事件已消费",
    finishedAt: at,
    durationMs:
      run.nodes.backpack.startedAt === null
        ? null
        : Math.max(0, at - run.nodes.backpack.startedAt),
  });
  nodes = updateNode(nodes, "backpack-db", {
    status: "success",
    evidence: "observed",
    summary: "背包与抽卡记录已提交",
    finishedAt: at,
  });

  return {
    ...run,
    status: "success",
    summary: "完整抽卡链路执行成功",
    finishedAt: at,
    nodes,
  };
}

function backpackFailed(run: GachaTraceRun, at: number, message: string): GachaTraceRun {
  let nodes = updateNode(run.nodes, "backpack", {
    status: "error",
    evidence: "observed",
    summary: "背包事件暂未完成",
    finishedAt: at,
    durationMs:
      run.nodes.backpack.startedAt === null
        ? null
        : Math.max(0, at - run.nodes.backpack.startedAt),
    errorCode: "backpack_sync_failed",
    errorMessage: message,
  });
  nodes = updateNode(nodes, "backpack-db", {
    status: "skipped",
    evidence: "pending",
    summary: "尚未确认事务提交",
  });

  return {
    ...run,
    status: "error",
    summary: "抽卡已完成，但背包同步未确认",
    failedNodeId: "backpack",
    finishedAt: at,
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
    redis: "幂等与保底状态已更新",
    kafka: "抽卡事件已发布",
    backpack: "Kafka 事件已消费",
    "backpack-db": "背包事务已提交",
  };
  return summaries[id];
}
