"use client";

import { useMemo, useState } from "react";
import { Hexagon } from "lucide-react";
import PeriodicTableChart from "@/components/charts/PeriodicTableChart";
import {
  categoryColors,
  categoryCounts,
  categoryLabels,
  periodicElements,
  type ElementCategory,
} from "@/lib/periodic-table";

type FocusCategory = ElementCategory | "all";

export default function PeriodicTableWorkbench() {
  const [focusCategory, setFocusCategory] = useState<FocusCategory>("all");

  // 当前筛选类别只影响强调状态，不从图表数据中删除元素，保持周期表结构稳定。
  const visibleCount = useMemo(() => {
    if (focusCategory === "all") {
      return periodicElements.length;
    }

    return periodicElements.filter((element) => element.category === focusCategory).length;
  }, [focusCategory]);

  return (
    <div className="min-w-0 space-y-4">
      <div className="anime-surface p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between flex-wrap">
          <div className="flex flex-wrap gap-2" aria-label="元素类别筛选">
            {/* 分类按钮驱动 ECharts option 重建，由 chart 组件负责局部变暗和高亮。 */}
            <button
              type="button"
              onClick={() => setFocusCategory("all")}
              className={`flex h-9 items-center gap-2 rounded-md border-2 px-3 text-sm font-black transition duration-200 ${
                focusCategory === "all"
                  ? "border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[3px_3px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none"
                  : "border-[#26223a]/15 bg-white/55 text-[#6e6172] hover:border-[#26223a] hover:bg-[#fff1f6] dark:border-cyan-300/10 dark:bg-white/5 dark:text-cyan-100/70 dark:hover:border-cyan-300/30"
              }`}
            >
              <Hexagon size={15} />
              全部
            </button>

            {categoryCounts.map((item) => {
              const active = focusCategory === item.category;
              const palette = categoryColors[item.category];

              return (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => setFocusCategory(item.category)}
                  className={`flex h-9 items-center gap-2 rounded-md border-2 px-3 text-sm font-black transition duration-200 ${
                    active
                      ? "border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[3px_3px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none"
                      : "border-[#26223a]/15 bg-white/55 text-[#6e6172] hover:border-[#26223a] hover:bg-[#fff1f6] dark:border-cyan-300/10 dark:bg-white/5 dark:text-cyan-100/70 dark:hover:border-cyan-300/30"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-sm border border-[#26223a]"
                    style={{ backgroundColor: palette.accent }}
                  />
                  <span>{categoryLabels[item.category]}</span>
                </button>
              );
            })}
          </div>
          <div className="inline-flex h-9 w-fit items-center rounded-md border-2 border-[#26223a] bg-[#ff7aa8] px-3 font-mono text-xs font-black text-white shadow-[3px_3px_0_#26223a] dark:border-cyan-200 dark:bg-fuchsia-500 dark:shadow-none">
            {visibleCount} ELEMENTS
          </div>
        </div>
      </div>

      <PeriodicTableChart focusCategory={focusCategory} />
    </div>
  );
}
