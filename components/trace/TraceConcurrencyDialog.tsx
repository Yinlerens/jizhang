"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gauge,
  LoaderCircle,
  MousePointerClick,
  TriangleAlert,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";

import { runGachaConcurrencyBatch } from "@/app/gacha/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ASTRITE_PER_PULL } from "@/lib/gacha/simulator";
import {
  createGachaConcurrencyTrace,
  type GachaConcurrencyBatch,
  type GachaConcurrencyMode,
  type GachaConcurrencyRequestResult,
  type GachaConcurrencyTrace,
} from "@/lib/trace/gacha-concurrency";
import {
  type GachaTraceNodeId,
  type TraceNodeStatus,
} from "@/lib/trace/gacha-run";

const INTERVAL_OPTIONS = [0, 25, 50, 100, 250, 500] as const;
const COMPACT_NODE_LABELS: Record<GachaTraceNodeId, string> = {
  browser: "Browser",
  next: "Next",
  gateway: "Gateway",
  gacha: "Gacha",
  config: "Config",
  asset: "Asset",
  redis: "State DB",
  kafka: "Kafka",
  backpack: "Backpack",
  "backpack-db": "DB",
};
const FLOW_PREFIX: GachaTraceNodeId[] = ["browser", "next", "gateway", "gacha"];
const GACHA_DEPENDENCIES: GachaTraceNodeId[] = ["config", "asset", "redis"];
const FLOW_SUFFIX: GachaTraceNodeId[] = ["kafka", "backpack", "backpack-db"];

export default function TraceConcurrencyDialog({
  bannerId,
  bannerName,
  count,
  balanceMinor,
  open,
  onOpenChange,
  onTraceLoaded,
  onBalanceChange,
  onBatchStarted,
  onBatchCompleted,
}: {
  bannerId: string;
  bannerName: string;
  count: 1 | 10;
  balanceMinor?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTraceLoaded: (trace: GachaConcurrencyTrace) => void;
  onBalanceChange: (balanceMinor: number) => void;
  onBatchStarted: () => void;
  onBatchCompleted: (batch: GachaConcurrencyBatch) => void;
}) {
  const [mode, setMode] = useState<GachaConcurrencyMode>(
    "independent-idempotency",
  );
  const [requestCount, setRequestCount] = useState(5);
  const [intervalMs, setIntervalMs] = useState<(typeof INTERVAL_OPTIONS)[number]>(0);
  const [batch, setBatch] = useState<GachaConcurrencyBatch | null>(null);
  const [isRunning, startRunTransition] = useTransition();
  const operationCostMinor = count * ASTRITE_PER_PULL;
  const lanes = useMemo(() => buildLanes(batch), [batch]);

  const executeBatch = () => {
    if (!bannerId || isRunning) {
      return;
    }

    onBatchStarted();
    startRunTransition(async () => {
      try {
        const result = await runGachaConcurrencyBatch({
          bannerId,
          count,
          requestCount,
          intervalMs,
          mode,
        });
        if (!result.ok) {
          toast.error(result.message);
          return;
        }

        setBatch(result.batch);
        onBatchCompleted(result.batch);
        if (result.batch.summary.balanceAfterMinor !== null) {
          onBalanceChange(result.batch.summary.balanceAfterMinor);
        }
        toast.success(
          `并发批次完成：${result.batch.summary.successCount}/${result.batch.summary.submittedCount} 个请求成功`,
        );
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "并发批次执行失败。");
      }
    });
  };

  const loadIntoMainTrace = (item: GachaConcurrencyRequestResult) => {
    const trace = createGachaConcurrencyTrace({
      bannerId: batch?.bannerId ?? bannerId,
      count: batch?.count ?? count,
      item,
    });
    onTraceLoaded(trace);
    onOpenChange(false);
    toast.success(`请求 #${item.sequence} 已载入主拓扑`);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && isRunning) {
          return;
        }
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        data-testid="trace-concurrency-dialog"
        className="gap-0 overflow-hidden border border-[#cbd7d1] bg-white p-0 shadow-2xl"
        style={{
          width: "min(1280px, calc(100vw - 2rem))",
          maxWidth: "none",
          height: "min(880px, calc(100vh - 2rem))",
        }}
      >
        <div className="flex min-h-0 flex-col">
          <DialogHeader className="shrink-0 border-b border-[#dce4e0] bg-[#f8faf9] px-5 py-4 pr-16 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-[#b7ccc1] bg-white text-[#2f745d]">
                <MousePointerClick className="size-4" />
              </span>
              <div className="min-w-0">
                <DialogTitle className="text-base font-black tracking-normal text-[#17251e] normal-case">
                  并发抽取
                </DialogTitle>
                <DialogDescription className="mt-1 truncate text-[10px] font-bold text-[#78867f]">
                  {bannerName} · {count === 1 ? "单抽" : "十连"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <section className="grid shrink-0 border-b border-[#dce4e0] bg-white xl:grid-cols-[minmax(340px,1fr)_220px_260px]">
            <div className="border-b border-[#e3e9e6] p-4 xl:border-r xl:border-b-0 sm:p-5">
              <div className="text-[9px] font-black text-[#7b8982]">请求模式</div>
              <div className="mt-2 grid grid-cols-2 border border-[#cbd7d1] bg-[#f4f7f5] p-1">
                <ModeButton
                  active={mode === "independent-idempotency"}
                  label="独立幂等键"
                  onClick={() => setMode("independent-idempotency")}
                  disabled={isRunning}
                />
                <ModeButton
                  active={mode === "shared-idempotency"}
                  label="同一幂等键"
                  onClick={() => setMode("shared-idempotency")}
                  disabled={isRunning}
                />
              </div>
            </div>

            <label className="border-b border-[#e3e9e6] p-4 xl:border-r xl:border-b-0 sm:p-5">
              <span className="flex items-center justify-between text-[9px] font-black text-[#7b8982]">
                请求数
                <strong className="font-mono text-sm text-[#22342b]">{requestCount}</strong>
              </span>
              <input
                type="range"
                min={2}
                max={10}
                step={1}
                value={requestCount}
                onChange={(event) => setRequestCount(Number(event.target.value))}
                disabled={isRunning}
                className="mt-3 h-2 w-full accent-[#2f745d]"
              />
              <span className="mt-2 flex justify-between font-mono text-[8px] font-bold text-[#9aa59f]">
                <span>2</span>
                <span>10</span>
              </span>
            </label>

            <div className="p-4 sm:p-5">
              <div className="text-[9px] font-black text-[#7b8982]">请求间隔</div>
              <div className="mt-2 grid grid-cols-3 gap-1">
                {INTERVAL_OPTIONS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={intervalMs === value}
                    onClick={() => setIntervalMs(value)}
                    disabled={isRunning}
                    className={`h-8 border font-mono text-[9px] font-black transition ${
                      intervalMs === value
                        ? "border-[#2f745d] bg-[#edf6f2] text-[#235b46]"
                        : "border-[#d4ded9] bg-white text-[#718078] hover:border-[#98aaa1]"
                    } disabled:opacity-50`}
                  >
                    {value}ms
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#dce4e0] bg-[#f8faf9] px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold text-[#65736c]">
              <span className="flex items-center gap-1.5">
                <Gauge className="size-3.5 text-[#2f745d]" />
                理论请求额
                <strong className="font-mono text-[#26372e]">
                  {(operationCostMinor * requestCount).toLocaleString("zh-CN")}
                </strong>
              </span>
              {typeof balanceMinor === "number" ? (
                <span
                  className={
                    balanceMinor < operationCostMinor * requestCount
                      ? "text-[#b23b41]"
                      : "text-[#65736c]"
                  }
                >
                  当前 {balanceMinor.toLocaleString("zh-CN")}
                </span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={executeBatch}
              disabled={isRunning || !bannerId}
              className="flex h-10 min-w-40 items-center justify-center gap-2 bg-[#1f372c] px-4 text-[10px] font-black text-white transition hover:bg-[#294b3b] disabled:cursor-not-allowed disabled:bg-[#aebbb4]"
              title="执行并发抽取"
            >
              {isRunning ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <Activity className="size-3.5" />
              )}
              {isRunning ? "批次执行中" : `发起 ${requestCount} 个请求`}
            </button>
          </section>

          <div className="min-h-0 flex-1 overflow-y-auto bg-[#f3f6f4]">
            {batch ? (
              <>
                <BatchSummary
                  batch={batch}
                  operationCostMinor={batch.count * ASTRITE_PER_PULL}
                />
                <section className="border-b border-[#dce4e0] bg-white px-4 py-3 sm:px-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[10px] font-black text-[#2b3931]">请求时序与节点泳道</h3>
                    <span className="font-mono text-[9px] font-bold text-[#7f8b85]">
                      批次 {batch.durationMs}ms
                    </span>
                  </div>
                </section>
                <div className="divide-y divide-[#dfe7e3] border-b border-[#d5dfda] bg-white">
                  {lanes.map((lane) => (
                    <RequestLane
                      key={`${batch.batchId}-${lane.item.sequence}`}
                      lane={lane}
                      onLoad={() => loadIntoMainTrace(lane.item)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="grid min-h-72 place-items-center px-6 text-center">
                <div>
                  <span className="mx-auto flex size-11 items-center justify-center border border-[#cbd7d1] bg-white text-[#668078]">
                    <Clock3 className="size-4" />
                  </span>
                  <div className="mt-3 text-xs font-black text-[#4f5f57]">等待并发批次</div>
                  <div className="mt-1 font-mono text-[9px] font-bold text-[#929e98]">
                    {requestCount} REQUESTS · {intervalMs}MS INTERVAL
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ModeButton({
  active,
  label,
  onClick,
  disabled,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={`h-9 text-[10px] font-black transition ${
        active ? "bg-[#1f372c] text-white" : "text-[#65736c] hover:bg-white"
      } disabled:opacity-50`}
    >
      {label}
    </button>
  );
}

function BatchSummary({
  batch,
  operationCostMinor,
}: {
  batch: GachaConcurrencyBatch;
  operationCostMinor: number;
}) {
  const expectedCommittedMinor = batch.summary.uniqueEventCount * operationCostMinor;
  const deductionDriftMinor =
    batch.summary.actualDeductionMinor === null
      ? null
      : batch.summary.actualDeductionMinor - expectedCommittedMinor;

  return (
    <section className="grid border-b border-[#dce4e0] bg-[#f8faf9] sm:grid-cols-4 xl:grid-cols-8">
      <Metric label="提交" value={String(batch.summary.submittedCount)} />
      <Metric label="成功响应" value={String(batch.summary.successCount)} tone="good" />
      <Metric label="唯一事件" value={String(batch.summary.uniqueEventCount)} />
      <Metric
        label="幂等拦截 / 复用"
        value={String(batch.summary.idempotencyProtectedCount)}
        tone="info"
      />
      <Metric
        label="版本冲突"
        value={String(batch.summary.versionConflictCount)}
        tone={batch.summary.versionConflictCount > 0 ? "warn" : "neutral"}
      />
      <Metric
        label="失败"
        value={String(batch.summary.failureCount)}
        tone={batch.summary.failureCount > 0 ? "bad" : "neutral"}
      />
      <Metric
        label="实际扣减"
        value={formatAmount(batch.summary.actualDeductionMinor)}
      />
      <Metric
        label="扣减偏差"
        value={formatSignedAmount(deductionDriftMinor)}
        tone={deductionDriftMinor === 0 ? "good" : deductionDriftMinor === null ? "neutral" : "bad"}
      />
    </section>
  );
}

function Metric({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "good" | "bad" | "warn" | "info";
}) {
  const toneClass = {
    neutral: "text-[#26372e]",
    good: "text-[#287a59]",
    bad: "text-[#b23b41]",
    warn: "text-[#9a641b]",
    info: "text-[#486d99]",
  }[tone];

  return (
    <div className="border-b border-r border-[#e1e8e4] px-3 py-3 sm:px-4">
      <div className="text-[8px] font-black text-[#87938d]">{label}</div>
      <div className={`mt-1 font-mono text-sm font-black ${toneClass}`}>{value}</div>
    </div>
  );
}

type ConcurrencyLane = {
  item: GachaConcurrencyRequestResult;
  trace: GachaConcurrencyTrace;
  offsetPercent: number;
  widthPercent: number;
  reusedEvent: boolean;
};

function RequestLane({
  lane,
  onLoad,
}: {
  lane: ConcurrencyLane;
  onLoad: () => void;
}) {
  const item = lane.item;

  return (
    <article className="px-4 py-3 sm:px-6">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-black text-[#5f6d65]">
              #{String(item.sequence).padStart(2, "0")}
            </span>
            <OutcomeBadge item={item} />
            {lane.reusedEvent ? (
              <span className="border border-[#b8cadf] bg-[#f3f7fb] px-1.5 py-0.5 text-[8px] font-black text-[#486d99]">
                Event 复用
              </span>
            ) : null}
            <span className="font-mono text-[9px] font-bold text-[#77847d]">
              {item.durationMs}ms
            </span>
            <span className="min-w-0 truncate font-mono text-[9px] text-[#939e98]" title={item.requestId}>
              {item.requestId}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[8px] font-bold text-[#89958f]">
            <span>HTTP {item.httpStatus ?? "--"}</span>
            <span>EVENT {shortId(item.eventId)}</span>
            <span>STATE {item.stateVersion ?? "--"}</span>
            <span>{item.audit ? "AUDIT 实测" : "AUDIT 待同步"}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onLoad}
          className="flex h-8 items-center justify-center gap-1.5 border border-[#b9cbc2] bg-[#edf6f2] px-3 text-[9px] font-black text-[#2f6752] transition hover:border-[#71917f] hover:text-[#1f372c]"
        >
          <Workflow className="size-3" />
          载入主拓扑
        </button>
      </div>

      <div className="mt-3 h-2 overflow-hidden bg-[#edf1ef]" aria-label={`请求 ${item.sequence} 执行时段`}>
        <div
          className={`h-full min-w-1 ${item.ok ? "bg-[#55a980]" : "bg-[#d95d63]"}`}
          style={{
            marginLeft: `${lane.offsetPercent}%`,
            width: `${lane.widthPercent}%`,
          }}
        />
      </div>

      <div className="mt-3 overflow-x-auto pb-1">
        <div className="flex min-w-[930px] items-center">
          {FLOW_PREFIX.map((nodeId) => (
            <div key={nodeId} className="contents">
              <NodeStep
                nodeId={nodeId}
                status={lane.trace.run.nodes[nodeId].status}
                failed={lane.trace.run.failedNodeId === nodeId}
              />
              <ChevronRight className="mx-1 size-3 shrink-0 text-[#a4afa9]" />
            </div>
          ))}
          <div
            className="flex shrink-0 gap-1 border-y border-[#d7dfdb] bg-[#f8faf9] p-1"
            title="Gacha Engine 并列依赖"
          >
            {GACHA_DEPENDENCIES.map((nodeId) => (
              <NodeStep
                key={nodeId}
                nodeId={nodeId}
                status={lane.trace.run.nodes[nodeId].status}
                failed={lane.trace.run.failedNodeId === nodeId}
                compact
              />
            ))}
          </div>
          <ChevronRight className="mx-1 size-3 shrink-0 text-[#a4afa9]" />
          {FLOW_SUFFIX.map((nodeId, index) => (
            <div key={nodeId} className="contents">
              <NodeStep
                nodeId={nodeId}
                status={lane.trace.run.nodes[nodeId].status}
                failed={lane.trace.run.failedNodeId === nodeId}
              />
              {index < FLOW_SUFFIX.length - 1 ? (
                <ChevronRight className="mx-1 size-3 shrink-0 text-[#a4afa9]" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function OutcomeBadge({ item }: { item: GachaConcurrencyRequestResult }) {
  if (item.ok) {
    return (
      <span className="inline-flex items-center gap-1 border border-[#abd2bf] bg-[#eef8f3] px-1.5 py-0.5 text-[8px] font-black text-[#287a59]">
        <CheckCircle2 className="size-2.5" />
        成功
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 border border-[#e0a8ab] bg-[#fff1f1] px-1.5 py-0.5 font-mono text-[8px] font-black text-[#b23b41]">
      <TriangleAlert className="size-2.5" />
      {item.errorCode ?? "ERROR"}
    </span>
  );
}

function NodeStep({
  nodeId,
  status,
  failed,
  compact = false,
}: {
  nodeId: GachaTraceNodeId;
  status: TraceNodeStatus;
  failed: boolean;
  compact?: boolean;
}) {
  const tone = failed
    ? "border-[#d95d63] bg-[#fff0f0] text-[#aa3036]"
    : {
        success: "border-[#a9cdbb] bg-[#eef7f2] text-[#287457]",
        error: "border-[#d95d63] bg-[#fff0f0] text-[#aa3036]",
        waiting: "border-[#d7bd84] bg-[#fff8e8] text-[#8d5c1a]",
        running: "border-[#98c5cf] bg-[#eef8fa] text-[#2f7483]",
        skipped: "border-[#d7dfdb] bg-[#f4f6f5] text-[#89958f]",
        idle: "border-[#d7dfdb] bg-white text-[#89958f]",
      }[status];

  return (
    <div className={`flex h-8 shrink-0 items-center justify-center border px-1 text-center text-[8px] font-black ${compact ? "w-[62px]" : "w-[76px]"} ${tone}`}>
      {COMPACT_NODE_LABELS[nodeId]}
    </div>
  );
}

function buildLanes(batch: GachaConcurrencyBatch | null): ConcurrencyLane[] {
  if (!batch?.requests.length) {
    return [];
  }

  const starts = batch.requests.map((item) => Date.parse(item.startedAt));
  const finishes = batch.requests.map((item) => Date.parse(item.finishedAt));
  const windowStart = Math.min(...starts);
  const windowEnd = Math.max(...finishes);
  const windowDuration = Math.max(1, windowEnd - windowStart);
  const seenEvents = new Set<string>();

  return batch.requests.map((item, index) => {
    const startedAt = starts[index] ?? windowStart;
    const finishedAt = finishes[index] ?? startedAt;
    const reusedEvent = Boolean(item.eventId && seenEvents.has(item.eventId));
    if (item.eventId) {
      seenEvents.add(item.eventId);
    }

    return {
      item,
      trace: createGachaConcurrencyTrace({
        bannerId: batch.bannerId,
        count: batch.count,
        item,
      }),
      offsetPercent: Math.max(0, ((startedAt - windowStart) / windowDuration) * 100),
      widthPercent: Math.max(1, ((finishedAt - startedAt) / windowDuration) * 100),
      reusedEvent,
    };
  });
}

function shortId(value: string | null) {
  return value ? value.slice(0, 8) : "--";
}

function formatAmount(value: number | null) {
  return value === null ? "--" : value.toLocaleString("zh-CN");
}

function formatSignedAmount(value: number | null) {
  if (value === null) {
    return "--";
  }
  return `${value > 0 ? "+" : ""}${value.toLocaleString("zh-CN")}`;
}
