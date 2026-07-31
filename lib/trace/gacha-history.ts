import {
  GACHA_TRACE_NODE_DEFINITIONS,
  GACHA_TRACE_NODE_ORDER,
  createGachaTraceRun,
  reduceGachaTrace,
  type GachaTraceAuditSnapshot,
  type GachaTraceNodeId,
  type GachaTraceRun,
  type TraceNodeStatus,
} from "./gacha-run.ts";

export type GachaTraceHistoryOutcome = "success" | "error" | "pending";

export type GachaTraceHistoryEntry = {
  requestId: string;
  startedAt: string;
  durationMs: number | null;
  responseStatus: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  bannerId: string | null;
  count: 1 | 10 | null;
  outcome: GachaTraceHistoryOutcome;
};

export type HistoricalPullResult = {
  id: string;
  itemId: string;
  itemName: string;
  rarity: 3 | 4 | 5;
  isFeatured: boolean;
};

export type GachaHistoricalTrace = {
  entry: GachaTraceHistoryEntry;
  run: GachaTraceRun;
  results: HistoricalPullResult[];
  requestBody: unknown;
  responseBody: unknown;
};

export type GachaTraceNodeChange = {
  nodeId: GachaTraceNodeId;
  label: string;
  baselineStatus: TraceNodeStatus;
  targetStatus: TraceNodeStatus;
  baselineErrorCode: string | null;
  targetErrorCode: string | null;
  baselineDurationMs: number | null;
  targetDurationMs: number | null;
};

export type GachaTracePacketChange = {
  path: string;
  baselineValue: string;
  targetValue: string;
};

export type GachaTraceComparison = {
  target: GachaTraceHistoryEntry;
  baseline: GachaTraceHistoryEntry;
  durationDeltaMs: number | null;
  nodeChanges: GachaTraceNodeChange[];
  packetChanges: GachaTracePacketChange[];
};

type AuditListItemLike = {
  request_id: string;
  started_at: string;
  duration_ms: number | null;
  response_status: number | null;
  error_code: string | null;
  error_message: string | null;
  request_body_preview: string;
};

const VOLATILE_PACKET_PATH = /(^|\.)(id|event_id|seed|request_id|client_request_id)$/;
const MAX_PACKET_CHANGES = 40;

export function toGachaTraceHistoryEntry(item: AuditListItemLike): GachaTraceHistoryEntry {
  const request = asRecord(parseJson(item.request_body_preview));

  return {
    requestId: item.request_id,
    startedAt: item.started_at,
    durationMs: finiteNumber(item.duration_ms),
    responseStatus: finiteNumber(item.response_status),
    errorCode: optionalString(item.error_code),
    errorMessage: optionalString(item.error_message),
    bannerId: optionalString(request?.banner_id),
    count: pullCount(request?.count),
    outcome: auditOutcome(item.response_status, item.error_code),
  };
}

export function createGachaHistoricalTrace(
  audit: GachaTraceAuditSnapshot,
): GachaHistoricalTrace {
  const request = asRecord(audit.requestBody);
  const response = responsePayload(audit.responseBody);
  const bannerId = optionalString(request?.banner_id);
  const count = pullCount(request?.count);
  const startedAt = timestamp(audit.startedAt, 0);
  const finishedAt = timestamp(audit.finishedAt, startedAt + (audit.durationMs ?? 0));
  const errorCode = audit.errorCode ?? responseErrorCode(response);
  const errorMessage = audit.errorMessage ?? responseErrorMessage(response);
  const entry: GachaTraceHistoryEntry = {
    requestId: audit.requestId,
    startedAt: audit.startedAt,
    durationMs: finiteNumber(audit.durationMs),
    responseStatus: finiteNumber(audit.responseStatus),
    errorCode,
    errorMessage,
    bannerId,
    count,
    outcome: auditOutcome(audit.responseStatus, errorCode),
  };
  const results = pullResults(response);
  let run = createGachaTraceRun({
    runId: `history:${audit.requestId}`,
    bannerId: bannerId ?? "unknown-banner",
    count: count ?? 1,
    startedAt,
  });

  run = reduceGachaTrace(run, {
    type: "request_started",
    at: startedAt,
    requestId: audit.requestId,
  });

  if (entry.outcome === "success" && optionalString(response?.event_id)) {
    run = reduceGachaTrace(run, {
      type: "pull_succeeded",
      at: finishedAt,
      requestId: audit.requestId,
      eventId: optionalString(response?.event_id)!,
      result: {
        stateVersion: finiteNumber(response?.state_version) ?? 0,
        nextPity: response?.next_pity ?? null,
        records: results.map((result) => ({
          id: result.id,
          itemId: result.itemId,
          itemName: result.itemName,
          rarity: result.rarity,
          isFeatured: result.isFeatured,
        })),
      },
    });
  } else {
    run = reduceGachaTrace(run, {
      type: "pull_failed",
      at: finishedAt,
      requestId: audit.requestId,
      code: errorCode ?? "historical_response_incomplete",
      message: errorMessage ?? "历史调用未返回完整抽卡结果",
    });
  }

  run = reduceGachaTrace(run, { type: "audit_loaded", audit });

  return {
    entry,
    run,
    results,
    requestBody: audit.requestBody,
    responseBody: audit.responseBody,
  };
}

export function selectGachaTraceBaseline(
  target: GachaTraceHistoryEntry,
  candidates: GachaTraceHistoryEntry[],
) {
  if (!target.bannerId || !target.count) {
    return undefined;
  }

  const targetTime = timestamp(target.startedAt, 0);
  let selected: GachaTraceHistoryEntry | undefined;
  let selectedDistance = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    if (
      candidate.requestId === target.requestId ||
      candidate.outcome !== "success" ||
      candidate.bannerId !== target.bannerId ||
      candidate.count !== target.count
    ) {
      continue;
    }

    const distance = Math.abs(timestamp(candidate.startedAt, targetTime) - targetTime);
    if (distance < selectedDistance) {
      selected = candidate;
      selectedDistance = distance;
    }
  }

  return selected;
}

export function compareGachaHistoricalTraces(
  target: GachaHistoricalTrace,
  baseline: GachaHistoricalTrace,
): GachaTraceComparison {
  const nodeChanges = GACHA_TRACE_NODE_ORDER.flatMap((nodeId) => {
    const targetNode = target.run.nodes[nodeId];
    const baselineNode = baseline.run.nodes[nodeId];
    if (
      targetNode.status === baselineNode.status &&
      targetNode.errorCode === baselineNode.errorCode &&
      targetNode.durationMs === baselineNode.durationMs
    ) {
      return [];
    }

    return [
      {
        nodeId,
        label: GACHA_TRACE_NODE_DEFINITIONS[nodeId].label,
        baselineStatus: baselineNode.status,
        targetStatus: targetNode.status,
        baselineErrorCode: baselineNode.errorCode,
        targetErrorCode: targetNode.errorCode,
        baselineDurationMs: baselineNode.durationMs,
        targetDurationMs: targetNode.durationMs,
      },
    ];
  });
  const baselinePacket = packetFields(baseline.requestBody, baseline.responseBody);
  const targetPacket = packetFields(target.requestBody, target.responseBody);
  const packetChanges: GachaTracePacketChange[] = [];
  const paths = new Set([...baselinePacket.keys(), ...targetPacket.keys()]);

  for (const path of paths) {
    const baselineValue = baselinePacket.get(path) ?? "未提供";
    const targetValue = targetPacket.get(path) ?? "未提供";
    if (baselineValue === targetValue) {
      continue;
    }
    packetChanges.push({ path, baselineValue, targetValue });
    if (packetChanges.length >= MAX_PACKET_CHANGES) {
      break;
    }
  }

  return {
    target: target.entry,
    baseline: baseline.entry,
    durationDeltaMs:
      target.entry.durationMs === null || baseline.entry.durationMs === null
        ? null
        : target.entry.durationMs - baseline.entry.durationMs,
    nodeChanges,
    packetChanges,
  };
}

function packetFields(request: unknown, response: unknown) {
  const fields = new Map<string, string>();
  flattenPacket(request, "request", fields, 0);
  flattenPacket(response, "response", fields, 0);
  return fields;
}

function flattenPacket(
  value: unknown,
  path: string,
  fields: Map<string, string>,
  depth: number,
) {
  if (VOLATILE_PACKET_PATH.test(path)) {
    return;
  }
  if (value === null || typeof value !== "object") {
    fields.set(path, displayValue(value));
    return;
  }
  if (Array.isArray(value)) {
    fields.set(`${path}.length`, String(value.length));
    const records = value.map(asRecord).filter((record): record is Record<string, unknown> => Boolean(record));
    if (records.length === value.length && records.some((record) => pullRarity(record.rarity))) {
      for (const rarity of [5, 4, 3] as const) {
        fields.set(
          `${path}.rarity_${rarity}`,
          String(records.filter((record) => pullRarity(record.rarity) === rarity).length),
        );
      }
      fields.set(
        `${path}.featured`,
        String(records.filter((record) => record.is_featured === true).length),
      );
    }
    return;
  }
  if (depth >= 4) {
    fields.set(path, displayValue(value));
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    flattenPacket(child, `${path}.${key}`, fields, depth + 1);
  }
}

function pullResults(response: Record<string, unknown> | null): HistoricalPullResult[] {
  if (!Array.isArray(response?.records)) {
    return [];
  }

  return response.records.flatMap((value, index) => {
    const record = asRecord(value);
    const rarity = pullRarity(record?.rarity);
    if (!record || !rarity) {
      return [];
    }
    const itemId = optionalString(record.item_id) ?? `historical-item-${index}`;
    return [
      {
        id: optionalString(record.id) ?? `${itemId}:${index}`,
        itemId,
        itemName: optionalString(record.item_name) ?? itemId,
        rarity,
        isFeatured: record.is_featured === true,
      },
    ];
  });
}

function responsePayload(value: unknown) {
  const root = asRecord(value);
  return asRecord(root?.data) ?? root;
}

function responseErrorCode(response: Record<string, unknown> | null) {
  const error = asRecord(response?.error);
  return optionalString(response?.code) ?? optionalString(error?.code);
}

function responseErrorMessage(response: Record<string, unknown> | null) {
  const error = asRecord(response?.error);
  return optionalString(response?.message) ?? optionalString(error?.message);
}

function auditOutcome(status: number | null, errorCode: string | null): GachaTraceHistoryOutcome {
  if (status === null) {
    return "pending";
  }
  return status >= 400 || Boolean(errorCode) ? "error" : "success";
}

function parseJson(value: string) {
  if (!value.trim()) {
    return null;
  }
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function finiteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function pullCount(value: unknown): 1 | 10 | null {
  return value === 1 || value === 10 ? value : null;
}

function pullRarity(value: unknown): 3 | 4 | 5 | null {
  return value === 3 || value === 4 || value === 5 ? value : null;
}

function timestamp(value: string | null, fallback: number) {
  if (!value) {
    return fallback;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function displayValue(value: unknown) {
  if (value === undefined) {
    return "未提供";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return value.length > 160 ? `${value.slice(0, 157)}...` : value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  try {
    const serialized = JSON.stringify(value);
    return serialized.length > 160 ? `${serialized.slice(0, 157)}...` : serialized;
  } catch {
    return String(value);
  }
}
