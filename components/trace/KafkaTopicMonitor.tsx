"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  CircleX,
  Clock3,
  Pause,
  Play,
  RadioTower,
  RefreshCw,
  X,
} from "lucide-react";

import { loadKafkaTopicMonitor } from "@/app/gacha/actions";
import {
  KAFKA_MONITOR_CONSUMER_GROUP,
  KAFKA_MONITOR_TOPIC,
  summarizeKafkaMonitorMessages,
  type KafkaMonitorMessage,
  type KafkaMonitorSignal,
  type KafkaMonitorStatus,
} from "@/lib/trace/kafka-monitor";

const POLL_INTERVAL_MS = 1_500;

type MessageFilter = "all" | KafkaMonitorStatus;

export default function KafkaTopicMonitor({
  messages,
  onSignalsReceived,
}: {
  messages: KafkaMonitorMessage[];
  onSignalsReceived: (signals: KafkaMonitorSignal[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [lastObservedAt, setLastObservedAt] = useState<string | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  const refreshInFlightRef = useRef(false);
  const summary = useMemo(() => summarizeKafkaMonitorMessages(messages), [messages]);
  const filteredMessages = useMemo(
    () =>
      filter === "all"
        ? messages
        : messages.filter((message) => message.status === filter),
    [filter, messages],
  );

  const refresh = useCallback(async () => {
    if (refreshInFlightRef.current) {
      return;
    }

    refreshInFlightRef.current = true;
    setRefreshing(true);
    try {
      const result = await loadKafkaTopicMonitor();
      if (!result.ok) {
        setPollError(result.message);
        return;
      }

      onSignalsReceived(result.signals);
      setLastObservedAt(result.observedAt);
      setPollError(null);
    } catch (error) {
      setPollError(error instanceof Error ? error.message : "实时消息状态暂不可用。");
    } finally {
      refreshInFlightRef.current = false;
      setRefreshing(false);
    }
  }, [onSignalsReceived]);

  useEffect(() => {
    if (!open || paused) {
      return;
    }

    const initialRefreshId = window.setTimeout(() => void refresh(), 0);
    const intervalId = window.setInterval(() => void refresh(), POLL_INTERVAL_MS);
    return () => {
      window.clearTimeout(initialRefreshId);
      window.clearInterval(intervalId);
    };
  }, [open, paused, refresh]);

  return (
    <>
      {open ? (
        <section
          data-testid="kafka-topic-monitor"
          role="region"
          aria-label="Kafka Topic 实时消息"
          className="fixed right-4 bottom-20 z-40 flex max-h-[min(720px,calc(100vh-6rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden border border-[#bdcbc4] bg-white shadow-[0_18px_60px_rgba(31,55,44,0.22)] sm:w-[460px]"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#dce4e0] bg-[#f8faf9] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex size-9 shrink-0 items-center justify-center border border-[#b7ccc1] bg-white text-[#2f745d]">
                <RadioTower className="size-4" />
                {!paused ? (
                  <span className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-white bg-[#2f8c68]" />
                ) : null}
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-xs font-black text-[#1f3027]">Kafka Topic</h2>
                <p className="mt-0.5 truncate font-mono text-[9px] font-bold text-[#6f7d75]">
                  {KAFKA_MONITOR_TOPIC}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <IconButton
                label={paused ? "恢复实时刷新" : "暂停实时刷新"}
                onClick={() => setPaused((current) => !current)}
                icon={paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              />
              <IconButton
                label="立即刷新"
                onClick={() => void refresh()}
                disabled={refreshing}
                icon={<RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />}
              />
              <IconButton
                label="关闭 Kafka 消息面板"
                onClick={() => setOpen(false)}
                icon={<X className="size-3.5" />}
              />
            </div>
          </header>

          <div className="grid shrink-0 grid-cols-2 border-b border-[#dce4e0] bg-white sm:grid-cols-4">
            <Metric label="发布" value={summary.publishedCount} />
            <Metric label="待消费" value={summary.waitingCount} tone="waiting" />
            <Metric label="已消费" value={summary.consumedCount} tone="consumed" />
            <Metric label="失败" value={summary.failedCount} tone="failed" />
          </div>

          <div className="shrink-0 border-b border-[#dce4e0] bg-[#f8faf9] px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-1" aria-label="消息状态筛选">
                <FilterButton active={filter === "all"} label="全部" onClick={() => setFilter("all")} />
                <FilterButton
                  active={filter === "waiting"}
                  label="待消费"
                  onClick={() => setFilter("waiting")}
                />
                <FilterButton
                  active={filter === "consumed"}
                  label="已消费"
                  onClick={() => setFilter("consumed")}
                />
                <FilterButton
                  active={filter === "publish_failed"}
                  label="失败"
                  onClick={() => setFilter("publish_failed")}
                />
              </div>
              <span className="hidden shrink-0 font-mono text-[8px] font-bold text-[#87938d] sm:inline">
                {paused ? "已暂停" : lastObservedAt ? formatTime(lastObservedAt) : "连接中"}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[8px] font-bold text-[#87938d]">
              <span className="truncate">GROUP {KAFKA_MONITOR_CONSUMER_GROUP}</span>
              <span className="shrink-0">{POLL_INTERVAL_MS / 1_000}s REFRESH</span>
            </div>
            {pollError ? (
              <div className="mt-2 border-l-2 border-[#c74a50] bg-[#fff3f3] px-2 py-1.5 text-[9px] font-bold text-[#9e353b]">
                {pollError}
              </div>
            ) : null}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-white">
            {filteredMessages.length ? (
              <div className="divide-y divide-[#e2e8e5]">
                {filteredMessages.map((message) => (
                  <KafkaMessageRow key={message.id} message={message} />
                ))}
              </div>
            ) : (
              <div className="grid min-h-52 place-items-center px-6 text-center">
                <div>
                  <span className="mx-auto flex size-10 items-center justify-center border border-[#ccd8d2] bg-[#f8faf9] text-[#6f8178]">
                    <RadioTower className="size-4" />
                  </span>
                  <p className="mt-3 text-[11px] font-black text-[#526159]">
                    {filter === "all" ? "等待抽卡消息" : "当前筛选下没有消息"}
                  </p>
                  <p className="mt-1 font-mono text-[8px] font-bold text-[#929e98]">
                    {paused ? "LIVE POLL PAUSED" : "LISTENING FOR BUSINESS EVENTS"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-label="打开 Kafka Topic 实时消息"
        title="Kafka Topic 实时消息"
        onClick={() => setOpen((current) => !current)}
        className="fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center border border-[#1f5d48] bg-[#1f372c] text-white shadow-[0_8px_28px_rgba(31,55,44,0.3)] transition hover:bg-[#294b3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f8c68]"
      >
        <RadioTower className="size-5" />
        {summary.waitingCount > 0 ? (
          <span className="absolute -top-2 -right-2 flex min-w-5 h-5 items-center justify-center rounded-full border-2 border-white bg-[#c47a22] px-1 font-mono text-[8px] font-black text-white">
            {summary.waitingCount > 99 ? "99+" : summary.waitingCount}
          </span>
        ) : null}
      </button>
    </>
  );
}

function KafkaMessageRow({ message }: { message: KafkaMonitorMessage }) {
  const status = statusPresentation(message.status);
  const observedAt = message.consumedAt ?? message.failedAt ?? message.publishedAt;

  return (
    <details className="group bg-white open:bg-[#fbfcfb]">
      <summary className="flex min-h-20 cursor-pointer list-none items-start gap-3 px-4 py-3 marker:hidden hover:bg-[#f8faf9]">
        <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center ${status.iconClass}`}>
          {status.icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-3">
            <strong className={`text-[10px] font-black ${status.textClass}`}>{status.label}</strong>
            <time className="shrink-0 font-mono text-[8px] font-bold text-[#89958f]">
              {observedAt ? formatTime(observedAt) : "--:--:--"}
            </time>
          </span>
          <span className="mt-1 block truncate font-mono text-[9px] font-bold text-[#35473e]" title={message.eventId ?? undefined}>
            EVENT {message.eventId ? compactId(message.eventId) : "NOT_CREATED"}
          </span>
          <span className="mt-0.5 block truncate font-mono text-[8px] text-[#7e8b84]" title={message.requestId ?? undefined}>
            REQUEST {message.requestId ? compactId(message.requestId) : "UNAVAILABLE"}
          </span>
        </span>
        <ChevronDown className="mt-1 size-3.5 shrink-0 text-[#829087] transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-[#e3e9e6] bg-[#f4f7f5] px-4 py-3">
        <dl className="mb-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[9px]">
          <MessageDatum label="State version" value={message.stateVersion?.toString() ?? "-"} />
          <MessageDatum label="Error code" value={message.errorCode ?? "-"} />
          <MessageDatum label="Published" value={formatDateTime(message.publishedAt)} />
          <MessageDatum label="Consumed" value={formatDateTime(message.consumedAt)} />
        </dl>
        <div className="mb-1.5 text-[8px] font-black text-[#6f7d75]">MESSAGE PAYLOAD</div>
        <pre className="max-h-64 overflow-auto border border-[#d5dfda] bg-white p-3 font-mono text-[9px] leading-4 whitespace-pre-wrap break-all text-[#314239]">
          {stringifyPayload(message.payload)}
        </pre>
      </div>
    </details>
  );
}

function IconButton({
  label,
  icon,
  onClick,
  disabled = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-8 items-center justify-center border border-transparent text-[#64736b] transition hover:border-[#cbd7d1] hover:bg-white hover:text-[#22342b] disabled:cursor-wait disabled:opacity-50"
    >
      {icon}
    </button>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`h-7 px-2 text-[9px] font-black transition ${
        active
          ? "bg-[#1f372c] text-white"
          : "border border-[#d4ded9] bg-white text-[#68776f] hover:border-[#98aaa1]"
      }`}
    >
      {label}
    </button>
  );
}

function Metric({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "waiting" | "consumed" | "failed";
}) {
  const valueClass = {
    neutral: "text-[#273a30]",
    waiting: "text-[#a96518]",
    consumed: "text-[#237352]",
    failed: "text-[#b43d43]",
  }[tone];

  return (
    <div className="border-r border-b border-[#e2e8e5] px-3 py-2.5 last:border-r-0 sm:border-b-0">
      <div className="text-[8px] font-black text-[#7f8c85]">{label}</div>
      <div className={`mt-0.5 font-mono text-lg font-black ${valueClass}`}>{value}</div>
    </div>
  );
}

function MessageDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[8px] font-black text-[#7f8c85]">{label}</dt>
      <dd className="mt-0.5 truncate font-mono font-bold text-[#34463c]" title={value}>
        {value}
      </dd>
    </div>
  );
}

function statusPresentation(status: KafkaMonitorStatus) {
  if (status === "consumed") {
    return {
      label: "已消费",
      textClass: "text-[#237352]",
      iconClass: "bg-[#e7f4ed] text-[#237352]",
      icon: <CheckCircle2 className="size-3.5" />,
    };
  }
  if (status === "publish_failed") {
    return {
      label: "发布失败",
      textClass: "text-[#b43d43]",
      iconClass: "bg-[#fdebec] text-[#b43d43]",
      icon: <CircleX className="size-3.5" />,
    };
  }
  return {
    label: "待消费",
    textClass: "text-[#a96518]",
    iconClass: "bg-[#fff1dc] text-[#a96518]",
    icon: <Clock3 className="size-3.5" />,
  };
}

function compactId(value: string) {
  return value.length > 20 ? `${value.slice(0, 12)}...${value.slice(-4)}` : value;
}

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleTimeString("zh-CN", { hour12: false });
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("zh-CN", { hour12: false });
}

function stringifyPayload(payload: Record<string, unknown>) {
  try {
    return JSON.stringify(payload, null, 2);
  } catch {
    return "{\n  \"error\": \"payload could not be rendered\"\n}";
  }
}
