export default function Loading() {
  return (
    <div className="space-y-8" aria-busy="true">
      <span className="sr-only">正在加载</span>

      <div className="space-y-3">
        <div className="h-7 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-64 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="h-9 w-9 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-5 h-4 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-3 h-7 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="h-90 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-8 h-65 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-950" />
          </div>
        ))}
      </div>
    </div>
  )
}
