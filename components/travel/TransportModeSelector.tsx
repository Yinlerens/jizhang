'use client'

import { Car, Footprints, Bike } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import type { TransportMode } from '@/lib/types'

const modes: { value: TransportMode; label: string; icon: React.ElementType }[] = [
  { value: 'driving', label: '驾车', icon: Car },
  { value: 'walking', label: '步行', icon: Footprints },
  { value: 'riding', label: '骑行', icon: Bike },
]

export default function TransportModeSelector() {
  const { transportMode, setTransportMode } = useTravelStore()

  return (
    <div className="flex gap-2">
      {modes.map((mode) => {
        const isActive = transportMode === mode.value
        return (
          <button
            key={mode.value}
            onClick={() => setTransportMode(mode.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <mode.icon size={14} />
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
