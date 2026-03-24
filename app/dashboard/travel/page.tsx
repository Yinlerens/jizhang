'use client'

export default function TravelPage() {
  return (
    <div className="flex h-full bg-white dark:bg-zinc-950">
      {/* Left Panel */}
      <div className="hidden md:flex w-[360px] flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="p-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">出行助手</h2>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        <p className="text-zinc-400">地图加载中...</p>
      </div>
    </div>
  )
}
