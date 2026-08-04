"use client";

import { ArrowDown, CheckCircle2, GitCompareArrows, TriangleAlert } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  GachaTraceComparison,
  GachaTraceHistoryEntry,
  GachaTraceNodeChange,
} from "@/lib/trace/gacha-history";
import type { TraceNodeStatus } from "@/lib/trace/gacha-run";

export default function TraceComparisonDialog({
  comparison,
  open,
  onOpenChange,
}: {
  comparison: GachaTraceComparison | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!comparison) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="trace-comparison-dialog"
        className="gap-0 overflow-hidden border border-[#ccd8d2] bg-white p-0 shadow-2xl"
        style={{
          width: "min(1180px, calc(100vw - 2rem))",
          maxWidth: "none",
          height: "min(800px, calc(100vh - 2rem))",
        }}
      >
        <div className="flex min-h-0 flex-col">
          <DialogHeader className="shrink-0 border-b border-[#dce4e0] bg-[#f8faf9] px-5 py-4 pr-16 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-[#b8cadf] bg-white text-[#496486]">
                <GitCompareArrows className="size-4" />
              </span>
              <div>
                <DialogTitle className="text-base font-black tracking-normal text-[#17251e] normal-case">
                  调用对比
                </DialogTitle>
                <DialogDescription className="sr-only">
                  失败调用与同卡池成功调用的节点和数据包差异
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto bg-[#f4f7f5]">
            <section className="grid border-b border-[#dce4e0] bg-white lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)]">
              <CallSummary label="成功基线" entry={comparison.baseline} />
              <div className="hidden items-center justify-center border-x border-[#e3e9e6] text-[#819088] lg:flex">
                <ArrowDown className="size-4 -rotate-90" />
              </div>
              <CallSummary label="目标调用" entry={comparison.target} target />
            </section>

            <section className="grid border-b border-[#dce4e0] bg-[#f8faf9] sm:grid-cols-3">
              <Metric
                label="耗时变化"
                value={formatDelta(comparison.durationDeltaMs)}
                tone={comparison.durationDeltaMs !== null && comparison.durationDeltaMs > 0 ? "bad" : "neutral"}
              />
              <Metric label="节点差异" value={String(comparison.nodeChanges.length)} tone="neutral" />
              <Metric label="数据包字段差异" value={String(comparison.packetChanges.length)} tone="neutral" />
            </section>

            <section className="border-b border-[#dce4e0] bg-white px-4 py-4 sm:px-6">
              <SectionHeading title="节点差异" count={comparison.nodeChanges.length} />
              {comparison.nodeChanges.length ? (
                <div className="mt-3 overflow-hidden border border-[#d8e1dc]">
                  <div className="hidden grid-cols-[150px_minmax(0,1fr)_44px_minmax(0,1fr)] gap-3 border-b border-[#dfe7e3] bg-[#f3f6f4] px-4 py-2 text-[9px] font-black text-[#7b8881] sm:grid">
                    <span>节点</span>
                    <span>成功基线</span>
                    <span />
                    <span>目标调用</span>
                  </div>
                  <div className="divide-y divide-[#e9eeeb]">
                    {comparison.nodeChanges.map((change) => (
                      <NodeChangeRow key={change.nodeId} change={change} />
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyDiff />
              )}
            </section>

            <section className="bg-white px-4 py-4 sm:px-6">
              <SectionHeading title="数据包差异" count={comparison.packetChanges.length} />
              {comparison.packetChanges.length ? (
                <div className="mt-3 overflow-hidden border border-[#d8e1dc]">
                  <div className="hidden grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-[#dfe7e3] bg-[#f3f6f4] px-4 py-2 text-[9px] font-black text-[#7b8881] md:grid">
                    <span>字段</span>
                    <span>成功基线</span>
                    <span>目标调用</span>
                  </div>
                  <div className="divide-y divide-[#e9eeeb]">
                    {comparison.packetChanges.map((change) => (
                      <div
                        key={change.path}
                        className="grid gap-2 px-4 py-3 md:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)] md:gap-3"
                      >
                        <div className="break-all font-mono text-[10px] font-black text-[#405048]">
                          {change.path}
                        </div>
                        <DiffValue value={change.baselineValue} tone="baseline" />
                        <DiffValue value={change.targetValue} tone="target" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyDiff />
              )}
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CallSummary({
  label,
  entry,
  target = false,
}: {
  label: string;
  entry: GachaTraceHistoryEntry;
  target?: boolean;
}) {
  const Icon = entry.outcome === "success" ? CheckCircle2 : TriangleAlert;
  return (
    <div className="min-w-0 px-5 py-4 sm:px-6">
      <div className={`flex items-center gap-2 text-[9px] font-black ${target ? "text-[#a63339]" : "text-[#267a56]"}`}>
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-[10px] font-black text-[#26362e]">
          {entry.responseStatus ?? "--"}
        </span>
        <span className="text-[10px] font-bold text-[#58665e]">
          {entry.bannerId ?? "未知卡池"} · {entry.count ?? "--"} 抽
        </span>
        <span className="font-mono text-[10px] font-bold text-[#738078]">
          {formatDuration(entry.durationMs)}
        </span>
      </div>
      <div
        className="mt-2 truncate font-mono text-[9px] text-[#87938d]"
        title={entry.operationId ?? entry.requestId ?? "未记录"}
      >
        {entry.operationId ?? entry.requestId ?? "未记录"}
      </div>
      {entry.errorCode ? (
        <div className="mt-2 truncate font-mono text-[10px] font-black text-[#b1343a]" title={entry.errorMessage ?? entry.errorCode}>
          {entry.errorCode}
        </div>
      ) : null}
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "bad" | "neutral";
}) {
  return (
    <div className="border-b border-[#e3e9e6] px-5 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="text-[9px] font-black text-[#849089]">{label}</div>
      <div className={`mt-1 font-mono text-sm font-black ${tone === "bad" ? "text-[#b1343a]" : "text-[#27372f]"}`}>
        {value}
      </div>
    </div>
  );
}

function SectionHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-[11px] font-black text-[#1c2d24]">{title}</h3>
      <span className="font-mono text-[9px] font-black text-[#85918b]">{count}</span>
    </div>
  );
}

function NodeChangeRow({ change }: { change: GachaTraceNodeChange }) {
  return (
    <div className="grid gap-2 px-4 py-3 sm:grid-cols-[150px_minmax(0,1fr)_44px_minmax(0,1fr)] sm:items-center sm:gap-3">
      <div className="text-[10px] font-black text-[#304139]">{change.label}</div>
      <NodeState
        status={change.baselineStatus}
        errorCode={change.baselineErrorCode}
        durationMs={change.baselineDurationMs}
      />
      <ArrowDown className="hidden size-3.5 -rotate-90 justify-self-center text-[#87938d] sm:block" />
      <NodeState
        status={change.targetStatus}
        errorCode={change.targetErrorCode}
        durationMs={change.targetDurationMs}
        target
      />
    </div>
  );
}

function NodeState({
  status,
  errorCode,
  durationMs,
  target = false,
}: {
  status: TraceNodeStatus;
  errorCode: string | null;
  durationMs: number | null;
  target?: boolean;
}) {
  return (
    <div className={`min-w-0 border px-3 py-2 ${target ? "border-[#ead0d1] bg-[#fff6f6]" : "border-[#d3e4dc] bg-[#f2f9f5]"}`}>
      <div className="flex min-w-0 items-center justify-between gap-2">
        <span className={`text-[9px] font-black ${statusTone(status)}`}>{statusLabel(status)}</span>
        <span className="shrink-0 font-mono text-[9px] text-[#748078]">{formatDuration(durationMs)}</span>
      </div>
      {errorCode ? (
        <div className="mt-1 truncate font-mono text-[9px] font-bold text-[#b1343a]" title={errorCode}>
          {errorCode}
        </div>
      ) : null}
    </div>
  );
}

function DiffValue({ value, tone }: { value: string; tone: "baseline" | "target" }) {
  return (
    <div
      className={`min-w-0 break-all border px-3 py-2 font-mono text-[10px] leading-4 ${
        tone === "baseline"
          ? "border-[#d3e4dc] bg-[#f2f9f5] text-[#31634d]"
          : "border-[#ead0d1] bg-[#fff6f6] text-[#8f3035]"
      }`}
    >
      {value}
    </div>
  );
}

function EmptyDiff() {
  return (
    <div className="mt-3 flex h-20 items-center justify-center border border-dashed border-[#cdd8d2] bg-[#f8faf9] text-[10px] font-bold text-[#87938d]">
      无差异
    </div>
  );
}

function formatDuration(value: number | null) {
  if (value === null) {
    return "--";
  }
  return value < 1_000 ? `${Math.round(value)} ms` : `${(value / 1_000).toFixed(2)} s`;
}

function formatDelta(value: number | null) {
  if (value === null) {
    return "--";
  }
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${formatDuration(value)}`;
}

function statusLabel(status: TraceNodeStatus) {
  return {
    idle: "未执行",
    waiting: "等待中",
    running: "处理中",
    success: "已完成",
    error: "故障",
    skipped: "已跳过",
  }[status];
}

function statusTone(status: TraceNodeStatus) {
  return {
    idle: "text-[#75827b]",
    waiting: "text-[#966116]",
    running: "text-[#236e80]",
    success: "text-[#267a56]",
    error: "text-[#b1343a]",
    skipped: "text-[#87938d]",
  }[status];
}
