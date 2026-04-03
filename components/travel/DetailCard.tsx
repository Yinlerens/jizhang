'use client'

import { X, Navigation } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { planRoute } from '@/lib/route'
import { usePostHog } from 'posthog-js/react'
import type { MapContainerRef } from './MapContainer'

interface DetailCardProps {
  mapRef: React.RefObject<MapContainerRef | null>
}

export default function DetailCard({ mapRef }: DetailCardProps) {
  // 使用选择器精确订阅，避免无关状态变化触发重渲染
  const selectedPOI = useTravelStore((s) => s.selectedPOI)
  const setSelectedPOI = useTravelStore((s) => s.setSelectedPOI)
  const setDestination = useTravelStore((s) => s.setDestination)
  const posthog = usePostHog()

  if (!selectedPOI) return null

  /** 点击"去这里"：设置目的地并立即规划路线 */
  const handleGoHere = () => {
    const transportMode = useTravelStore.getState().transportMode
    posthog.capture('route_planned', {
      destination_name: selectedPOI.name,
      transport_mode: transportMode,
    })

    setDestination({
      lng: selectedPOI.location.lng,
      lat: selectedPOI.location.lat,
      name: selectedPOI.name,
      address: selectedPOI.address,
    })
    setSelectedPOI(null)

    // 立即触发路线规划
    setTimeout(() => planRoute(mapRef), 0)
  }

  /** 关闭详情卡片 */
  const handleClose = () => {
    setSelectedPOI(null)
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-90 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 p-4">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
      >
        <X size={16} />
      </button>

      <div className="flex gap-3">
        {selectedPOI.photos.length > 0 ? (
          <img
            src={selectedPOI.photos[0].url}
            alt={selectedPOI.name}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <Navigation size={20} className="text-zinc-400" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">
            {selectedPOI.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 truncate">{selectedPOI.address}</p>
          {selectedPOI.tel && (
            <p className="text-xs text-zinc-400 mt-0.5">{selectedPOI.tel}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleGoHere}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
      >
        <Navigation size={14} />
        去这里
      </button>
    </div>
  )
}
