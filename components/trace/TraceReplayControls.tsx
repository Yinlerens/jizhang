"use client";

import { Pause, Play, RotateCcw } from "lucide-react";

import type { GachaReplayFrame } from "@/lib/trace/gacha-replay";

export default function TraceReplayControls({
  frames,
  activeIndex,
  isPlaying,
  speed,
  onToggle,
  onRestart,
  onSeek,
  onSpeedChange,
}: {
  frames: GachaReplayFrame[];
  activeIndex: number;
  isPlaying: boolean;
  speed: number;
  onToggle: () => void;
  onRestart: () => void;
  onSeek: (index: number) => void;
  onSpeedChange: (speed: number) => void;
}) {
  const hasFrames = frames.length > 0;
  const normalizedIndex = hasFrames ? Math.max(0, Math.min(activeIndex, frames.length - 1)) : 0;
  const activeFrame = activeIndex >= 0 ? frames[normalizedIndex] : undefined;

  return (
    <section
      className="grid min-h-14 gap-2 border-b border-[#d5dfda] bg-white px-3 py-2 sm:grid-cols-[auto_minmax(160px,1fr)_auto] sm:items-center sm:px-4"
      aria-label="本次调用数据包重放"
      data-testid="trace-replay-controls"
    >
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onToggle}
          disabled={!hasFrames}
          className="flex size-8 items-center justify-center border border-[#cbd7d1] bg-[#1f372c] text-white transition hover:bg-[#294b3b] disabled:cursor-not-allowed disabled:bg-[#aebbb4]"
          title={isPlaying ? "暂停" : "播放"}
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        </button>
        <button
          type="button"
          onClick={onRestart}
          disabled={!hasFrames}
          className="flex size-8 items-center justify-center border border-[#cbd7d1] bg-white text-[#52635a] transition hover:border-[#90a39a] hover:text-[#1f372c] disabled:cursor-not-allowed disabled:opacity-40"
          title="重新播放"
          aria-label="重新播放"
        >
          <RotateCcw className="size-3.5" />
        </button>
        <span className="ml-1 w-10 text-right font-mono text-[9px] font-black text-[#718078]">
          {activeIndex >= 0 ? normalizedIndex + 1 : 0}/{frames.length}
        </span>
      </div>

      <div className="min-w-0">
        <div className="mb-1 flex min-w-0 items-center justify-between gap-2">
          <span className="truncate text-[10px] font-black text-[#26362e]" aria-live="polite">
            {activeFrame?.label ?? (hasFrames ? "准备重放" : "等待本次调用完成")}
          </span>
          {activeFrame ? (
            <span className={`shrink-0 border px-1.5 py-0.5 text-[8px] font-black ${evidenceTone(activeFrame.evidence)}`}>
              {evidenceLabel(activeFrame.evidence)}
            </span>
          ) : null}
        </div>
        <input
          type="range"
          min={0}
          max={Math.max(0, frames.length - 1)}
          step={1}
          value={normalizedIndex}
          disabled={!hasFrames}
          onChange={(event) => onSeek(Number(event.target.value))}
          className="block h-3 w-full accent-[#287f92] disabled:opacity-40"
          aria-label="重放进度"
        />
      </div>

      <select
        value={speed}
        onChange={(event) => onSpeedChange(Number(event.target.value))}
        disabled={!hasFrames}
        className="h-8 w-20 border border-[#cbd7d1] bg-white px-2 font-mono text-[10px] font-black text-[#52635a] outline-none focus:border-[#527d69] disabled:opacity-40"
        aria-label="播放速度"
        title="播放速度"
      >
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
    </section>
  );
}

function evidenceLabel(evidence: GachaReplayFrame["evidence"]) {
  return { observed: "实测", durable: "持久记录", derived: "路径判定", pending: "待确认" }[evidence];
}

function evidenceTone(evidence: GachaReplayFrame["evidence"]) {
  return {
    observed: "border-[#9bc1ca] bg-[#ebf7f9] text-[#236e80]",
    durable: "border-[#9fcbb7] bg-[#eef8f3] text-[#287d59]",
    derived: "border-[#b8c5d8] bg-[#f1f4fa] text-[#526b96]",
    pending: "border-[#e6c78c] bg-[#fff8e9] text-[#9b651b]",
  }[evidence];
}
