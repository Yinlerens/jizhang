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
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between flex-wrap">
          <div className="flex flex-wrap gap-2" aria-label="元素类别筛选">
            {/* 分类按钮驱动 ECharts option 重建，由 chart 组件负责局部变暗和高亮。 */}
            <button
              type="button"
              onClick={() => setFocusCategory("all")}
              className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition duration-200 ${
                focusCategory === "all"
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
                  className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition duration-200 ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                  />
                  <span>{categoryLabels[item.category]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <PeriodicTableChart focusCategory={focusCategory} />
    </div>
  );
}
