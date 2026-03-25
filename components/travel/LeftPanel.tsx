'use client'

import { useEffect } from 'react'
import { Navigation } from 'lucide-react'
import LocationInput from './LocationInput'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import TransportModeSelector from './TransportModeSelector'
import type { MapContainerRef } from './MapContainer'
import { useTravelStore } from '@/lib/stores/travel-store'
import { planRoute } from '@/lib/route'

interface LeftPanelProps {
  mapRef: React.RefObject<MapContainerRef | null>
}

export default function LeftPanel({ mapRef }: LeftPanelProps) {
  return (
    <div className="hidden md:flex w-[360px] flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">出行助手</h2>
        <LocationInput />
        <SearchInput mapRef={mapRef} />
        <TransportModeSelector />
      </div>

      <div className="flex-1 overflow-y-auto">
        <SearchResults mapRef={mapRef} />
      </div>

      <NavigateButton mapRef={mapRef} />
    </div>
  )
}

function NavigateButton({ mapRef }: { mapRef: React.RefObject<MapContainerRef | null> }) {
  const { destination, currentLocation, transportMode } = useTravelStore()

  // Re-plan when transport mode changes and there's an active route
  useEffect(() => {
    const { routeInfo, destination, currentLocation } = useTravelStore.getState()
    if (routeInfo && destination && currentLocation) {
      planRoute(mapRef)
    }
  }, [transportMode, mapRef])

  const disabled = !destination || !currentLocation

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => planRoute(mapRef)}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
          disabled
            ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
            : 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
        }`}
      >
        <Navigation size={16} />
        开始导航
      </button>
    </div>
  )
}
