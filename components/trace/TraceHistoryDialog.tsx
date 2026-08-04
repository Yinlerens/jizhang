"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import {
  GitCompareArrows,
  History,
  LoaderCircle,
  RefreshCw,
  Search,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";

import {
  compareHistoricalGachaTrace,
  loadGachaTraceHistory,
  loadHistoricalGachaTrace,
} from "@/app/gacha/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  GachaHistoricalTrace,
  GachaTraceComparison,
  GachaTraceHistoryEntry,
} from "@/lib/trace/gacha-history";

export default function TraceHistoryDialog({
  activeOperationId,
  playerId,
  open,
  onOpenChange,
  onTraceLoaded,
  onComparisonLoaded,
}: {
  activeOperationId: string | null;
  playerId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTraceLoaded: (trace: GachaHistoricalTrace) => void;
  onComparisonLoaded: (comparison: GachaTraceComparison) => void;
}) {
  const [entries, setEntries] = useState<GachaTraceHistoryEntry[]>([]);
  const [query, setQuery] = useState("");
  const [listError, setListError] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [workingOperationId, setWorkingOperationId] = useState<string | null>(null);
  const [isLoadingList, startListTransition] = useTransition();
  const [isLoadingTrace, startTraceTransition] = useTransition();
  const [isComparing, startCompareTransition] = useTransition();

  const refreshHistory = useCallback(() => {
    startListTransition(async () => {
      setListError("");
      const result = await loadGachaTraceHistory({ playerId });
      setHasLoaded(true);
      if (!result.ok) {
        setListError(result.message);
        return;
      }
      setEntries(result.entries);
    });
  }, [playerId]);

  useEffect(() => {
    if (!open || hasLoaded) {
      return;
    }
    refreshHistory();
  }, [hasLoaded, open, refreshHistory]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleEntries = useMemo(() => {
    if (!normalizedQuery) {
      return entries;
    }
    return entries.filter((entry) =>
      [operationIdOf(entry), entry.bannerId, entry.errorCode, entry.errorMessage]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery)),
    );
  }, [entries, normalizedQuery]);

  const loadTrace = (operationId: string) => {
    setWorkingOperationId(operationId);
    startTraceTransition(async () => {
      const result = await loadHistoricalGachaTrace({ operationId, playerId });
      setWorkingOperationId(null);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      onTraceLoaded(result.trace);
      onOpenChange(false);
      toast.success("抽卡记录已载入");
    });
  };

  const compareTrace = (operationId: string) => {
    setWorkingOperationId(operationId);
    startCompareTransition(async () => {
      const result = await compareHistoricalGachaTrace({ operationId, playerId });
      setWorkingOperationId(null);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      onComparisonLoaded(result.comparison);
      onOpenChange(false);
    });
  };

  const busy = isLoadingTrace || isComparing;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="trace-history-dialog"
        className="gap-0 overflow-hidden border border-[#ccd8d2] bg-white p-0 shadow-2xl"
        style={{
          width: "min(1120px, calc(100vw - 2rem))",
          maxWidth: "none",
          height: "min(760px, calc(100vh - 2rem))",
        }}
      >
        <div className="flex min-h-0 flex-col">
          <DialogHeader className="shrink-0 border-b border-[#dce4e0] bg-[#f8faf9] px-5 py-4 pr-16 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-[#cbd7d1] bg-white text-[#2f745d]">
                <History className="size-4" />
              </span>
              <div>
                <DialogTitle className="text-base font-black tracking-normal text-[#17251e] normal-case">
                  抽卡记录
                </DialogTitle>
                <DialogDescription className="sr-only">
                  载入持久化抽卡链路或与同卡池成功记录对比
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form
            className="grid shrink-0 gap-2 border-b border-[#e0e7e3] bg-white p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:px-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (query.trim()) {
                loadTrace(query.trim());
              }
            }}
          >
            <label className="relative min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#89958f]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-10 w-full border border-[#cbd7d1] bg-[#f8faf9] pl-9 pr-3 font-mono text-[11px] font-semibold text-[#26362e] outline-none transition focus:border-[#527d69]"
                placeholder="Operation ID / 卡池 ID / 错误码"
                aria-label="搜索抽卡记录"
              />
            </label>
            <button
              type="submit"
              disabled={!query.trim() || busy}
              className="flex h-10 items-center justify-center gap-2 bg-[#1f372c] px-4 text-[10px] font-black text-white transition hover:bg-[#294b3b] disabled:cursor-not-allowed disabled:bg-[#aebbb4]"
            >
              {isLoadingTrace && workingOperationId === query.trim() ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <Workflow className="size-3.5" />
              )}
              载入链路
            </button>
            <button
              type="button"
              onClick={refreshHistory}
              disabled={isLoadingList}
              className="flex size-10 items-center justify-center border border-[#cbd7d1] bg-white text-[#607068] transition hover:border-[#91a39a] hover:text-[#1f372c] disabled:opacity-50"
              title="刷新抽卡记录"
              aria-label="刷新抽卡记录"
            >
              <RefreshCw className={`size-3.5 ${isLoadingList ? "animate-spin" : ""}`} />
            </button>
          </form>

          <div className="min-h-0 flex-1 overflow-y-auto bg-[#f4f7f5] p-3 sm:p-5">
            {listError ? (
              <div className="border border-[#e4b1b4] bg-[#fff2f2] px-4 py-3 text-xs font-bold text-[#a93339]">
                {listError}
              </div>
            ) : isLoadingList && !entries.length ? (
              <div className="flex h-40 items-center justify-center gap-2 text-xs font-bold text-[#75827b]">
                <LoaderCircle className="size-4 animate-spin" />
                加载中
              </div>
            ) : visibleEntries.length ? (
              <div className="overflow-hidden border border-[#d5dfda] bg-white">
                <div className="hidden grid-cols-[150px_92px_minmax(160px,1fr)_84px_92px_176px] gap-3 border-b border-[#dce4e0] bg-[#f1f5f3] px-4 py-2 text-[9px] font-black text-[#77847d] md:grid">
                  <span>时间</span>
                  <span>结果</span>
                  <span>卡池 / Operation ID</span>
                  <span>抽数</span>
                  <span>耗时</span>
                  <span className="text-right">操作</span>
                </div>
                <div className="divide-y divide-[#e9eeeb]">
                  {visibleEntries.map((entry) => {
                    const operationId = operationIdOf(entry);
                    const working = workingOperationId === operationId && busy;
                    return (
                      <article
                        key={operationId}
                        className={`grid gap-3 px-4 py-3 transition md:grid-cols-[150px_92px_minmax(160px,1fr)_84px_92px_176px] md:items-center ${
                          operationId === activeOperationId ? "bg-[#edf6f2]" : "hover:bg-[#f8faf9]"
                        }`}
                      >
                        <div className="text-[10px] font-bold text-[#536159]">
                          {formatTimestamp(entry.startedAt)}
                        </div>
                        <OutcomeBadge entry={entry} />
                        <div className="min-w-0">
                          <div className="truncate text-[11px] font-black text-[#24332b]">
                            {entry.bannerId ?? "未知卡池"}
                          </div>
                          <div className="mt-0.5 truncate font-mono text-[9px] text-[#87938d]" title={operationId}>
                            {operationId}
                          </div>
                          {entry.errorCode ? (
                            <div className="mt-1 truncate font-mono text-[9px] font-bold text-[#b23b41]" title={entry.errorMessage ?? entry.errorCode}>
                              {entry.errorCode}
                            </div>
                          ) : null}
                        </div>
                        <div className="font-mono text-[10px] font-black text-[#5f6d65]">
                          {entry.count ? `${entry.count} 抽` : "--"}
                        </div>
                        <div className="font-mono text-[10px] font-black text-[#5f6d65]">
                          {formatDuration(entry.durationMs)}
                        </div>
                        <div className="flex justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => loadTrace(operationId)}
                            disabled={busy}
                            className="flex h-8 items-center gap-1.5 border border-[#cbd7d1] bg-white px-2.5 text-[9px] font-black text-[#52635a] transition hover:border-[#7f978b] hover:text-[#1f372c] disabled:opacity-40"
                          >
                            {working && isLoadingTrace ? (
                              <LoaderCircle className="size-3 animate-spin" />
                            ) : (
                              <Workflow className="size-3" />
                            )}
                            载入
                          </button>
                          <button
                            type="button"
                            onClick={() => compareTrace(operationId)}
                            disabled={busy || !entry.bannerId || !entry.count}
                            className="flex h-8 items-center gap-1.5 border border-[#b8cadf] bg-[#f3f7fb] px-2.5 text-[9px] font-black text-[#496486] transition hover:border-[#7896b8] hover:text-[#243f61] disabled:opacity-40"
                            title="与同卡池成功记录对比"
                          >
                            {working && isComparing ? (
                              <LoaderCircle className="size-3 animate-spin" />
                            ) : (
                              <GitCompareArrows className="size-3" />
                            )}
                            对比
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center border border-dashed border-[#cbd7d1] bg-white text-xs font-bold text-[#87938d]">
                没有匹配的抽卡记录
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function operationIdOf(entry: GachaTraceHistoryEntry) {
  return entry.operationId ?? entry.requestId ?? "";
}

function OutcomeBadge({ entry }: { entry: GachaTraceHistoryEntry }) {
  const tone = {
    success: "border-[#a7d1bd] bg-[#eef8f3] text-[#267a56]",
    error: "border-[#e4a8ab] bg-[#fff1f1] text-[#b1343a]",
    pending: "border-[#e3c384] bg-[#fff8e8] text-[#946016]",
  }[entry.outcome];
  const label = { success: "成功", error: "失败", pending: "未完成" }[entry.outcome];
  return (
    <span className={`inline-flex w-fit border px-2 py-1 text-[9px] font-black ${tone}`}>
      {entry.responseStatus ?? "--"} · {label}
    </span>
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Hong_Kong",
  }).format(date);
}

function formatDuration(value: number | null) {
  if (value === null) {
    return "--";
  }
  return value < 1_000 ? `${Math.round(value)} ms` : `${(value / 1_000).toFixed(2)} s`;
}
