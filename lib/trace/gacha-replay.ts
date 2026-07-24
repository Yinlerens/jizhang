import {
  GACHA_TRACE_EDGES,
  GACHA_TRACE_NODE_DEFINITIONS,
  type GachaTraceNodeId,
  type GachaTraceRun,
  type TraceEvidence,
  type TraceNodeStatus,
  type TraceTraffic,
} from "./gacha-run.ts";

export type GachaReplayFrame = {
  id: string;
  index: number;
  edgeId: string;
  sourceNodeId: GachaTraceNodeId;
  targetNodeId: GachaTraceNodeId;
  label: string;
  edgeLabel: string;
  traffic: TraceTraffic;
  status: TraceNodeStatus;
  evidence: TraceEvidence;
  packet: unknown;
};

export function buildGachaReplayFrames(run: GachaTraceRun): GachaReplayFrame[] {
  const frames: GachaReplayFrame[] = [];

  for (const edge of GACHA_TRACE_EDGES) {
    const source = run.nodes[edge.source];
    const target = run.nodes[edge.target];
    if (target.status === "idle" || target.status === "skipped") {
      continue;
    }

    frames.push({
      id: `${run.runId}:${edge.id}`,
      index: frames.length,
      edgeId: edge.id,
      sourceNodeId: edge.source,
      targetNodeId: edge.target,
      label: `${GACHA_TRACE_NODE_DEFINITIONS[edge.source].label} -> ${GACHA_TRACE_NODE_DEFINITIONS[edge.target].label}`,
      edgeLabel: edge.label,
      traffic: edge.traffic,
      status: target.status,
      evidence: packetEvidence(target.request, target.evidence),
      packet: target.request ?? source.response,
    });
  }

  return frames;
}

function packetEvidence(packet: unknown, fallback: TraceEvidence): TraceEvidence {
  if (
    packet &&
    typeof packet === "object" &&
    "evidence" in packet &&
    (packet.evidence === "observed" || packet.evidence === "derived" || packet.evidence === "pending")
  ) {
    return packet.evidence;
  }
  return fallback;
}
