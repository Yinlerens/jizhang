'use client'

import LocationInput from './LocationInput'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import TransportModeSelector from './TransportModeSelector'
import type { MapContainerRef } from './MapContainer'

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

      {/* Navigate Button — added in Task 11 */}
    </div>
  )
}
