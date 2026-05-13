"use client";

import { useEffect, useMemo, useRef } from "react";
import type { EChartsOption, EChartsType } from "echarts";
import {
  categoryColors,
  getElectronShellNotation,
  getElectronShells,
  type ElectronShell,
  type PeriodicElement,
} from "@/lib/periodic-table";

interface BohrElectronChartProps {
  element: PeriodicElement;
}

const buildBohrOption = (
  element: PeriodicElement,
  shells: ElectronShell[],
  width: number,
  height: number,
  tick: number,
): EChartsOption => {
  const palette = categoryColors[element.category];
  const centerX = Math.max(width * 0.46, 178);
  const centerY = height * 0.52;
  const maxRadius = Math.min(width * 0.34, height * 0.38, 148);
  const minRadius = shells.length > 1 ? 42 : 62;
  const step = shells.length > 1 ? (maxRadius - minRadius) / (shells.length - 1) : 0;

  const shellGraphics = shells.flatMap((shell, shellIndex) => {
    const radius = minRadius + step * shellIndex;
    const phase = tick / (shell.duration * 1000);
    const direction = shell.direction === "reverse" ? -1 : 1;
    const orbitColor = shellIndex % 2 === 0 ? palette.accent : palette.stroke;
    const electrons = Array.from({ length: shell.electrons }, (_, electronIndex) => {
      const angle = direction * phase * Math.PI * 2 + (electronIndex / shell.electrons) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.64;

      return {
        type: "circle",
        shape: { cx: x, cy: y, r: shellIndex === shells.length - 1 ? 4.4 : 3.7 },
        style: {
          fill: palette.accent,
          stroke: "#ffffff",
          lineWidth: 1,
          shadowBlur: 8,
          shadowColor: `${palette.accent}88`,
        },
        z: 6,
      };
    });

    return [
      {
        type: "ellipse",
        shape: { cx: centerX, cy: centerY, rx: radius, ry: radius * 0.64 },
        style: {
          fill: "transparent",
          stroke: orbitColor,
          lineWidth: shellIndex === shells.length - 1 ? 1.8 : 1.2,
          opacity: 0.42,
        },
        z: 1,
      },
      {
        type: "text",
        style: {
          x: centerX - radius - 12,
          y: centerY - radius * 0.64 - 8,
          text: `${shell.label} ${shell.electrons}`,
          fill: "#71717a",
          fontSize: 12,
          fontWeight: 800,
          align: "right",
        },
        z: 8,
      },
      ...electrons,
    ];
  });

  return {
    animation: false,
    backgroundColor: "transparent",
    graphic: [
      {
        type: "circle",
        shape: { cx: centerX, cy: centerY, r: 31 },
        style: {
          fill: palette.fill,
          stroke: palette.stroke,
          lineWidth: 2,
          shadowBlur: 18,
          shadowColor: `${palette.accent}55`,
        },
        z: 9,
      },
      {
        type: "text",
        style: {
          x: centerX,
          y: centerY - 8,
          text: element.symbol,
          fill: palette.text,
          fontSize: 24,
          fontWeight: 900,
          align: "center",
          verticalAlign: "middle",
        },
        z: 10,
      },
      {
        type: "text",
        style: {
          x: centerX,
          y: centerY + 16,
          text: `Z=${element.number}`,
          fill: palette.text,
          fontSize: 10,
          fontWeight: 900,
          align: "center",
          verticalAlign: "middle",
        },
        z: 10,
      },
      ...shellGraphics,
      {
        type: "text",
        style: {
          x: 18,
          y: 26,
          text: "ELECTRON SHELLS",
          fill: "#71717a",
          fontSize: 11,
          fontWeight: 900,
        },
      },
      {
        type: "text",
        style: {
          x: 18,
          y: height - 28,
          text: getElectronShellNotation(shells),
          fill: "#18181b",
          fontSize: 18,
          fontWeight: 900,
          fontFamily: "monospace",
        },
      },
    ],
  };
};

export default function BohrElectronChart({ element }: BohrElectronChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType | null>(null);
  const frameRef = useRef<number | null>(null);
  const shells = useMemo(() => getElectronShells(element), [element]);

  useEffect(() => {
    let disposed = false;
    let observer: ResizeObserver | null = null;

    const render = (tick: number) => {
      const container = containerRef.current;
      const chart = chartRef.current;

      if (!container || !chart || disposed) {
        return;
      }

      chart.setOption(
        buildBohrOption(element, shells, container.clientWidth || 520, container.clientHeight || 360, tick),
        true,
      );
      frameRef.current = window.requestAnimationFrame(render);
    };

    const mount = async () => {
      const echarts = await import("echarts");

      if (disposed || !containerRef.current) {
        return;
      }

      chartRef.current = echarts.init(containerRef.current, null, {
        renderer: "canvas",
        useDirtyRect: true,
      });
      observer = new ResizeObserver(() => {
        chartRef.current?.resize();
      });
      observer.observe(containerRef.current);
      frameRef.current = window.requestAnimationFrame(render);
    };

    void mount();

    return () => {
      disposed = true;
      observer?.disconnect();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [element, shells]);

  return (
    <div
      ref={containerRef}
      className="h-78 min-h-78 w-full [border-radius:8px] border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
      aria-label={`${element.name} 的 ECharts 核外电子排布图`}
    />
  );
}
