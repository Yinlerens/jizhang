"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  CustomSeriesRenderItem,
  CustomSeriesRenderItemReturn,
  EChartsOption,
  EChartsType,
  TooltipComponentFormatterCallbackParams,
} from "echarts";
import {
  categoryColors,
  categoryLabels,
  getElementDetailPath,
  periodicElements,
  periodicRows,
  type ElementCategory,
} from "@/lib/periodic-table";

type FocusCategory = ElementCategory | "all";

interface PeriodicTableChartProps {
  focusCategory: FocusCategory;
}

const xAxisData = Array.from({ length: 18 }, (_, index) => String(index + 1));
const yAxisData = Object.values(periodicRows);

// series.data 的前两列必须和 matrix 维度一致，后续列只用于 tooltip 和自定义渲染。
const chartData = periodicElements.map((element) => [
  String(element.group),
  periodicRows[element.row],
  element.number,
  element.symbol,
  element.name,
  categoryLabels[element.category],
  element.mass,
]);

// tooltip formatter 收到的 params 在单系列时是对象，多系列时可能是数组。
const getTooltipElement = (params: TooltipComponentFormatterCallbackParams) => {
  const item = Array.isArray(params) ? params[0] : params;

  if (!item || typeof item.dataIndex !== "number") {
    return null;
  }

  return periodicElements[item.dataIndex] ?? null;
};

const getEventElement = (params: unknown) => {
  if (!params || typeof params !== "object") {
    return null;
  }

  const dataIndex = (params as { dataIndex?: unknown }).dataIndex;

  if (typeof dataIndex !== "number") {
    return null;
  }

  return periodicElements[dataIndex] ?? null;
};

const createRenderItem = (focusCategory: FocusCategory): CustomSeriesRenderItem => {
  return (params, api) => {
    const element = periodicElements[params.dataIndex];
    // matrix.api.layout 能拿到单元格真实尺寸，比手写格子宽高更能适配响应式布局。
    const layout = api.layout?.([api.value(0), api.value(1)], { clamp: true });
    const rect = layout?.rect;

    if (
      !element ||
      !rect ||
      !Number.isFinite(rect.x) ||
      !Number.isFinite(rect.y) ||
      !Number.isFinite(rect.width) ||
      !Number.isFinite(rect.height)
    ) {
      return null;
    }

    const palette = categoryColors[element.category];
    const focused = focusCategory === "all" || element.category === focusCategory;
    const opacity = focused ? 1 : 0.2;
    const padding = Math.max(2, Math.min(4, rect.width * 0.06));
    const width = Math.max(0, rect.width - padding * 2);
    const height = Math.max(0, rect.height - padding * 2);
    const x = rect.x + padding;
    const y = rect.y + padding;
    const symbolSize = width < 48 ? 17 : 21;
    const nameSize = width < 50 ? 8 : 10;
    const numberSize = width < 50 ? 8 : 9;
    const showFineText = width >= 43 && height >= 48;

    // custom series 每个元素返回一个 group：底色卡片、原子序数、符号、名称和质量。
    return {
      type: "group",
      children: [
        {
          type: "rect",
          shape: {
            x,
            y,
            width,
            height,
            r: Math.min(6, width * 0.12),
          },
          style: {
            fill: palette.fill,
            stroke: focused ? palette.stroke : "#d4d4d8",
            lineWidth: focused ? 1.4 : 1,
            opacity,
            shadowBlur: focused ? 10 : 0,
            shadowColor: focused ? `${palette.accent}55` : "transparent",
          },
          emphasis: {
            style: {
              opacity: 1,
              lineWidth: 2.2,
              shadowBlur: 18,
              shadowColor: `${palette.accent}88`,
            },
          },
        },
        {
          type: "text",
          style: {
            x: x + 6,
            y: y + 5,
            text: String(element.number),
            fill: palette.text,
            fontSize: numberSize,
            fontWeight: 700,
            opacity,
          },
          emphasis: {
            style: {
              opacity: 1,
            },
          },
        },
        {
          type: "text",
          style: {
            x: x + width / 2,
            y: y + height * 0.46,
            text: element.symbol,
            fill: palette.text,
            fontSize: symbolSize,
            fontWeight: 800,
            textAlign: "center",
            textVerticalAlign: "middle",
            opacity,
          },
          emphasis: {
            style: {
              opacity: 1,
            },
          },
        },
        ...(showFineText
          ? [
              {
                type: "text" as const,
                style: {
                  x: x + width / 2,
                  y: y + height - 18,
                  text: element.name,
                  fill: palette.text,
                  fontSize: nameSize,
                  fontWeight: 700,
                  textAlign: "center",
                  width: width - 8,
                  overflow: "truncate",
                  opacity,
                },
                emphasis: {
                  style: {
                    opacity: 1,
                  },
                },
              },
              {
                type: "text" as const,
                style: {
                  x: x + width / 2,
                  y: y + height - 7,
                  text: element.mass,
                  fill: palette.text,
                  fontSize: 6,
                  textAlign: "center",
                  width: width - 8,
                  overflow: "truncate",
                  opacity: opacity * 0.78,
                },
                emphasis: {
                  style: {
                    opacity: 0.92,
                  },
                },
              },
            ]
          : []),
      ],
    } as CustomSeriesRenderItemReturn;
  };
};

const createOption = (focusCategory: FocusCategory): EChartsOption => ({
  backgroundColor: "transparent",
  animationDuration: 700,
  animationEasing: "cubicOut",
  tooltip: {
    trigger: "item",
    confine: true,
    borderWidth: 0,
    padding: 0,
    extraCssText: "box-shadow: 0 16px 36px rgba(15,23,42,0.16); border-radius: 12px;",
    formatter: (params) => {
      const element = getTooltipElement(params);

      if (!element) {
        return "";
      }

      const palette = categoryColors[element.category];

      return `
        <div style="min-width:172px;padding:12px 14px;background:#fff;border-radius:12px;border:1px solid #e4e4e7;color:#18181b">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
            <div>
              <div style="font-size:24px;font-weight:800;line-height:1;color:${palette.text}">${element.symbol}</div>
              <div style="margin-top:5px;font-size:13px;font-weight:700">${element.name}</div>
            </div>
            <div style="font-size:12px;font-weight:800;color:#71717a">#${element.number}</div>
          </div>
          <div style="margin-top:10px;display:grid;gap:4px;font-size:12px;line-height:1.35;color:#52525b">
            <div>类别：${categoryLabels[element.category]}</div>
            <div>族 / 行：${element.group} / ${periodicRows[element.row]}</div>
            <div>相对原子质量：${element.mass}</div>
          </div>
        </div>
      `;
    },
  },
  matrix: {
    left: 54,
    top: 36,
    right: 18,
    bottom: 20,
    backgroundStyle: {
      color: "rgba(255,255,255,0.48)",
      borderColor: "#d4d4d8",
      borderWidth: 1,
    },
    x: {
      data: xAxisData,
      levelSize: 30,
      label: {
        color: "#71717a",
        fontSize: 11,
        fontWeight: 700,
      },
      itemStyle: {
        color: "rgba(244,244,245,0.88)",
        borderColor: "#e4e4e7",
      },
      dividerLineStyle: {
        color: "#e4e4e7",
      },
    },
    y: {
      data: yAxisData,
      levelSize: 46,
      label: {
        color: "#71717a",
        fontSize: 11,
        fontWeight: 800,
      },
      itemStyle: {
        color: "rgba(244,244,245,0.88)",
        borderColor: "#e4e4e7",
      },
      dividerLineStyle: {
        color: "#e4e4e7",
      },
    },
    body: {
      itemStyle: {
        color: "rgba(250,250,250,0.56)",
        borderColor: "#e4e4e7",
        borderWidth: 1,
      },
    },
    corner: {
      label: {
        show: false,
      },
      itemStyle: {
        color: "rgba(244,244,245,0.88)",
        borderColor: "#e4e4e7",
      },
    },
  },
  series: [
    {
      type: "custom",
      coordinateSystem: "matrix",
      // 维度命名让 encode 和 tooltip 保持可读，后续扩展字段也不需要猜索引。
      dimensions: ["group", "period", "number", "symbol", "name", "category", "mass"],
      encode: {
        x: 0,
        y: 1,
        tooltip: [2, 3, 4, 5, 6],
        itemName: 3,
      },
      data: chartData,
      renderItem: createRenderItem(focusCategory),
      z: 12,
    },
  ],
});

export default function PeriodicTableChart({ focusCategory }: PeriodicTableChartProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType | null>(null);
  const latestOptionRef = useRef<EChartsOption | null>(null);
  const prefetchedPathsRef = useRef<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const option = useMemo(() => createOption(focusCategory), [focusCategory]);

  // 动态导入 ECharts 可能慢于 React prop 更新，用 ref 保存最新 option 防止首次渲染拿旧值。
  latestOptionRef.current = option;

  useEffect(() => {
    let disposed = false;
    let observer: ResizeObserver | null = null;

    const mountChart = async () => {
      // ECharts 只在浏览器里初始化，避免把大图表库引入 Server Component 渲染路径。
      const echarts = await import("echarts");

      if (disposed || !containerRef.current) {
        return;
      }

      chartRef.current = echarts.init(containerRef.current, null, {
        renderer: "svg",
        useDirtyRect: true,
      });

      const initialOption = latestOptionRef.current;

      if (initialOption) {
        chartRef.current.setOption(initialOption, true);
      }
      chartRef.current.on("finished", () => {
        if (!disposed) {
          setReady(true);
        }
      });
      chartRef.current.on("click", (params) => {
        const element = getEventElement(params);

        if (element) {
          router.push(getElementDetailPath(element));
        }
      });
      chartRef.current.on("mouseover", (params) => {
        const element = getEventElement(params);

        if (!element) {
          return;
        }

        const path = getElementDetailPath(element);

        if (!prefetchedPathsRef.current.has(path)) {
          prefetchedPathsRef.current.add(path);
          router.prefetch(path);
        }
      });

      observer = new ResizeObserver(() => {
        chartRef.current?.resize();
      });
      observer.observe(containerRef.current);
      setReady(true);
    };

    void mountChart();

    return () => {
      disposed = true;
      observer?.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [router]);

  useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  return (
    <div className="anime-surface relative overflow-hidden">
      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm font-black text-[#8f5b72] backdrop-blur-sm dark:bg-[#10131f]/80 dark:text-cyan-100/70">
          加载中...
        </div>
      )}
      <div className="overflow-x-auto">
        <div
          ref={containerRef}
          className="h-160 min-w-260 cursor-pointer sm:h-170"
          aria-label="元素周期表矩阵图"
        />
      </div>
    </div>
  );
}
