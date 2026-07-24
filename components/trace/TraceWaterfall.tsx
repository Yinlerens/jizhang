"use client";

import { useEffect, useMemo, useState } from "react";

import {
  GACHA_TRACE_NODE_DEFINITIONS,
  GACHA_TRACE_NODE_ORDER,
  type GachaTraceRun,
  type TraceNodeSnapshot,
} from "@/lib/trace/gacha-run";

export default function TraceWaterfall({ run }: { run: GachaTraceRun }) {
  const [now, setNow] = useState(() => Date.now());
  const live = run.status === "running" || run.status === "waiting";

  useEffect(() => {
    if (!live) {
      return;
    }

    const timer = window.setInterval(() => setNow(Date.now()), 120);
    return () => window.clearInterval(timer);
  }, [live]);

  const endAt = run.finishedAt ?? now;
  const elapsedMs = run.status === "idle" ? 0 : Math.max(0, endAt - run.startedAt);
  const totalMs = Math.max(1, elapsedMs);
  const ticks = useMemo(() => [0, 0.25, 0.5, 0.75, 1], []);

  return (
    <section className="border-t border-[#d5dfda] bg-white" aria-label="调用耗时瀑布图">
      <div className="flex items-center justify-between border-b border-[#e0e7e3] px-4 py-2.5">
        <div>
          <h2 className="text-[11px] font-black text-[#19271f]">调用耗时</h2>
          <p className="mt-0.5 text-[10px] font-semibold text-[#77847d]">
            {formatDuration(elapsedMs)} 总可见时间
          </p>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold text-[#77847d]">
          <LegendDot className="bg-[#287f92]" label="实测" />
          <LegendDot className="border border-dashed border-[#8f9d96] bg-white" label="路径判定" />
        </div>
      </div>

      <div className="overflow-x-auto px-4 py-3">
        <div className="min-w-[620px]">
          <div className="grid grid-cols-[126px_minmax(420px,1fr)_66px] items-end gap-3 pb-1 text-[9px] font-bold text-[#8a9690]">
            <span>节点</span>
            <div className="relative h-4">
              {ticks.map((tick) => (
                <span
                  key={tick}
                  className="absolute -translate-x-1/2 font-mono"
                  style={{ left: `${tick * 100}%` }}
                >
                  {formatDuration(totalMs * tick)}
                </span>
              ))}
            </div>
            <span className="text-right">耗时</span>
          </div>

          <div className="divide-y divide-[#edf1ef]">
            {GACHA_TRACE_NODE_ORDER.map((nodeId) => {
              const node = run.nodes[nodeId];
              return (
                <WaterfallRow
                  key={nodeId}
                  node={node}
                  label={GACHA_TRACE_NODE_DEFINITIONS[nodeId].label}
                  runStartedAt={run.startedAt}
                  totalMs={totalMs}
                  now={now}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WaterfallRow({
  node,
  label,
  runStartedAt,
  totalMs,
  now,
}: {
  node: TraceNodeSnapshot;
  label: string;
  runStartedAt: number;
  totalMs: number;
  now: number;
}) {
  const hasObservedStart = node.startedAt !== null;
  const startAt = node.startedAt ?? runStartedAt;
  const liveEnd = node.status === "running" ? now : node.finishedAt;
  const hasObservedRange = hasObservedStart && liveEnd !== null;
  const startPercent = clampPercent(((startAt - runStartedAt) / totalMs) * 100);
  const widthPercent = hasObservedRange
    ? Math.max(0.8, clampPercent((((liveEnd ?? startAt) - startAt) / totalMs) * 100))
    : 0;

  return (
    <div className="grid h-7 grid-cols-[126px_minmax(420px,1fr)_66px] items-center gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className={`size-1.5 shrink-0 rounded-full ${statusDot(node.status)}`} />
        <span className="truncate text-[10px] font-bold text-[#435048]">{label}</span>
      </div>
      <div className="relative h-3 border-x border-[#edf1ef]">
        <div className="absolute inset-y-0 left-1/4 border-l border-[#edf1ef]" />
        <div className="absolute inset-y-0 left-1/2 border-l border-[#edf1ef]" />
        <div className="absolute inset-y-0 left-3/4 border-l border-[#edf1ef]" />
        {hasObservedRange ? (
          <div
            className={`absolute top-1/2 h-1.5 -translate-y-1/2 rounded-sm ${barTone(node.status)}`}
            style={{ left: `${startPercent}%`, width: `${widthPercent}%` }}
          />
        ) : node.status !== "idle" ? (
          <div
            className="absolute top-1/2 h-0 w-8 -translate-y-1/2 border-t border-dashed border-[#8f9d96]"
            style={{ left: `${Math.min(92, startPercent)}%` }}
          />
        ) : null}
      </div>
      <span className="text-right font-mono text-[9px] font-bold text-[#66736c]">
        {node.durationMs === null ? "--" : formatDuration(node.durationMs)}
      </span>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`size-2 rounded-sm ${className}`} />
      {label}
    </span>
  );
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function formatDuration(value: number) {
  const rounded = Math.max(0, Math.round(value));
  return rounded < 1_000 ? `${rounded} ms` : `${(rounded / 1_000).toFixed(2)} s`;
}

function statusDot(status: TraceNodeSnapshot["status"]) {
  return {
    idle: "bg-[#b8c2bd]",
    waiting: "animate-pulse bg-[#d69432]",
    running: "animate-pulse bg-[#287f92]",
    success: "bg-[#31956b]",
    error: "bg-[#d4484e]",
    skipped: "bg-[#c9d1cd]",
  }[status];
}

function barTone(status: TraceNodeSnapshot["status"]) {
  return {
    idle: "bg-[#b8c2bd]",
    waiting: "bg-[#d69432]",
    running: "bg-[#287f92]",
    success: "bg-[#31956b]",
    error: "bg-[#d4484e]",
    skipped: "bg-[#c9d1cd]",
  }[status];
}
