'use client'

import { X, Car, Footprints, Bike } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { formatDistance, formatDuration } from '@/lib/amap'

const modeIcons = {
  driving: Car,
  walking: Footprints,
  riding: Bike,
}

const modeLabels = {
  driving: '驾车',
  walking: '步行',
  riding: '骑行',
}

export default function RouteInfoBar() {
  const { routeInfo, transportMode, isRouting, clearRoute, destination } = useTravelStore()

  if (isRouting) {
    return (
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-90 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 p-4">
        <div className="flex items-center justify-center gap-2 text-zinc-400">
          <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
          <span className="text-sm">规划路线中...</span>
        </div>
      </div>
    )
  }

  if (!routeInfo) return null

  const ModeIcon = modeIcons[transportMode]

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-90 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 p-4">
      <button
        onClick={clearRoute}
        className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
      >
        <X size={16} />
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
          <ModeIcon size={20} className="text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {modeLabels[transportMode]} · {formatDistance(routeInfo.distance)}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">
            预计 {formatDuration(routeInfo.duration)}
          </p>
        </div>
      </div>

      {destination && (
        <p className="text-xs text-zinc-400 mt-2 truncate">
          目的地：{destination.name}
        </p>
      )}
    </div>
  )
}
