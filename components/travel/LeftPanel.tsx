'use client'

import { useEffect } from 'react'
import { Navigation } from 'lucide-react'
import { toast } from 'sonner'
import LocationInput from './LocationInput'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import TransportModeSelector from './TransportModeSelector'
import type { MapContainerRef } from './MapContainer'
import { useTravelStore } from '@/lib/stores/travel-store'

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
  const { destination, currentLocation, transportMode, setRouteInfo, setIsRouting, clearRoute } = useTravelStore()

  const handleNavigate = () => {
    const AMap = mapRef.current?.getAMap()
    const map = mapRef.current?.getMap()
    if (!AMap || !map || !destination || !currentLocation) return

    setIsRouting(true)
    clearRoute()

    // Clear previous overlays
    map.clearMap()

    const start = [currentLocation.lng, currentLocation.lat]
    const end = [destination.lng, destination.lat]

    let service: any
    if (transportMode === 'driving') {
      service = new AMap.Driving({ policy: AMap.DrivingPolicy.LEAST_TIME })
    } else if (transportMode === 'walking') {
      service = new AMap.Walking()
    } else {
      service = new AMap.Riding()
    }

    service.search(start, end, (status: string, result: any) => {
      setIsRouting(false)

      if (status === 'complete') {
        const route = result.routes[0]

        // Extract path points
        const path: any[] = []
        const steps = transportMode === 'riding' ? route.rides : route.steps
        steps.forEach((step: any) => {
          path.push(...step.path)
        })

        // Draw route line
        const colors = { driving: '#3b82f6', walking: '#22c55e', riding: '#f97316' }
        const polyline = new AMap.Polyline({
          path,
          strokeColor: colors[transportMode],
          strokeWeight: 6,
          strokeOpacity: 0.9,
          lineJoin: 'round',
          lineCap: 'round',
        })
        map.add(polyline)

        // Add start/end markers
        new AMap.Marker({ map, position: start, label: { content: '起', direction: 'top' } })
        new AMap.Marker({ map, position: end, label: { content: '终', direction: 'top' } })

        // Fit view
        map.setFitView()

        // Update store
        setRouteInfo({
          distance: route.distance ?? 0,
          duration: route.time ?? 0,
        })
      } else {
        toast.error('无法规划该路线，请尝试其他出行方式')
      }
    })
  }

  // Re-plan when transport mode changes and there's an active route
  useEffect(() => {
    const { routeInfo, destination, currentLocation } = useTravelStore.getState()
    if (routeInfo && destination && currentLocation) {
      handleNavigate()
    }
  }, [transportMode])

  const disabled = !destination || !currentLocation

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
      <button
        onClick={handleNavigate}
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
