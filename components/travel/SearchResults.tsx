'use client'

import { MapPin } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { formatDistance } from '@/lib/amap'
import { loadAMap } from '@/lib/amap'
import type { MapContainerRef } from './MapContainer'
import type { POIDetail } from '@/lib/types'

interface SearchResultsProps {
  mapRef: React.RefObject<MapContainerRef | null>
}

export default function SearchResults({ mapRef }: SearchResultsProps) {
  const {
    searchResults,
    isSearching,
    searchKeyword,
    selectedPOI,
  } = useTravelStore()

  const handleSelect = async (poi: (typeof searchResults)[0]) => {
    // Center map on selected POI
    const map = mapRef.current?.getMap()
    if (map) {
      map.setCenter([poi.location.lng, poi.location.lat])
      map.setZoom(16)
    }

    // Build detail and show detail card
    const detail: POIDetail = {
      id: poi.id,
      name: poi.name,
      address: poi.address,
      location: poi.location,
      type: poi.type || '',
      photos: [],
      tel: undefined,
    }

    // Try to fetch richer POI info (photos, tel)
    try {
      const AMap = await loadAMap()
      const placeSearch = new AMap.PlaceSearch({ extensions: 'all' })
      placeSearch.getDetails(poi.id, (status: string, result: any) => {
        if (status === 'complete' && result.poiList?.pois?.[0]) {
          const rich = result.poiList.pois[0]
          detail.photos = rich.photos?.map((p: any) => ({ url: p.url })) || []
          detail.tel = rich.tel || undefined
        }
        useTravelStore.getState().setSelectedPOI(detail)
      })
    } catch {
      useTravelStore.getState().setSelectedPOI(detail)
    }
  }

  if (isSearching) {
    return (
      <div className="px-4 py-3 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex items-start gap-3">
            <div className="w-4 h-4 mt-0.5 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (searchKeyword.length >= 2 && searchResults.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-zinc-400">
        未找到相关地点
      </div>
    )
  }

  if (searchResults.length === 0) return null

  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {searchResults.map((poi) => {
        const isSelected = selectedPOI?.id === poi.id
        return (
          <button
            key={poi.id}
            onClick={() => handleSelect(poi)}
            className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
              isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <MapPin
              size={16}
              className={`mt-0.5 shrink-0 ${
                isSelected ? 'text-blue-500' : 'text-zinc-400'
              }`}
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  isSelected
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-900 dark:text-zinc-50'
                }`}
              >
                {poi.name}
              </p>
              <p className="text-xs text-zinc-500 truncate mt-0.5">{poi.address}</p>
            </div>
            {formatDistance(poi.distance) && (
              <span className="text-xs text-zinc-400 shrink-0 mt-0.5">
                {formatDistance(poi.distance)}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
