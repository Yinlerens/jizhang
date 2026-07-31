import { PanelLeft } from "lucide-react";

export function ConsoleShellLoading() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#f4f6f5] text-slate-950 lg:flex-row"
      aria-busy="true"
      aria-label="控制台加载中"
    >
      <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:h-screen lg:w-60 lg:border-r lg:border-b-0">
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#143f3b] text-white">
            <PanelLeft className="size-4" />
          </span>
          <span>
            <span className="block text-base font-semibold">GachaOps</span>
            <span className="block text-[11px] font-medium text-slate-400">LiveOps Console</span>
          </span>
        </div>

        <div className="animate-pulse border-b border-slate-200 px-4 py-3">
          <div className="h-9 rounded-md bg-slate-100" />
          <div className="mt-2 h-3 w-36 rounded bg-slate-100" />
        </div>

        <div className="hidden animate-pulse space-y-5 px-3 py-4 lg:block">
          {[3, 4].map((count, groupIndex) => (
            <div key={groupIndex}>
              <div className="mb-2 ml-2 h-2.5 w-14 rounded bg-slate-100" />
              <div className="space-y-1">
                {Array.from({ length: count }, (_, index) => (
                  <div className="h-9 rounded-md bg-slate-100" key={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-hidden lg:h-screen">
        <div className="mx-auto w-full max-w-[1680px] p-3 sm:p-5 lg:p-6">
          <ConsolePageLoading />
        </div>
      </main>
    </div>
  );
}

export function ConsolePageLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="页面加载中">
      <header className="border-b border-slate-200 pb-5">
        <div className="h-3 w-20 rounded bg-slate-200" />
        <div className="mt-3 h-7 w-40 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-56 max-w-full rounded bg-slate-100" />
      </header>

      <div className="mt-6 border border-slate-200 bg-white">
        <div className="flex h-12 items-center gap-4 border-b border-slate-200 px-4">
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="ml-auto h-8 w-24 rounded bg-slate-100" />
        </div>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            className="grid h-14 grid-cols-[minmax(120px,1.4fr)_minmax(90px,1fr)_72px] items-center gap-4 border-b border-slate-100 px-4 last:border-b-0"
            key={index}
          >
            <div className="h-3 rounded bg-slate-100" />
            <div className="h-3 rounded bg-slate-100" />
            <div className="h-6 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
