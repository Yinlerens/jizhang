export const KAFKA_MONITOR_TOPIC = "gacha.pull_completed.v1";
export const KAFKA_MONITOR_CONSUMER_GROUP = "backpack-service";
export const KAFKA_MONITOR_MAX_MESSAGES = 100;

export type KafkaMonitorStage = "published" | "consumed" | "publish_failed";
export type KafkaMonitorStatus = "waiting" | "consumed" | "publish_failed";

export type KafkaMonitorSignal = {
  requestId: string | null;
  eventId: string | null;
  stage: KafkaMonitorStage;
  at: string;
  stateVersion: number | null;
  errorCode: string | null;
  payload: Record<string, unknown>;
};

export type KafkaMonitorMessage = {
  id: string;
  requestId: string | null;
  eventId: string | null;
  status: KafkaMonitorStatus;
  publishedAt: string | null;
  consumedAt: string | null;
  failedAt: string | null;
  lastUpdatedAt: string;
  stateVersion: number | null;
  errorCode: string | null;
  payload: Record<string, unknown>;
};

export type KafkaMonitorSummary = {
  publishedCount: number;
  waitingCount: number;
  consumedCount: number;
  failedCount: number;
};

export function mergeKafkaMonitorSignals(
  current: KafkaMonitorMessage[],
  incoming: KafkaMonitorSignal[],
): KafkaMonitorMessage[] {
  const messages = new Map(current.map((message) => [message.id, message]));

  for (const signal of incoming) {
    const id = signalKey(signal);
    if (!id) {
      continue;
    }

    const existing = messages.get(id);
    messages.set(id, existing ? mergeSignal(existing, signal) : messageFromSignal(id, signal));
  }

  return [...messages.values()]
    .sort((left, right) => timestamp(right.lastUpdatedAt) - timestamp(left.lastUpdatedAt))
    .slice(0, KAFKA_MONITOR_MAX_MESSAGES);
}

export function summarizeKafkaMonitorMessages(
  messages: KafkaMonitorMessage[],
): KafkaMonitorSummary {
  const waitingCount = messages.filter((message) => message.status === "waiting").length;
  const consumedCount = messages.filter((message) => message.status === "consumed").length;

  return {
    publishedCount: waitingCount + consumedCount,
    waitingCount,
    consumedCount,
    failedCount: messages.filter((message) => message.status === "publish_failed").length,
  };
}

function signalKey(signal: KafkaMonitorSignal) {
  if (signal.eventId) {
    return `event:${signal.eventId}`;
  }
  if (signal.requestId) {
    return `request:${signal.requestId}`;
  }
  return null;
}

function messageFromSignal(id: string, signal: KafkaMonitorSignal): KafkaMonitorMessage {
  return {
    id,
    requestId: signal.requestId,
    eventId: signal.eventId,
    status: statusForStage(signal.stage),
    publishedAt: signal.stage === "published" ? signal.at : null,
    consumedAt: signal.stage === "consumed" ? signal.at : null,
    failedAt: signal.stage === "publish_failed" ? signal.at : null,
    lastUpdatedAt: signal.at,
    stateVersion: signal.stateVersion,
    errorCode: signal.errorCode,
    payload: signal.payload,
  };
}

function mergeSignal(
  existing: KafkaMonitorMessage,
  signal: KafkaMonitorSignal,
): KafkaMonitorMessage {
  const nextStatus = statusForStage(signal.stage);
  const status =
    existing.status === "consumed" || nextStatus === "consumed"
      ? "consumed"
      : existing.status === "publish_failed" || nextStatus === "publish_failed"
        ? "publish_failed"
        : "waiting";

  return {
    ...existing,
    requestId: existing.requestId ?? signal.requestId,
    eventId: existing.eventId ?? signal.eventId,
    status,
    publishedAt:
      existing.publishedAt ?? (signal.stage === "published" ? signal.at : null),
    consumedAt:
      existing.consumedAt ?? (signal.stage === "consumed" ? signal.at : null),
    failedAt:
      existing.failedAt ?? (signal.stage === "publish_failed" ? signal.at : null),
    lastUpdatedAt:
      timestamp(signal.at) >= timestamp(existing.lastUpdatedAt)
        ? signal.at
        : existing.lastUpdatedAt,
    stateVersion: existing.stateVersion ?? signal.stateVersion,
    errorCode: existing.errorCode ?? signal.errorCode,
    payload: { ...existing.payload, ...signal.payload },
  };
}

function statusForStage(stage: KafkaMonitorStage): KafkaMonitorStatus {
  if (stage === "consumed") {
    return "consumed";
  }
  if (stage === "publish_failed") {
    return "publish_failed";
  }
  return "waiting";
}

function timestamp(value: string) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
