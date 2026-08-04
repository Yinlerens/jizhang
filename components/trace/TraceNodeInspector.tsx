"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GACHA_TRACE_NODE_DEFINITIONS,
  type GachaTraceNodeId,
  type GachaTraceRun,
} from "@/lib/trace/gacha-run";
import type { GachaReplayFrame } from "@/lib/trace/gacha-replay";

type InspectorTab = "overview" | "request" | "response";

export default function TraceNodeInspector({
  run,
  nodeId,
  replayFrame = null,
  open,
  onOpenChange,
}: {
  run: GachaTraceRun;
  nodeId: GachaTraceNodeId;
  replayFrame?: GachaReplayFrame | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<InspectorTab>("overview");
  const [copied, setCopied] = useState(false);
  const node = run.nodes[nodeId];
  const definition = GACHA_TRACE_NODE_DEFINITIONS[nodeId];

  const stableReference = run.operationId ?? run.requestId;
  const copyReference = async () => {
    if (!stableReference) {
      return;
    }
    await navigator.clipboard.writeText(stableReference);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="trace-node-inspector-dialog"
        className="gap-0 overflow-hidden border border-[#ccd8d2] bg-[#f8faf9] p-0 shadow-2xl"
        style={{
          width: "min(1120px, calc(100vw - 2rem))",
          maxWidth: "none",
          height: "min(760px, calc(100vh - 2rem))",
        }}
      >
        <div className="flex min-h-0 flex-col">
          <DialogHeader className="shrink-0 gap-0 border-b border-[#dde5e1] bg-white px-5 py-4 pr-16 sm:px-6 sm:py-5 sm:pr-16">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={`size-2.5 shrink-0 rounded-full ${statusDot(node.status)}`} />
                  <DialogTitle className="truncate text-base font-black tracking-normal text-[#17251e] normal-case sm:text-lg">
                    {definition.label}
                  </DialogTitle>
                </div>
                <DialogDescription className="mt-1 text-[11px] font-semibold text-[#75827b]">
                  {definition.role}
                </DialogDescription>
              </div>
              <span
                className={`mr-6 shrink-0 border px-2.5 py-1 text-[9px] font-black sm:mr-2 ${statusBadge(node.status)}`}
              >
                {statusLabel(node.status)}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 border border-[#dfe6e2] bg-[#f8faf9] sm:grid-cols-4">
              <Metric label="证据" value={evidenceLabel(node.evidence)} />
              <Metric label="流量" value={trafficLabel(definition.traffic)} />
              <Metric label="状态码" value={node.httpStatus === null ? "--" : String(node.httpStatus)} />
              <Metric label="耗时" value={node.durationMs === null ? "--" : `${node.durationMs} ms`} />
            </div>
          </DialogHeader>

          <div
            className="grid shrink-0 grid-cols-3 border-b border-[#dde5e1] bg-[#f3f6f4] p-1.5"
            role="tablist"
            aria-label="节点数据"
          >
            {(
              [
                ["overview", "概览"],
                ["request", "请求"],
                ["response", "响应"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                className={`h-9 text-[11px] font-black transition ${
                  tab === value
                    ? "bg-white text-[#1d3027] shadow-sm ring-1 ring-[#d7e0dc]"
                    : "text-[#6f7d75] hover:bg-white/70 hover:text-[#27382f]"
                }`}
                onClick={() => setTab(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-white px-4 py-4 sm:px-6 sm:py-5">
            {tab === "overview" ? (
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
                <div className="space-y-5">
                  <section>
                    <Label>当前结论</Label>
                    <p
                      className={`mt-1.5 text-sm font-bold leading-6 ${
                        node.status === "error" ? "text-[#b93138]" : "text-[#28362f]"
                      }`}
                    >
                      {node.summary}
                    </p>
                  </section>

                  {node.errorCode || node.errorMessage ? (
                    <section
                      className={`border-l-2 px-3 py-3 ${
                        node.status === "error"
                          ? "border-[#d4484e] bg-[#fff3f3]"
                          : "border-[#d69432] bg-[#fff8e9]"
                      }`}
                    >
                      <Label>{node.status === "error" ? "错误" : "等待原因"}</Label>
                      <div
                        className={`mt-1 font-mono text-[11px] font-bold ${
                          node.status === "error" ? "text-[#b93138]" : "text-[#8f5b16]"
                        }`}
                      >
                        {node.errorCode ?? "unknown_error"}
                      </div>
                      <p
                        className={`mt-1 text-xs font-semibold leading-5 ${
                          node.status === "error" ? "text-[#7f3b3f]" : "text-[#795b2d]"
                        }`}
                      >
                        {node.errorMessage}
                      </p>
                    </section>
                  ) : null}

                  {replayFrame && replayFrame.targetNodeId === nodeId ? (
                    <section className="border-t border-[#e2e8e5] pt-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <Label>当前重放数据包</Label>
                        <span className="font-mono text-[9px] font-black text-[#718078]">
                          第 {replayFrame.index + 1} 帧
                        </span>
                      </div>
                      <JsonPanel value={replayFrame.packet} emptyMessage="本帧没有可用数据包" />
                    </section>
                  ) : null}
                </div>

                <section className="space-y-3 border-t border-[#e2e8e5] pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
                  <KeyValue label="Run ID" value={run.runId} mono />
                  <div className="flex items-start justify-between gap-2">
                    <KeyValue label="Operation ID" value={run.operationId ?? "尚未生成"} mono />
                    <button
                      type="button"
                      className="mt-4 flex size-8 shrink-0 items-center justify-center border border-[#d6dfda] bg-white text-[#607068] transition hover:border-[#9baba3] hover:text-[#1d3027] disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={!stableReference}
                      onClick={() => void copyReference()}
                      title={run.operationId ? "复制 Operation ID" : "复制 Request ID"}
                      aria-label={run.operationId ? "复制 Operation ID" : "复制 Request ID"}
                    >
                      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                  <KeyValue label="Request ID" value={run.requestId ?? "未记录"} mono />
                  <KeyValue label="Event ID" value={run.eventId ?? "尚未生成"} mono />
                </section>
              </div>
            ) : (
              <JsonPanel
                value={tab === "request" ? node.request : node.response}
                emptyMessage={
                  run.status === "idle"
                    ? "发起抽卡后，这里会显示本次调用的数据包"
                    : `本节点尚未产生${tab === "request" ? "请求" : "响应"}数据包`
                }
                fill
              />
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-r border-[#e5eae7] px-2 py-2 last:border-r-0">
      <div className="text-[8px] font-black text-[#8a9690]">{label}</div>
      <div className="mt-0.5 truncate font-mono text-[9px] font-bold text-[#405048]">{value}</div>
    </div>
  );
}

function Label({ children }: { children: string }) {
  return <div className="text-[9px] font-black text-[#8a9690]">{children}</div>;
}

function KeyValue({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0 flex-1">
      <Label>{label}</Label>
      <div
        className={`mt-1 break-all text-[10px] font-semibold leading-4 text-[#46564d] ${mono ? "font-mono" : ""}`}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}

function JsonPanel({
  value,
  emptyMessage,
  fill = false,
}: {
  value: unknown | null;
  emptyMessage: string;
  fill?: boolean;
}) {
  if (value === null) {
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-[#ced8d3] bg-[#f8faf9] px-4 text-center text-[11px] font-bold text-[#89958f] ${
          fill ? "h-full min-h-72" : "min-h-36"
        }`}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <pre
      className={`overflow-auto border border-[#dbe3df] bg-[#f3f6f4] p-4 font-mono text-[11px] leading-5 text-[#27372f] ${
        fill ? "h-full min-h-72" : "max-h-[440px]"
      }`}
    >
      {safeJson(value)}
    </pre>
  );
}

function safeJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function statusLabel(status: GachaTraceRun["nodes"][GachaTraceNodeId]["status"]) {
  return {
    idle: "未执行",
    waiting: "等待中",
    running: "处理中",
    success: "已完成",
    error: "故障",
    skipped: "已跳过",
  }[status];
}

function statusDot(status: GachaTraceRun["nodes"][GachaTraceNodeId]["status"]) {
  return {
    idle: "bg-[#b8c2bd]",
    waiting: "animate-pulse bg-[#d69432]",
    running: "animate-pulse bg-[#287f92]",
    success: "bg-[#31956b]",
    error: "bg-[#d4484e]",
    skipped: "bg-[#c9d1cd]",
  }[status];
}

function statusBadge(status: GachaTraceRun["nodes"][GachaTraceNodeId]["status"]) {
  return {
    idle: "border-[#d4ddd8] bg-[#f2f5f3] text-[#748078]",
    waiting: "border-[#e6c78c] bg-[#fff8e9] text-[#9b651b]",
    running: "border-[#9bc1ca] bg-[#ebf7f9] text-[#236e80]",
    success: "border-[#a8d4bf] bg-[#edf8f2] text-[#287d59]",
    error: "border-[#e7a0a4] bg-[#fff0f0] text-[#b93138]",
    skipped: "border-[#d9dfdc] bg-[#f5f7f6] text-[#8b9690]",
  }[status];
}

function evidenceLabel(evidence: GachaTraceRun["nodes"][GachaTraceNodeId]["evidence"]) {
  return { observed: "实测", durable: "持久记录", derived: "路径判定", pending: "待确认" }[evidence];
}

function trafficLabel(traffic: (typeof GACHA_TRACE_NODE_DEFINITIONS)[GachaTraceNodeId]["traffic"]) {
  return { "north-south": "南北流量", "east-west": "东西流量", async: "异步流量" }[
    traffic
  ];
}
