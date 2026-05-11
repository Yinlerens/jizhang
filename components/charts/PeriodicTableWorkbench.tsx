"use client";

import { useMemo, useState } from "react";
import { Atom, Hexagon } from "lucide-react";
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
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:ring-cyan-800">
              <Atom size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">元素周期表</h2>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {visibleCount} / {periodicElements.length} 元素
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="元素类别筛选">
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

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-zinc-50 p-3 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">矩阵列</p>
            <p className="mt-1 text-lg font-black text-zinc-900 dark:text-zinc-50">18</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">矩阵行</p>
            <p className="mt-1 text-lg font-black text-zinc-900 dark:text-zinc-50">9</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-3 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">当前焦点</p>
            <p className="mt-1 truncate text-lg font-black text-zinc-900 dark:text-zinc-50">
              {focusCategory === "all" ? "全部元素" : categoryLabels[focusCategory]}
            </p>
          </div>
        </div>
      </div>

      <PeriodicTableChart focusCategory={focusCategory} />
    </div>
  );
}
