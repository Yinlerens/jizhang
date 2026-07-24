"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  EdgeLabelRenderer,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  Database,
  Dices,
  FileStack,
  HardDrive,
  MonitorUp,
  PackageOpen,
  PanelsTopLeft,
  RadioTower,
  Route,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import {
  GACHA_TRACE_EDGES,
  GACHA_TRACE_NODE_DEFINITIONS,
  type GachaTraceNodeId,
  type GachaTraceRun,
  type TraceNodeSnapshot,
  type TraceTraffic,
} from "@/lib/trace/gacha-run";
import styles from "./trace-flow.module.css";

type TraceNodeData = {
  nodeId: GachaTraceNodeId;
  snapshot: TraceNodeSnapshot;
  layout: "wide" | "compact";
  replayActive: boolean;
  onSelect: (nodeId: GachaTraceNodeId) => void;
};

type TraceFlowNode = Node<TraceNodeData, "trace-node">;
type PacketEdgeData = {
  state: "idle" | "active" | "success" | "error" | "skipped";
  traffic: TraceTraffic;
  replayActive: boolean;
  packetMoving: boolean;
  packetDurationMs: number;
};
type PacketFlowEdge = Edge<PacketEdgeData, "packet">;

const nodeTypes = { "trace-node": TraceNode };
const edgeTypes = { packet: PacketEdge };

const WIDE_NODE_POSITIONS: Record<GachaTraceNodeId, { x: number; y: number }> = {
  browser: { x: 0, y: 180 },
  next: { x: 200, y: 180 },
  gateway: { x: 400, y: 180 },
  gacha: { x: 600, y: 180 },
  config: { x: 800, y: 0 },
  asset: { x: 800, y: 120 },
  redis: { x: 800, y: 240 },
  kafka: { x: 400, y: 360 },
  backpack: { x: 600, y: 360 },
  "backpack-db": { x: 800, y: 360 },
};

const COMPACT_NODE_POSITIONS: Record<GachaTraceNodeId, { x: number; y: number }> = {
  browser: { x: 10, y: 20 },
  next: { x: 10, y: 120 },
  gateway: { x: 10, y: 220 },
  gacha: { x: 10, y: 320 },
  config: { x: 190, y: 280 },
  asset: { x: 190, y: 390 },
  redis: { x: 190, y: 500 },
  kafka: { x: 190, y: 610 },
  backpack: { x: 190, y: 720 },
  "backpack-db": { x: 190, y: 830 },
};

const NODE_ICONS: Record<GachaTraceNodeId, LucideIcon> = {
  browser: MonitorUp,
  next: PanelsTopLeft,
  gateway: Route,
  gacha: Dices,
  config: FileStack,
  asset: WalletCards,
  redis: Database,
  kafka: RadioTower,
  backpack: PackageOpen,
  "backpack-db": HardDrive,
};

export default function GachaTraceCanvas({
  run,
  selectedNodeId,
  onSelectNode,
  replayEdgeId = null,
  replayNodeId = null,
  replayPlaying = false,
  replayDurationMs = 900,
}: {
  run: GachaTraceRun;
  selectedNodeId: GachaTraceNodeId;
  onSelectNode: (nodeId: GachaTraceNodeId) => void;
  replayEdgeId?: string | null;
  replayNodeId?: GachaTraceNodeId | null;
  replayPlaying?: boolean;
  replayDurationMs?: number;
}) {
  const isCompact = useCompactLayout();
  const layout = isCompact ? "compact" : "wide";
  const positions = isCompact ? COMPACT_NODE_POSITIONS : WIDE_NODE_POSITIONS;
  const nodes = useMemo<TraceFlowNode[]>(
    () =>
      Object.values(GACHA_TRACE_NODE_DEFINITIONS).map((definition) => ({
        id: definition.id,
        type: "trace-node",
        position: positions[definition.id],
        data: {
          nodeId: definition.id,
           snapshot: run.nodes[definition.id],
           layout,
           replayActive: definition.id === replayNodeId,
           onSelect: onSelectNode,
        },
        selected: definition.id === selectedNodeId,
        draggable: false,
        connectable: false,
        focusable: false,
      })),
    [layout, onSelectNode, positions, replayNodeId, run.nodes, selectedNodeId],
  );

  const edges = useMemo<PacketFlowEdge[]>(
    () =>
      GACHA_TRACE_EDGES.map((edge) => {
        const source = run.nodes[edge.source];
        const target = run.nodes[edge.target];
        const replayActive = edge.id === replayEdgeId;
        const state = replayActive ? "active" : edgeState(source, target);
        const color = edgeColor(state, edge.traffic);
        const isAsyncBranch = edge.id === "gacha-kafka";

        return {
          ...edge,
          type: "packet",
          sourceHandle: isAsyncBranch ? "async-source" : "default-source",
          targetHandle: isAsyncBranch ? "async-target" : "default-target",
          data: {
            state,
            traffic: edge.traffic,
            replayActive,
            packetMoving: replayActive ? replayPlaying : state === "active",
            packetDurationMs: replayActive ? replayDurationMs : 1_150,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 14,
            height: 14,
            color,
          },
          style: { stroke: color, strokeWidth: state === "active" ? 2.4 : 1.7 },
        };
      }),
    [replayDurationMs, replayEdgeId, replayPlaying, run.nodes],
  );

  return (
    <div
      className={`${styles.canvas} ${isCompact ? styles.compactCanvas : ""}`}
      data-testid="gacha-trace-canvas"
    >
      <ReactFlow<TraceFlowNode, PacketFlowEdge>
        key={layout}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={(_, node) => onSelectNode(node.data.nodeId)}
        fitView
        fitViewOptions={{
          padding: isCompact ? 0.04 : 0.06,
          minZoom: isCompact ? 0.78 : 0.56,
          maxZoom: 1,
        }}
        minZoom={isCompact ? 0.7 : 0.48}
        maxZoom={1.45}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        elementsSelectable
        panOnDrag={!isCompact}
        panOnScroll={!isCompact}
        zoomOnScroll={!isCompact}
        zoomOnPinch={!isCompact}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: false }}
      >
        <Background color="#b9c8c0" gap={28} size={0} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
}

function TraceNode({ data, selected }: NodeProps<TraceFlowNode>) {
  const definition = GACHA_TRACE_NODE_DEFINITIONS[data.nodeId];
  const snapshot = data.snapshot;
  const Icon = NODE_ICONS[data.nodeId];
  const tone = nodeTone(snapshot.status);
  const ports = nodePortPositions(data.nodeId, data.layout);

  return (
    <div className="relative">
      <Handle
        id="default-target"
        type="target"
        position={ports.target}
        className="!size-2 !border-0 !bg-[#92a39a]"
      />
      {data.nodeId === "kafka" ? (
        <Handle
          id="async-target"
          type="target"
          position={ports.asyncTarget}
          className="!size-2 !border-0 !bg-[#bd7a1f]"
        />
      ) : null}
      <button
        type="button"
        onClick={() => data.onSelect(data.nodeId)}
        onFocus={() => data.onSelect(data.nodeId)}
        className={`block min-h-[84px] w-[160px] appearance-none border bg-white px-3 py-2.5 text-left shadow-[0_5px_18px_rgba(25,43,34,0.08)] transition-[border-color,box-shadow,opacity] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287f92] ${tone.shell} ${
          data.replayActive
            ? "ring-2 ring-[#287f92] shadow-[0_8px_28px_rgba(40,127,146,0.24)]"
            : selected
              ? "ring-2 ring-[#162a21]/20"
              : ""
        }`}
        data-testid={`trace-node-${data.nodeId}`}
        data-node-status={snapshot.status}
        data-replay-active={data.replayActive || undefined}
        aria-label={`${definition.label}，${definition.role}，${statusLabel(snapshot.status)}`}
        aria-pressed={selected}
      >
        <span className="flex min-w-0 items-start gap-2.5">
          <span className={`flex size-8 shrink-0 items-center justify-center border ${tone.icon}`}>
            <Icon className="size-4" strokeWidth={1.9} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex min-w-0 items-center">
              <span className="whitespace-nowrap text-[11px] font-black text-[#15231c]">
                {definition.label}
              </span>
            </span>
            <span className="mt-0.5 block truncate text-[9px] font-semibold text-[#748078]">
              {definition.role}
            </span>
          </span>
        </span>
        <span className="mt-2 flex items-center justify-between gap-2 border-t border-[#edf1ef] pt-2">
          <span className={`truncate text-[9px] font-extrabold ${tone.text}`}>
            {statusLabel(snapshot.status)}
          </span>
          <span className="shrink-0 font-mono text-[9px] text-[#7c8982]">
            {snapshot.durationMs === null
              ? evidenceLabel(snapshot.evidence)
              : `${snapshot.durationMs} ms`}
          </span>
        </span>
      </button>
      <Handle
        id="default-source"
        type="source"
        position={ports.source}
        className="!size-2 !border-0 !bg-[#92a39a]"
      />
      {data.nodeId === "gacha" ? (
        <Handle
          id="async-source"
          type="source"
          position={ports.asyncSource}
          className="!size-2 !border-0 !bg-[#bd7a1f]"
        />
      ) : null}
    </div>
  );
}

function useCompactLayout() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsCompact(media.matches);
    const frameId = window.requestAnimationFrame(update);
    media.addEventListener("change", update);

    return () => {
      window.cancelAnimationFrame(frameId);
      media.removeEventListener("change", update);
    };
  }, []);

  return isCompact;
}

function nodePortPositions(nodeId: GachaTraceNodeId, layout: TraceNodeData["layout"]) {
  if (layout === "wide") {
    return {
      target: Position.Left,
      source: Position.Right,
      asyncSource: Position.Bottom,
      asyncTarget: Position.Top,
    };
  }

  const compactPorts: Record<
    GachaTraceNodeId,
    { target: Position; source: Position }
  > = {
    browser: { target: Position.Top, source: Position.Bottom },
    next: { target: Position.Top, source: Position.Bottom },
    gateway: { target: Position.Top, source: Position.Bottom },
    gacha: { target: Position.Top, source: Position.Right },
    config: { target: Position.Left, source: Position.Bottom },
    asset: { target: Position.Left, source: Position.Bottom },
    redis: { target: Position.Left, source: Position.Bottom },
    kafka: { target: Position.Left, source: Position.Bottom },
    backpack: { target: Position.Top, source: Position.Bottom },
    "backpack-db": { target: Position.Top, source: Position.Bottom },
  };

  return {
    ...compactPorts[nodeId],
    asyncSource: Position.Bottom,
    asyncTarget: Position.Left,
  };
}

function PacketEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
  style,
  markerEnd,
}: EdgeProps<PacketFlowEdge>) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
    offset: 18,
  });
  const state = data?.state ?? "idle";
  const traffic = data?.traffic ?? "east-west";
  const color = edgeColor(state, traffic);
  const replayActive = data?.replayActive ?? false;
  const packetMoving = data?.packetMoving ?? state === "active";
  const packetDurationMs = data?.packetDurationMs ?? 1_150;

  return (
    <>
      <path
        id={id}
        d={edgePath}
        fill="none"
        markerEnd={markerEnd}
        style={style}
        strokeDasharray={state === "skipped" || state === "idle" ? "5 6" : undefined}
      />
      {state === "active" ? (
        packetMoving ? (
          <circle r="4.5" fill={color} color={color} className={styles.packet}>
            <animateMotion
              dur={`${packetDurationMs}ms`}
              repeatCount={replayActive ? "1" : "indefinite"}
              path={edgePath}
            />
          </circle>
        ) : (
          <circle r="4.5" cx={labelX} cy={labelY} fill={color} color={color} className={styles.packet} />
        )
      ) : null}
      <EdgeLabelRenderer>
        <div className={styles.edgeLabel} style={{ left: labelX, top: labelY }}>
          {edgeDisplayLabel(id, label)}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

function edgeDisplayLabel(id: string, fallback: React.ReactNode) {
  const labels: Record<string, string> = {
    "browser-next": "RSC action",
    "next-gateway": "POST /pulls",
    "gateway-gacha": "proxy",
    "gacha-config": "release",
    "gacha-asset": "spend/refund",
    "gacha-redis": "pity/idempotency",
    "gacha-kafka": "pull_completed.v1",
    "kafka-backpack": "consume",
    "backpack-db": "transaction",
  };

  return labels[id] ?? String(fallback ?? "");
}

function edgeState(source: TraceNodeSnapshot, target: TraceNodeSnapshot): PacketEdgeData["state"] {
  if (target.status === "error") {
    return "error";
  }
  if (target.status === "success") {
    return "success";
  }
  if (target.status === "skipped") {
    return "skipped";
  }
  if (
    (target.status === "waiting" || target.status === "running") &&
    (source.status === "running" || source.status === "success")
  ) {
    return "active";
  }
  return "idle";
}

function edgeColor(state: PacketEdgeData["state"], traffic: TraceTraffic) {
  if (state === "error") {
    return "#d4484e";
  }
  if (state === "skipped" || state === "idle") {
    return "#a9b6af";
  }
  if (state === "success") {
    return "#31956b";
  }
  if (traffic === "north-south") {
    return "#287f92";
  }
  if (traffic === "async") {
    return "#bd7a1f";
  }
  return "#466fc2";
}

function nodeTone(status: TraceNodeSnapshot["status"]) {
  const tones = {
    idle: {
      shell: "border-[#cdd7d2] opacity-70",
      icon: "border-[#d8e0dc] bg-[#f2f5f3] text-[#718078]",
      dot: "bg-[#a9b5af]",
      text: "text-[#748078]",
    },
    waiting: {
      shell: "border-[#d8bb7d]",
      icon: "border-[#ead8b3] bg-[#fff8e8] text-[#a66a18]",
      dot: "animate-pulse bg-[#d69432]",
      text: "text-[#9a641b]",
    },
    running: {
      shell: "border-[#78a9b5] shadow-[0_7px_24px_rgba(40,127,146,0.16)]",
      icon: "border-[#b6d1d8] bg-[#eaf6f8] text-[#236e80]",
      dot: "animate-pulse bg-[#287f92]",
      text: "text-[#236e80]",
    },
    success: {
      shell: "border-[#8fc9ae]",
      icon: "border-[#b9ddcb] bg-[#edf8f2] text-[#287d59]",
      dot: "bg-[#31956b]",
      text: "text-[#287d59]",
    },
    error: {
      shell: "border-[#dc7b80] shadow-[0_7px_24px_rgba(212,72,78,0.18)]",
      icon: "border-[#efb6b9] bg-[#fff0f0] text-[#bd343b]",
      dot: "bg-[#d4484e]",
      text: "text-[#bd343b]",
    },
    skipped: {
      shell: "border-dashed border-[#cdd5d1] opacity-55",
      icon: "border-[#dce2df] bg-[#f5f7f6] text-[#8c9791]",
      dot: "bg-[#c2cbc6]",
      text: "text-[#8c9791]",
    },
  };
  return tones[status];
}

function statusLabel(status: TraceNodeSnapshot["status"]) {
  return {
    idle: "未执行",
    waiting: "等待中",
    running: "处理中",
    success: "已完成",
    error: "故障",
    skipped: "已跳过",
  }[status];
}

function evidenceLabel(evidence: TraceNodeSnapshot["evidence"]) {
  return {
    observed: "实测",
    derived: "路径判定",
    pending: "待确认",
  }[evidence];
}
