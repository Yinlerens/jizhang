"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

import {
  GACHA_TRACE_NODE_DEFINITIONS,
  type GachaTraceNodeId,
  type GachaTraceRun,
} from "@/lib/trace/gacha-run";

type InspectorTab = "overview" | "request" | "response";

export default function TraceNodeInspector({
  run,
  nodeId,
}: {
  run: GachaTraceRun;
  nodeId: GachaTraceNodeId;
}) {
  const [tab, setTab] = useState<InspectorTab>("overview");
  const [copied, setCopied] = useState(false);
  const node = run.nodes[nodeId];
  const definition = GACHA_TRACE_NODE_DEFINITIONS[nodeId];

  const copyRequestId = async () => {
    if (!run.requestId) {
      return;
    }
    await navigator.clipboard.writeText(run.requestId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_200);
  };

  return (
    <aside className="flex min-h-0 flex-col border-l border-[#d5dfda] bg-[#fbfcfb]">
      <div className="border-b border-[#dde5e1] px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${statusDot(node.status)}`} />
              <h2 className="truncate text-sm font-black text-[#17251e]">{definition.label}</h2>
            </div>
            <p className="mt-1 text-[10px] font-semibold text-[#75827b]">{definition.role}</p>
          </div>
          <span className={`shrink-0 border px-2 py-1 text-[9px] font-black ${statusBadge(node.status)}`}>
            {statusLabel(node.status)}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 border border-[#dfe6e2] bg-white">
          <Metric label="证据" value={evidenceLabel(node.evidence)} />
          <Metric label="状态码" value={node.httpStatus === null ? "--" : String(node.httpStatus)} />
          <Metric label="耗时" value={node.durationMs === null ? "--" : `${node.durationMs} ms`} />
        </div>
      </div>

      <div className="grid grid-cols-3 border-b border-[#dde5e1] bg-white p-1">
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
            className={`h-8 text-[10px] font-black transition ${
              tab === value ? "bg-[#1d3027] text-white" : "text-[#6f7d75] hover:bg-[#edf2ef]"
            }`}
            onClick={() => setTab(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {tab === "overview" ? (
          <div className="space-y-4">
            <section>
              <Label>当前结论</Label>
              <p className={`mt-1 text-sm font-bold leading-6 ${node.status === "error" ? "text-[#b93138]" : "text-[#28362f]"}`}>
                {node.summary}
              </p>
            </section>

            {node.errorCode || node.errorMessage ? (
              <section className="border-l-2 border-[#d4484e] bg-[#fff3f3] px-3 py-2.5">
                <Label>错误</Label>
                <div className="mt-1 font-mono text-[10px] font-bold text-[#b93138]">
                  {node.errorCode ?? "unknown_error"}
                </div>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#7f3b3f]">
                  {node.errorMessage}
                </p>
              </section>
            ) : null}

            <section className="space-y-2 border-t border-[#e2e8e5] pt-4">
              <KeyValue label="流量" value={trafficLabel(definition.traffic)} />
              <KeyValue label="Run ID" value={run.runId} mono />
              <div className="flex items-start justify-between gap-2">
                <KeyValue label="Request ID" value={run.requestId ?? "尚未生成"} mono />
                <button
                  type="button"
                  className="mt-4 flex size-7 shrink-0 items-center justify-center border border-[#d6dfda] bg-white text-[#607068] transition hover:border-[#9baba3] hover:text-[#1d3027] disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!run.requestId}
                  onClick={() => void copyRequestId()}
                  title="复制 Request ID"
                  aria-label="复制 Request ID"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                </button>
              </div>
              <KeyValue label="Event ID" value={run.eventId ?? "尚未生成"} mono />
            </section>
          </div>
        ) : (
          <JsonPanel value={tab === "request" ? node.request : node.response} />
        )}
      </div>

      {run.requestId ? (
        <a
          href={`/admin/gacha/audit-logs?request_id=${encodeURIComponent(run.requestId)}`}
          className="flex h-10 items-center justify-center gap-2 border-t border-[#dce4e0] bg-white text-[10px] font-black text-[#53635b] transition hover:bg-[#edf2ef] hover:text-[#1d3027]"
        >
          API 请求记录
          <ExternalLink className="size-3.5" />
        </a>
      ) : null}
    </aside>
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

function JsonPanel({ value }: { value: unknown | null }) {
  if (value === null) {
    return (
      <div className="flex min-h-36 items-center justify-center border border-dashed border-[#ced8d3] text-[10px] font-bold text-[#89958f]">
        暂无可展示数据
      </div>
    );
  }

  return (
    <pre className="max-h-[520px] overflow-auto border border-[#dbe3df] bg-[#17231d] p-3 font-mono text-[10px] leading-5 text-[#dce9e2]">
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
  return { observed: "实测", derived: "路径判定", pending: "待确认" }[evidence];
}

function trafficLabel(traffic: (typeof GACHA_TRACE_NODE_DEFINITIONS)[GachaTraceNodeId]["traffic"]) {
  return { "north-south": "南北流量", "east-west": "东西流量", async: "异步流量" }[
    traffic
  ];
}

