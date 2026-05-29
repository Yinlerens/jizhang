export default function Loading() {
  return (
    <div className="space-y-8" aria-busy="true">
      <span className="sr-only">正在加载</span>

      <div className="space-y-3">
        <div className="h-8 w-40 animate-pulse rounded-md border-2 border-[#26223a]/20 bg-[#ffd657]/70 dark:border-cyan-300/15 dark:bg-cyan-300/20" />
        <div className="h-4 w-64 animate-pulse rounded-md bg-[#ff7aa8]/25 dark:bg-cyan-300/12" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="anime-surface h-36 p-6"
          >
            <div className="h-9 w-9 animate-pulse rounded-md bg-[#ffd657]/70 dark:bg-cyan-300/20" />
            <div className="mt-5 h-4 w-24 animate-pulse rounded-md bg-[#ff7aa8]/25 dark:bg-cyan-300/12" />
            <div className="mt-3 h-7 w-32 animate-pulse rounded-md bg-[#7dd3fc]/35 dark:bg-cyan-300/18" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="anime-surface h-90 p-6"
          >
            <div className="h-5 w-32 animate-pulse rounded-md bg-[#ffd657]/70 dark:bg-cyan-300/20" />
            <div className="mt-8 h-65 animate-pulse rounded-md bg-[#ff7aa8]/20 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
