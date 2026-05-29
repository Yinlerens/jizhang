"use client";

import { useEffect, useRef, useState } from "react";
import type { EChartsOption, EChartsType } from "echarts";

interface ResponsiveEChartProps {
  option: EChartsOption;
  height: number;
  className?: string;
  loadingLabel?: string;
}

export default function ResponsiveEChart({
  option,
  height,
  className = "",
  loadingLabel = "加载中...",
}: ResponsiveEChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType | null>(null);
  const latestOptionRef = useRef(option);
  const [ready, setReady] = useState(false);

  latestOptionRef.current = option;

  useEffect(() => {
    let disposed = false;
    let observer: ResizeObserver | null = null;

    const mountChart = async () => {
      const echarts = await import("echarts");

      if (disposed || !containerRef.current) {
        return;
      }

      chartRef.current = echarts.init(containerRef.current, null, {
        renderer: "svg",
        useDirtyRect: true,
      });
      chartRef.current.setOption(latestOptionRef.current, true);

      observer = new ResizeObserver(() => {
        chartRef.current?.resize();
      });
      observer.observe(containerRef.current);
      setReady(true);
    };

    mountChart();

    return () => {
      disposed = true;
      observer?.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  return (
    <div className={`relative min-w-0 ${className}`} style={{ height }}>
      <div ref={containerRef} className="h-full w-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-[#8f5b72] dark:text-cyan-100/60">
          {loadingLabel}
        </div>
      )}
    </div>
  );
}
