"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CirclePlay,
  History,
  LoaderCircle,
  MousePointerClick,
  Network,
  RadioTower,
  RefreshCw,
  RotateCcw,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";

import {
  drawGachaPull,
  loadGachaTraceAudit,
  loadSandboxInitialState,
  loadHistoricalGachaTrace,
  recoverGachaPull,
  syncGachaBackpackAfterPull,
  type BackpackSyncActionResult,
} from "./gacha/actions";
import KafkaTopicMonitor from "@/components/trace/KafkaTopicMonitor";
import TraceNodeInspector from "@/components/trace/TraceNodeInspector";
import TraceReplayControls from "@/components/trace/TraceReplayControls";
import TraceWaterfall from "@/components/trace/TraceWaterfall";
import { ASTRITE_PER_PULL } from "@/lib/gacha/simulator";
import type { Banner } from "@/lib/gacha/types";
import type { GatewayPullRecord } from "@/lib/gateway/gacha";
import type {
  GachaHistoricalTrace,
  GachaTraceComparison,
} from "@/lib/trace/gacha-history";
import type {
  GachaConcurrencyBatch,
  GachaConcurrencyTrace,
} from "@/lib/trace/gacha-concurrency";
import {
  KAFKA_MONITOR_CONSUMER_GROUP,
  KAFKA_MONITOR_TOPIC,
  mergeKafkaMonitorSignals,
  type KafkaMonitorMessage,
  type KafkaMonitorSignal,
} from "@/lib/trace/kafka-monitor";
import {
  createGachaTraceRun,
  reduceGachaTrace,
  type GachaTraceNodeId,
  type GachaTraceRun,
} from "@/lib/trace/gacha-run";
import { buildGachaReplayFrames } from "@/lib/trace/gacha-replay";

const GachaTraceCanvas = dynamic(() => import("@/components/trace/GachaTraceCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[920px] items-center justify-center bg-[#edf2ef] text-[#6f7d75] sm:min-h-[430px]">
      <LoaderCircle className="size-5 animate-spin" />
    </div>
  ),
});
const TraceHistoryDialog = dynamic(() => import("@/components/trace/TraceHistoryDialog"));
const TraceConcurrencyDialog = dynamic(() => import("@/components/trace/TraceConcurrencyDialog"));
const TraceComparisonDialog = dynamic(
  () => import("@/components/trace/TraceComparisonDialog"),
);

type SandboxTraceLabProps = {
  banners: Banner[];
  initialOperationId?: string;
  initialPlayerId?: string;
};

type DisplayPullResult = {
  id: string;
  itemId: string;
  itemName: string;
  rarity: 3 | 4 | 5;
  isFeatured: boolean;
};

type PendingOperation = {
  bannerId: string;
  count: 1 | 10;
  idempotencyKey: string;
};

const PENDING_OPERATION_KEY = "gachaops:trace-lab:pending-pull:v1";

export default function SandboxTraceLab({
  banners,
  initialOperationId,
  initialPlayerId,
}: SandboxTraceLabProps) {
  const [activeBannerId, setActiveBannerId] = useState(banners[0]?.id ?? "");
  const [pullCount, setPullCount] = useState<1 | 10>(10);
  const [isPulling, setIsPulling] = useState(false);
  const [checkingBackpackRunIds, setCheckingBackpackRunIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [balanceMinor, setBalanceMinor] = useState<number>();
  const [pendingOperation, setPendingOperation] = useState<PendingOperation | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<GachaTraceNodeId>("gateway");
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isConcurrencyOpen, setIsConcurrencyOpen] = useState(false);
  const [hasOpenedConcurrency, setHasOpenedConcurrency] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isLoadingInitialTrace, setIsLoadingInitialTrace] = useState(
    Boolean(initialOperationId),
  );
  const [comparison, setComparison] = useState<GachaTraceComparison | null>(null);
  const [traceSource, setTraceSource] = useState<"live" | "history" | "concurrency">("live");
  const [results, setResults] = useState<DisplayPullResult[]>([]);
  const [kafkaMessages, setKafkaMessages] = useState<KafkaMonitorMessage[]>([]);
  const hasStartedPullRef = useRef(false);
  const initialOperationLoadedRef = useRef(false);
  const [run, setRun] = useState<GachaTraceRun>(() =>
    createGachaTraceRun({
      runId: "waiting-for-first-run",
      bannerId: banners[0]?.id ?? "",
      count: 10,
      startedAt: 0,
    }),
  );
  const activeRunIdRef = useRef(run.runId);
  const backpackChecksRef = useRef(new Set<string>());
  const [replayFrameIndex, setReplayFrameIndex] = useState(-1);
  const [isReplayPlaying, setIsReplayPlaying] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState(1);

  const bannersById = useMemo(
    () => new Map(banners.map((banner) => [banner.id, banner])),
    [banners],
  );
  const activeBanner = bannersById.get(activeBannerId) ?? banners[0];
  const traceBannerLabel = bannersById.get(run.bannerId)?.name ?? run.bannerId ?? "未知卡池";
  const requiredBalance = pullCount * ASTRITE_PER_PULL;
  const balanceKnown = typeof balanceMinor === "number";
  const insufficientBalance = balanceKnown && balanceMinor < requiredBalance;
  const recoverableOperation =
    pendingOperation &&
    activeBanner &&
    pendingOperation.bannerId === activeBanner.id &&
    pendingOperation.count === pullCount
      ? pendingOperation
      : null;
  const isCheckingBackpack = checkingBackpackRunIds.has(run.runId);
  const canPull =
    Boolean(activeBanner) &&
    !isPulling &&
    (!insufficientBalance || Boolean(recoverableOperation));
  const replayFrames = useMemo(
    () => (run.status === "idle" || run.status === "running" ? [] : buildGachaReplayFrames(run)),
    [run],
  );
  const activeReplayFrame = replayFrameIndex >= 0 ? replayFrames[replayFrameIndex] ?? null : null;
  const replayDurationMs = Math.round(900 / replaySpeed);

  useEffect(() => {
    let cancelled = false;
    const frameId = window.requestAnimationFrame(() => {
      if (!cancelled) {
        setPendingOperation(readPendingOperation());
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    void loadSandboxInitialState().then((result) => {
      if (cancelled || !result.ok || hasStartedPullRef.current) {
        return;
      }
      setBalanceMinor(result.balanceMinor);
      setResults(result.history);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReplayPlaying || replayFrameIndex < 0 || replayFrames.length === 0) {
      return;
    }

    const timerId = window.setTimeout(() => {
      if (replayFrameIndex >= replayFrames.length - 1) {
        setIsReplayPlaying(false);
        return;
      }
      setReplayFrameIndex(replayFrameIndex + 1);
    }, replayDurationMs);

    return () => window.clearTimeout(timerId);
  }, [isReplayPlaying, replayDurationMs, replayFrameIndex, replayFrames.length]);

  const recordKafkaSignals = useCallback((signals: KafkaMonitorSignal[]) => {
    if (!signals.length) {
      return;
    }
    setKafkaMessages((current) => mergeKafkaMonitorSignals(current, signals));
  }, []);

  const replayTargetNodeId = activeReplayFrame?.targetNodeId;
  useEffect(() => {
    if (!replayTargetNodeId) {
      return;
    }
    const frameId = window.requestAnimationFrame(() => setSelectedNodeId(replayTargetNodeId));
    return () => window.cancelAnimationFrame(frameId);
  }, [replayTargetNodeId]);

  const checkBackpack = async (runId: string, eventId: string, manual = false) => {
    if (backpackChecksRef.current.has(runId)) {
      return;
    }

    backpackChecksRef.current.add(runId);
    setCheckingBackpackRunIds((current) => new Set(current).add(runId));
    try {
      const backpack = await syncGachaBackpackAfterPull({ eventId });
      setRun((current) => {
        if (current.runId !== runId) {
          return current;
        }

        if (backpack.ok) {
          return reduceGachaTrace(current, {
            type: "backpack_succeeded",
            at: currentTimestamp(),
            result: mapBackpackTraceResult(backpack),
          });
        }
        if (backpack.state === "pending") {
          return reduceGachaTrace(current, {
            type: "backpack_pending",
            at: currentTimestamp(),
            attempts: backpack.attempts,
            retryAfterMs: backpack.retryAfterMs,
            message: backpack.message,
          });
        }
        return reduceGachaTrace(current, {
          type: "backpack_failed",
          at: currentTimestamp(),
          code: backpack.code,
          httpStatus: backpack.httpStatus,
          message: backpack.message,
        });
      });

      if (activeRunIdRef.current !== runId) {
        return;
      }

      if (backpack.ok) {
        recordKafkaSignals([
          {
            requestId: null,
            eventId: backpack.event.event_id,
            stage: "consumed",
            at: backpack.event.received_at,
            stateVersion: backpack.event.state_version,
            errorCode: null,
            payload: {
              topic: KAFKA_MONITOR_TOPIC,
              consumer_group: KAFKA_MONITOR_CONSUMER_GROUP,
              event_id: backpack.event.event_id,
              event_type: backpack.event.event_type,
              banner_id: backpack.event.banner_id,
              state_version: backpack.event.state_version,
              previous_pity: backpack.event.previous_pity,
              next_pity: backpack.event.next_pity,
              received_at: backpack.event.received_at,
              record_count: backpack.eventRecords.length,
            },
          },
        ]);
        setSelectedNodeId("backpack-db");
        if (manual) {
          toast.success("Backpack 已消费事件，背包与抽卡记录已确认。");
        }
      } else if (backpack.state === "pending") {
        setSelectedNodeId("backpack");
        toast.warning(backpack.message);
      } else {
        setSelectedNodeId("backpack");
        toast.error(backpack.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Backpack 检查失败，请稍后重试。";
      setRun((current) =>
        current.runId === runId
          ? reduceGachaTrace(current, {
              type: "backpack_failed",
              at: currentTimestamp(),
              code: "backpack_sync_failed",
              message,
            })
          : current,
      );
      if (activeRunIdRef.current === runId) {
        setSelectedNodeId("backpack");
        toast.error(message);
      }
    } finally {
      backpackChecksRef.current.delete(runId);
      setCheckingBackpackRunIds((current) => {
        const next = new Set(current);
        next.delete(runId);
        return next;
      });
    }
  };

  const toggleReplay = () => {
    if (!replayFrames.length) {
      return;
    }
    if (isReplayPlaying) {
      setIsReplayPlaying(false);
      return;
    }
    if (replayFrameIndex < 0 || replayFrameIndex >= replayFrames.length - 1) {
      setReplayFrameIndex(0);
    }
    setIsReplayPlaying(true);
  };

  const restartReplay = () => {
    if (!replayFrames.length) {
      return;
    }
    setReplayFrameIndex(0);
    setIsReplayPlaying(true);
  };

  const seekReplay = (index: number) => {
    setIsReplayPlaying(false);
    setReplayFrameIndex(index);
  };

  const openNodeInspector = useCallback((nodeId: GachaTraceNodeId) => {
    setIsReplayPlaying(false);
    setSelectedNodeId(nodeId);
    setIsInspectorOpen(true);
  }, []);

  const loadHistoricalTrace = useCallback(
    (trace: GachaHistoricalTrace) => {
      hasStartedPullRef.current = true;
      activeRunIdRef.current = trace.run.runId;
      setRun(trace.run);
      setResults(trace.results);
      setSelectedNodeId(trace.run.failedNodeId ?? "gateway");
      setReplayFrameIndex(-1);
      setIsReplayPlaying(false);
      setIsInspectorOpen(false);
      setTraceSource("history");
      if (trace.entry.bannerId && bannersById.has(trace.entry.bannerId)) {
        setActiveBannerId(trace.entry.bannerId);
      }
      if (trace.entry.count) {
        setPullCount(trace.entry.count);
      }
    },
    [bannersById],
  );

  const loadConcurrencyTrace = useCallback(
    (trace: GachaConcurrencyTrace) => {
      hasStartedPullRef.current = true;
      activeRunIdRef.current = trace.run.runId;
      setRun(trace.run);
      setResults(trace.results);
      setSelectedNodeId(trace.run.failedNodeId ?? "gateway");
      setReplayFrameIndex(-1);
      setIsReplayPlaying(false);
      setIsInspectorOpen(false);
      setTraceSource("concurrency");
      if (bannersById.has(trace.run.bannerId)) {
        setActiveBannerId(trace.run.bannerId);
      }
      setPullCount(trace.run.count);
    },
    [bannersById],
  );

  const recordConcurrencyBatch = useCallback(
    (batch: GachaConcurrencyBatch) => {
      const signals = batch.requests.flatMap((item): KafkaMonitorSignal[] => {
        if (item.ok && item.eventId) {
          return [
            {
              requestId: item.requestId,
              eventId: item.eventId,
              stage: "published",
              at: item.finishedAt,
              stateVersion: item.stateVersion,
              errorCode: null,
              payload: {
                topic: KAFKA_MONITOR_TOPIC,
                producer: "gacha-engine",
                event_id: item.eventId,
                event_type: KAFKA_MONITOR_TOPIC,
                request_id: item.requestId,
                banner_id: batch.bannerId,
                state_version: item.stateVersion,
                next_pity: item.nextPity ?? null,
                records: item.records,
              },
            },
          ];
        }

        if (!item.ok && item.errorCode === "kafka_unavailable") {
          return [
            {
              requestId: item.requestId,
              eventId: null,
              stage: "publish_failed",
              at: item.finishedAt,
              stateVersion: null,
              errorCode: item.errorCode,
              payload: {
                topic: KAFKA_MONITOR_TOPIC,
                producer: "gacha-engine",
                request_id: item.requestId,
                banner_id: batch.bannerId,
                count: batch.count,
                error: {
                  code: item.errorCode,
                  message: item.errorMessage,
                },
              },
            },
          ];
        }

        return [];
      });

      recordKafkaSignals(signals);
    },
    [recordKafkaSignals],
  );

  const openComparison = useCallback((nextComparison: GachaTraceComparison) => {
    setComparison(nextComparison);
    setIsComparisonOpen(true);
  }, []);

  useEffect(() => {
    if (!initialOperationId || initialOperationLoadedRef.current) {
      return;
    }

    initialOperationLoadedRef.current = true;
    setIsLoadingInitialTrace(true);
    void loadHistoricalGachaTrace({
      operationId: initialOperationId,
      playerId: initialPlayerId,
    }).then((result) => {
      setIsLoadingInitialTrace(false);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      loadHistoricalTrace(result.trace);
      toast.success("抽卡记录已载入");
    });
  }, [initialOperationId, initialPlayerId, loadHistoricalTrace]);

  const executePull = async () => {
    if (!activeBanner || isPulling) {
      return;
    }

    const storedOperation = pendingOperation ?? readPendingOperation();
    if (
      storedOperation &&
      (storedOperation.bannerId !== activeBanner.id || storedOperation.count !== pullCount)
    ) {
      setPendingOperation(storedOperation);
      toast.warning("上一笔抽卡仍待确认，请切回原卡池和抽数后重试。");
      return;
    }

    const isRecovery = Boolean(storedOperation);
    if (insufficientBalance && !isRecovery) {
      toast.warning("演示资源不足，请先补充资源。");
      return;
    }

    const operation: PendingOperation =
      storedOperation ?? {
        bannerId: activeBanner.id,
        count: pullCount,
        idempotencyKey: crypto.randomUUID(),
      };
    const requestId = crypto.randomUUID();
    const runId = crypto.randomUUID();
    const startedAt = currentTimestamp();
    const initialRun = reduceGachaTrace(
      createGachaTraceRun({
        runId,
        bannerId: activeBanner.id,
        count: pullCount,
        startedAt,
      }),
      {
        type: "request_started",
        at: startedAt,
        requestId,
        idempotencyKey: operation.idempotencyKey,
      },
    );

    savePendingOperation(operation);
    hasStartedPullRef.current = true;
    setPendingOperation(operation);
    setReplayFrameIndex(-1);
    setIsReplayPlaying(false);
    setIsInspectorOpen(false);
    setTraceSource("live");
    activeRunIdRef.current = runId;
    setRun(initialRun);
    setSelectedNodeId("next");
    setIsPulling(true);

    try {
      const pullAction = isRecovery ? recoverGachaPull : drawGachaPull;
      const result = await pullAction({
        bannerId: operation.bannerId,
        count: operation.count,
        idempotencyKey: operation.idempotencyKey,
        requestId,
      });
      const completedAt = currentTimestamp();

      if (!result.ok) {
        const failedRun = reduceGachaTrace(initialRun, {
          type: "pull_failed",
          at: completedAt,
          requestId: result.requestId,
          code: result.code,
          message: result.message,
        });
        setRun(failedRun);
        setSelectedNodeId(failedRun.failedNodeId ?? "gacha");

        if (result.code === "kafka_unavailable") {
          recordKafkaSignals([
            {
              requestId: result.requestId,
              eventId: null,
              stage: "publish_failed",
              at: new Date(completedAt).toISOString(),
              stateVersion: null,
              errorCode: result.code,
              payload: {
                topic: KAFKA_MONITOR_TOPIC,
                producer: "gacha-engine",
                request_id: result.requestId,
                banner_id: operation.bannerId,
                count: operation.count,
                error: { code: result.code, message: result.message },
              },
            },
          ]);
        }
        if (result.preserveOperation) {
          savePendingOperation(operation);
          setPendingOperation(operation);
        } else {
          clearPendingOperation();
          setPendingOperation(null);
        }
        if (result.preserveOperation) {
          toast.warning(result.message);
        } else {
          toast.error(result.message);
        }
        void enrichRunWithAudit(runId, result.requestId);
        return;
      }

      clearPendingOperation();
      setPendingOperation(null);
      const pulledRun = reduceGachaTrace(initialRun, {
        type: "pull_succeeded",
        at: completedAt,
        requestId: result.requestId,
        eventId: result.eventId,
        result: {
          stateVersion: result.stateVersion,
          nextPity: result.nextPity,
          records: result.records.map(mapGatewayTraceRecord),
        },
      });
      recordKafkaSignals([
        {
          requestId: result.requestId,
          eventId: result.eventId,
          stage: "published",
          at: new Date(completedAt).toISOString(),
          stateVersion: result.stateVersion,
          errorCode: null,
          payload: {
            topic: KAFKA_MONITOR_TOPIC,
            producer: "gacha-engine",
            event_id: result.eventId,
            event_type: KAFKA_MONITOR_TOPIC,
            request_id: result.requestId,
            banner_id: operation.bannerId,
            state_version: result.stateVersion,
            next_pity: result.nextPity,
            records: result.records,
          },
        },
      ]);
      setRun(pulledRun);
      setSelectedNodeId("backpack");
      setResults(result.records.map(mapGatewayRecord));
      if (!isRecovery) {
        setBalanceMinor((current) =>
          typeof current === "number" ? Math.max(0, current - requiredBalance) : current,
        );
      }
      toast.success(`抽卡完成，获得 ${result.records.length} 项结果。`);

      void enrichRunWithAudit(runId, result.requestId);
      void checkBackpack(runId, result.eventId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "抽卡请求状态未知。";
      const failedRun = reduceGachaTrace(initialRun, {
        type: "pull_failed",
        at: currentTimestamp(),
        requestId,
        code: "gateway_connection_failed",
        message,
      });
      setRun(failedRun);
      setSelectedNodeId(failedRun.failedNodeId ?? "gateway");
      savePendingOperation(operation);
      setPendingOperation(operation);
      toast.warning(message);
    } finally {
      setIsPulling(false);
    }
  };

  const enrichRunWithAudit = async (runId: string, requestId: string) => {
    const audit = await loadGachaTraceAudit({ requestId });
    if (!audit.ok) {
      return;
    }
    setRun((current) =>
      current.runId === runId
        ? reduceGachaTrace(current, { type: "audit_loaded", audit: audit.audit })
        : current,
    );
  };

  const resetView = () => {
    if (isPulling || isCheckingBackpack) {
      return;
    }
    setReplayFrameIndex(-1);
    setIsReplayPlaying(false);
    setIsInspectorOpen(false);
    const resetRun = createGachaTraceRun({
      runId: "waiting-for-first-run",
      bannerId: activeBanner?.id ?? "",
      count: pullCount,
      startedAt: 0,
    });
    activeRunIdRef.current = resetRun.runId;
    setRun(resetRun);
    setResults([]);
    setSelectedNodeId("gateway");
    setTraceSource("live");
  };

  return (
    <main className="min-h-screen bg-[#f4f7f5] text-[#17251e]">
      <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-[#d3ddd8] bg-white px-4 py-2 text-[#17251e] lg:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/console"
            className="flex size-8 shrink-0 items-center justify-center border border-[#d4ded9] bg-[#f8faf9] text-[#66756d] transition hover:border-[#98aaa1] hover:text-[#1f372c]"
            title="返回控制台"
            aria-label="返回控制台"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Network className="size-4 text-[#2f8c68]" />
              <h1 className="truncate text-sm font-black">GachaOps Trace Lab</h1>
            </div>
            <p className="mt-0.5 truncate font-mono text-[9px] text-[#839088]">
              {run.operationId ?? run.requestId ?? "NO ACTIVE OPERATION"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RunStatus run={run} />
          <button
            type="button"
            onClick={() => {
              setHasOpenedConcurrency(true);
              setIsConcurrencyOpen(true);
            }}
            disabled={isPulling}
            className="flex h-8 items-center gap-2 border border-[#b8cadf] bg-[#f3f7fb] px-3 text-[10px] font-black text-[#486486] transition hover:border-[#7896b8] hover:text-[#243f61] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MousePointerClick className="size-3.5" />
            并发抽取
          </button>
          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            disabled={isLoadingInitialTrace}
            className="flex h-8 items-center gap-2 border border-[#b9cbc2] bg-[#edf6f2] px-3 text-[10px] font-black text-[#2f6752] transition hover:border-[#71917f] hover:text-[#1f372c] disabled:cursor-wait disabled:opacity-60"
          >
            {isLoadingInitialTrace ? (
              <LoaderCircle className="size-3.5 animate-spin" />
            ) : (
              <History className="size-3.5" />
            )}
            {isLoadingInitialTrace ? "载入中" : "抽卡记录"}
          </button>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[232px_minmax(620px,1fr)]">
        <aside className="border-b border-[#d4ded9] bg-[#f8faf9] xl:border-r xl:border-b-0">
          <div className="border-b border-[#dce4e0] px-4 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-black">抽卡请求</h2>
              <span className="font-mono text-[9px] font-bold text-[#819088]">POST</span>
            </div>

            <label className="mt-4 block">
              <span className="text-[9px] font-black text-[#7d8a83]">卡池</span>
              <select
                value={activeBannerId}
                onChange={(event) => setActiveBannerId(event.target.value)}
                disabled={isPulling}
                className="mt-1 h-10 w-full border border-[#cbd7d1] bg-white px-3 text-xs font-bold text-[#24332b] outline-none transition focus:border-[#527d69] disabled:opacity-60"
              >
                {banners.map((banner) => (
                  <option key={banner.id} value={banner.id}>
                    {banner.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-4">
              <span className="text-[9px] font-black text-[#7d8a83]">抽取次数</span>
              <div className="mt-1 grid grid-cols-2 border border-[#cbd7d1] bg-white p-1">
                {([1, 10] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`h-8 text-xs font-black transition ${
                      pullCount === value
                        ? "bg-[#1f372c] text-white"
                        : "text-[#64736b] hover:bg-[#edf2ef]"
                    }`}
                    onClick={() => setPullCount(value)}
                    disabled={isPulling}
                  >
                    {value === 1 ? "单抽" : "十连"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-y border-[#e0e7e3] py-3">
              <div className="flex items-center gap-2 text-[#65736c]">
                <WalletCards className="size-4" />
                <span className="text-[10px] font-bold">演示资源</span>
              </div>
              <span className="font-mono text-xs font-black text-[#223129]">
                {balanceKnown ? balanceMinor.toLocaleString("zh-CN") : "--"}
              </span>
            </div>

            {pendingOperation ? (
              <div
                className={`mt-3 border-l-2 px-3 py-2 text-[10px] font-bold leading-4 ${
                  recoverableOperation
                    ? "border-[#bd7a1f] bg-[#fff8e8] text-[#855716]"
                    : "border-[#8d9b94] bg-[#eef2f0] text-[#5d6c64]"
                }`}
                role="status"
              >
                {recoverableOperation
                  ? "上一笔结果待确认，可沿用原请求恢复。"
                  : `待恢复请求：${pendingOperation.count} 抽，请切回对应卡池。`}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => void executePull()}
              disabled={!canPull}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 bg-[#1f372c] text-xs font-black text-white transition hover:bg-[#294b3b] disabled:cursor-not-allowed disabled:bg-[#aebbb4]"
            >
              {isPulling ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : recoverableOperation ? (
                <RotateCcw className="size-4" />
              ) : (
                <CirclePlay className="size-4" />
              )}
              {isPulling
                ? "链路执行中"
                : recoverableOperation
                  ? "恢复上一笔"
                  : `开始${pullCount === 1 ? "单抽" : "十连"}`}
            </button>

            {insufficientBalance && !recoverableOperation ? (
              <Link
                href="/sandbox/resources"
                className="mt-2 flex h-9 items-center justify-center border border-[#d2dbd6] bg-white text-[10px] font-black text-[#5e6d65] transition hover:border-[#93a59c] hover:text-[#1f372c]"
              >
                补充演示资源
              </Link>
            ) : null}
          </div>

          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-black">本次结果</h2>
              <button
                type="button"
                onClick={resetView}
                disabled={isPulling || isCheckingBackpack}
                className="flex size-7 items-center justify-center border border-[#d5dfda] bg-white text-[#718078] transition hover:border-[#98a9a0] hover:text-[#26372e] disabled:opacity-40"
                title="清空当前视图"
                aria-label="清空当前视图"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>
            <div className="mt-3 max-h-[360px] space-y-1.5 overflow-y-auto">
              {results.length ? (
                results.map((result, index) => (
                  <ResultRow key={`${result.id}-${index}`} result={result} index={index} />
                ))
              ) : (
                <div className="flex h-24 items-center justify-center border border-dashed border-[#cad5cf] text-[10px] font-bold text-[#8a9690]">
                  暂无抽卡结果
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="min-w-0 bg-white">
          <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-[#d5dfda] bg-[#fafcfb] px-4 py-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${runStatusDot(run.status)}`} />
                <h2 className="truncate text-xs font-black">{run.summary}</h2>
              </div>
              <div className="mt-0.5 flex min-w-0 items-center gap-2 text-[9px] font-semibold text-[#7a8780]">
                <span className="truncate">{traceBannerLabel} · {run.count} 抽</span>
                {traceSource === "history" ? (
                  <span className="shrink-0 font-black text-[#496486]">历史</span>
                ) : traceSource === "concurrency" ? (
                  <span className="shrink-0 font-black text-[#8f5b16]">并发批次</span>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black">
              {run.eventId && run.nodes.backpack.status === "waiting" ? (
                <button
                  type="button"
                  onClick={() => void checkBackpack(run.runId, run.eventId!, true)}
                  disabled={isCheckingBackpack || isPulling}
                  className="flex h-7 items-center gap-1.5 border border-[#d8bb7d] bg-[#fff8e8] px-2.5 text-[#8f5b16] transition hover:border-[#bd7a1f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isCheckingBackpack ? (
                    <LoaderCircle className="size-3 animate-spin" />
                  ) : (
                    <RefreshCw className="size-3" />
                  )}
                  {isCheckingBackpack
                    ? "检查中"
                    : run.nodes.backpack.errorCode === "pull_event_pending"
                      ? "重新检查"
                      : "检查 Backpack"}
                </button>
              ) : null}
              <TrafficLegend color="bg-[#287f92]" label="南北流量" />
              <TrafficLegend color="bg-[#466fc2]" label="东西流量" />
              <TrafficLegend color="bg-[#bd7a1f]" label="异步流量" icon={<RadioTower className="size-3" />} />
            </div>
          </div>

          <TraceReplayControls
            frames={replayFrames}
            activeIndex={replayFrameIndex}
            isPlaying={isReplayPlaying}
            speed={replaySpeed}
            onToggle={toggleReplay}
            onRestart={restartReplay}
            onSeek={seekReplay}
            onSpeedChange={setReplaySpeed}
          />

          <div className="h-[980px] min-h-[920px] border-b border-[#d5dfda] sm:h-[480px] sm:min-h-[430px] 2xl:h-[560px]">
            <GachaTraceCanvas
              run={run}
              selectedNodeId={selectedNodeId}
              onSelectNode={openNodeInspector}
              replayEdgeId={activeReplayFrame?.edgeId}
              replayNodeId={activeReplayFrame?.targetNodeId}
              replayPlaying={isReplayPlaying}
              replayDurationMs={replayDurationMs}
            />
          </div>

          <TraceWaterfall run={run} />
        </section>
      </div>

      <KafkaTopicMonitor
        messages={kafkaMessages}
        onSignalsReceived={recordKafkaSignals}
      />
      <TraceNodeInspector
        run={run}
        nodeId={selectedNodeId}
        replayFrame={activeReplayFrame}
        open={isInspectorOpen}
        onOpenChange={setIsInspectorOpen}
      />
      {isHistoryOpen ? (
        <TraceHistoryDialog
          activeOperationId={run.operationId}
          playerId={initialPlayerId}
          open={isHistoryOpen}
          onOpenChange={setIsHistoryOpen}
          onTraceLoaded={loadHistoricalTrace}
          onComparisonLoaded={openComparison}
        />
      ) : null}
      {hasOpenedConcurrency ? (
        <TraceConcurrencyDialog
          bannerId={activeBanner?.id ?? ""}
          bannerName={activeBanner?.name ?? "未知卡池"}
          count={pullCount}
          balanceMinor={balanceMinor}
          open={isConcurrencyOpen}
          onOpenChange={setIsConcurrencyOpen}
          onTraceLoaded={loadConcurrencyTrace}
          onBalanceChange={setBalanceMinor}
          onBatchStarted={() => {
            hasStartedPullRef.current = true;
          }}
          onBatchCompleted={recordConcurrencyBatch}
        />
      ) : null}
      {comparison ? (
        <TraceComparisonDialog
          comparison={comparison}
          open={isComparisonOpen}
          onOpenChange={setIsComparisonOpen}
        />
      ) : null}
    </main>
  );
}

function RunStatus({ run }: { run: GachaTraceRun }) {
  return (
    <div className="hidden items-center gap-2 border border-[#d4ded9] bg-[#f8faf9] px-3 py-1.5 sm:flex">
      <span className={`size-1.5 rounded-full ${runStatusDot(run.status)}`} />
      <span className="text-[9px] font-black text-[#5f6e66]">{runStatusLabel(run.status)}</span>
    </div>
  );
}

function TrafficLegend({
  color,
  label,
  icon,
}: {
  color: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 border border-[#d8e1dc] bg-white px-2 text-[#607068]">
      {icon ?? <span className={`h-0.5 w-4 ${color}`} />}
      {label}
    </span>
  );
}

function ResultRow({ result, index }: { result: DisplayPullResult; index: number }) {
  return (
    <div className="flex min-w-0 items-center gap-2 border border-[#dce4e0] bg-white px-2.5 py-2">
      <span className="w-5 shrink-0 font-mono text-[9px] font-bold text-[#9aa59f]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className={`flex size-7 shrink-0 items-center justify-center text-[10px] font-black ${rarityTone(result.rarity)}`}>
        {result.rarity}★
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[10px] font-black text-[#2b3931]">{result.itemName}</div>
        <div className="mt-0.5 font-mono text-[8px] text-[#89958f]">{result.itemId}</div>
      </div>
      {result.isFeatured ? (
        <span className="shrink-0 border border-[#d8b86f] bg-[#fff8e8] px-1.5 py-0.5 text-[8px] font-black text-[#986117]">
          UP
        </span>
      ) : null}
    </div>
  );
}

function mapGatewayRecord(record: GatewayPullRecord): DisplayPullResult {
  return {
    id: record.id,
    itemId: record.item_id,
    itemName: record.item_name,
    rarity: record.rarity,
    isFeatured: record.is_featured,
  };
}

function mapGatewayTraceRecord(record: GatewayPullRecord) {
  return {
    id: record.id,
    itemId: record.item_id,
    itemName: record.item_name,
    itemType: record.item_type,
    rarity: record.rarity,
    isFeatured: record.is_featured,
  };
}

function mapBackpackTraceResult(
  result: Extract<BackpackSyncActionResult, { ok: true }>,
) {
  return {
    event: {
      eventId: result.event.event_id,
      eventType: result.event.event_type,
      bannerId: result.event.banner_id,
      stateVersion: result.event.state_version,
      receivedAt: result.event.received_at,
    },
    eventRecords: result.eventRecords.map((record) => ({
      id: record.id,
      itemId: record.item_id,
      itemName: record.item_name,
      itemType: record.item_type,
      rarity: record.rarity,
      isFeatured: record.is_featured,
    })),
    historyCount: result.history.length,
    inventory: {
      distinctItemCount: result.inventory.length,
      totalQuantity: result.inventory.reduce((total, item) => total + item.quantity, 0),
    },
  };
}

function savePendingOperation(operation: PendingOperation) {
  try {
    window.localStorage.setItem(PENDING_OPERATION_KEY, JSON.stringify(operation));
  } catch {
    // The server-side idempotency key still protects the active request.
  }
}

function readPendingOperation(): PendingOperation | null {
  try {
    const raw = window.localStorage.getItem(PENDING_OPERATION_KEY);
    if (!raw) {
      return null;
    }
    const value = JSON.parse(raw) as Partial<PendingOperation>;
    if (
      typeof value.bannerId !== "string" ||
      (value.count !== 1 && value.count !== 10) ||
      typeof value.idempotencyKey !== "string"
    ) {
      return null;
    }
    return {
      bannerId: value.bannerId,
      count: value.count,
      idempotencyKey: value.idempotencyKey,
    };
  } catch {
    return null;
  }
}

function clearPendingOperation() {
  try {
    window.localStorage.removeItem(PENDING_OPERATION_KEY);
  } catch {
    // No browser persistence is available.
  }
}

function runStatusLabel(status: GachaTraceRun["status"]) {
  return {
    idle: "等待请求",
    running: "执行中",
    waiting: "等待异步消费",
    success: "链路成功",
    error: "链路故障",
  }[status];
}

function runStatusDot(status: GachaTraceRun["status"]) {
  return {
    idle: "bg-[#9ba8a1]",
    running: "animate-pulse bg-[#4fc0d7]",
    waiting: "animate-pulse bg-[#e4a143]",
    success: "bg-[#55c18e]",
    error: "bg-[#ed676d]",
  }[status];
}

function rarityTone(rarity: 3 | 4 | 5) {
  return {
    3: "bg-[#eef2f0] text-[#607068]",
    4: "bg-[#eef1ff] text-[#5567ac]",
    5: "bg-[#fff5dd] text-[#9b681d]",
  }[rarity];
}

function currentTimestamp() {
  return Date.now();
}
