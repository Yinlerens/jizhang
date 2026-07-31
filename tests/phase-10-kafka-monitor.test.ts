import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  KAFKA_MONITOR_CONSUMER_GROUP,
  KAFKA_MONITOR_MAX_MESSAGES,
  KAFKA_MONITOR_TOPIC,
  mergeKafkaMonitorSignals,
  summarizeKafkaMonitorMessages,
  type KafkaMonitorSignal,
} from "../lib/trace/kafka-monitor.ts";

test("merges one published event into its consumed lifecycle without losing producer context", () => {
  const published = signal({
    requestId: "request-1",
    eventId: "event-1",
    stage: "published",
    at: "2026-07-27T08:00:00.000Z",
    stateVersion: 7,
    payload: { event_id: "event-1", producer: "gacha-engine" },
  });
  const consumed = signal({
    requestId: null,
    eventId: "event-1",
    stage: "consumed",
    at: "2026-07-27T08:00:00.180Z",
    stateVersion: 7,
    payload: { consumer_group: "backpack-service", received_at: "2026-07-27T08:00:00.180Z" },
  });

  const messages = mergeKafkaMonitorSignals(
    mergeKafkaMonitorSignals([], [published]),
    [consumed],
  );

  assert.equal(messages.length, 1);
  assert.equal(messages[0]?.status, "consumed");
  assert.equal(messages[0]?.requestId, "request-1");
  assert.equal(messages[0]?.publishedAt, published.at);
  assert.equal(messages[0]?.consumedAt, consumed.at);
  assert.deepEqual(messages[0]?.payload, {
    event_id: "event-1",
    producer: "gacha-engine",
    consumer_group: "backpack-service",
    received_at: "2026-07-27T08:00:00.180Z",
  });
});

test("deduplicates repeated producer responses by event id and never downgrades consumed state", () => {
  const messages = mergeKafkaMonitorSignals([], [
    signal({ requestId: "request-first", eventId: "event-shared", stage: "published" }),
    signal({ requestId: "request-replay", eventId: "event-shared", stage: "published" }),
    signal({ requestId: null, eventId: "event-shared", stage: "consumed" }),
    signal({ requestId: "request-late", eventId: "event-shared", stage: "published" }),
  ]);

  assert.equal(messages.length, 1);
  assert.equal(messages[0]?.requestId, "request-first");
  assert.equal(messages[0]?.status, "consumed");
});

test("summarizes waiting, consumed, and failed publication messages honestly", () => {
  const messages = mergeKafkaMonitorSignals([], [
    signal({ requestId: "request-waiting", eventId: "event-waiting", stage: "published" }),
    signal({ requestId: null, eventId: "event-consumed", stage: "consumed" }),
    signal({
      requestId: "request-failed",
      eventId: null,
      stage: "publish_failed",
      errorCode: "kafka_unavailable",
    }),
  ]);

  assert.deepEqual(summarizeKafkaMonitorMessages(messages), {
    publishedCount: 2,
    waitingCount: 1,
    consumedCount: 1,
    failedCount: 1,
  });
});

test("retains only the newest bounded monitor history", () => {
  const messages = mergeKafkaMonitorSignals(
    [],
    Array.from({ length: KAFKA_MONITOR_MAX_MESSAGES + 5 }, (_, index) =>
      signal({
        requestId: `request-${index}`,
        eventId: `event-${index}`,
        at: new Date(Date.UTC(2026, 6, 27, 8, 0, index)).toISOString(),
      }),
    ),
  );

  assert.equal(messages.length, KAFKA_MONITOR_MAX_MESSAGES);
  assert.equal(messages[0]?.eventId, `event-${KAFKA_MONITOR_MAX_MESSAGES + 4}`);
  assert.equal(messages.at(-1)?.eventId, "event-5");
});

test("connects an authenticated Backpack poller to a non-modal floating topic monitor", () => {
  const actions = read("../app/gacha/actions.ts");
  const monitor = read("../components/trace/KafkaTopicMonitor.tsx");
  const lab = read("../app/SandboxTraceLab.tsx");

  assert.match(actions, /export async function loadKafkaTopicMonitor/);
  assert.match(actions, /getAuthenticatedSession\(\)/);
  assert.match(actions, /getBackpackPullEvents/);
  assert.match(monitor, /data-testid="kafka-topic-monitor"/);
  assert.equal(KAFKA_MONITOR_TOPIC, "gacha.pull_completed.v1");
  assert.equal(KAFKA_MONITOR_CONSUMER_GROUP, "backpack-service");
  assert.match(monitor, /KAFKA_MONITOR_TOPIC/);
  assert.match(monitor, /KAFKA_MONITOR_CONSUMER_GROUP/);
  assert.match(monitor, /setInterval/);
  assert.match(monitor, /暂停/);
  assert.match(monitor, /待消费/);
  assert.doesNotMatch(monitor, /DialogContent/);
  assert.doesNotMatch(monitor, /["'](?:partition|offset|consumer_lag)["']/i);
  assert.match(lab, /<KafkaTopicMonitor/);
  assert.match(lab, /stage: "published"/);
  assert.match(lab, /stage: "publish_failed"/);
});

test("forwards completed rapid-pull batches into the same topic monitor", () => {
  const dialog = read("../components/trace/TraceConcurrencyDialog.tsx");
  const lab = read("../app/SandboxTraceLab.tsx");

  assert.match(dialog, /onBatchCompleted: \(batch: GachaConcurrencyBatch\) => void/);
  assert.match(dialog, /onBatchCompleted\(result\.batch\)/);
  assert.match(lab, /onBatchCompleted={recordConcurrencyBatch}/);
});

function signal(overrides: Partial<KafkaMonitorSignal> = {}): KafkaMonitorSignal {
  return {
    requestId: "request-1",
    eventId: "event-1",
    stage: "published",
    at: "2026-07-27T08:00:00.000Z",
    stateVersion: 1,
    errorCode: null,
    payload: {},
    ...overrides,
  };
}

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
