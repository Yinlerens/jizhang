'use client'

import { useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import type { MapContainerRef } from './MapContainer'
import type { POIResult } from '@/lib/types'

interface SearchInputProps {
  mapRef: React.RefObject<MapContainerRef | null>
}

export default function SearchInput({ mapRef }: SearchInputProps) {
  // 使用选择器精确订阅，避免无关状态变化触发重渲染
  const searchKeyword = useTravelStore((s) => s.searchKeyword)
  const setSearchKeyword = useTravelStore((s) => s.setSearchKeyword)
  const setSearchResults = useTravelStore((s) => s.setSearchResults)
  const setIsSearching = useTravelStore((s) => s.setIsSearching)

  const doSearch = useCallback(
    (keyword: string) => {
      const AMap = mapRef.current?.getAMap()
      const map = mapRef.current?.getMap()
      if (!AMap || !map || !keyword.trim()) return

      setIsSearching(true)

      // 获取当前位置，用于计算搜索结果的距离
      const currentLocation = useTravelStore.getState().currentLocation

      const placeSearch = new AMap.PlaceSearch({
        pageSize: 20,
        extensions: 'all',
      })

      placeSearch.search(keyword.trim(), (status: string, result: any) => {
        setIsSearching(false)
        if (status === 'complete' && result.poiList?.pois) {
          const pois: POIResult[] = result.poiList.pois.map((poi: any) => {
            const lng = poi.location.getLng()
            const lat = poi.location.getLat()

            // PlaceSearch.search 不返回 distance，手动计算与当前位置的直线距离
            let distance: number | undefined
            if (currentLocation) {
              const from = new AMap.LngLat(currentLocation.lng, currentLocation.lat)
              const to = new AMap.LngLat(lng, lat)
              distance = Math.round(from.distance(to))
            }

            return {
              id: poi.id,
              name: poi.name,
              address: poi.address || '',
              location: { lng, lat },
              distance,
              type: poi.type || '',
            }
          })
          setSearchResults(pois)
        } else {
          setSearchResults([])
        }
      })
    },
    [mapRef, setSearchResults, setIsSearching]
  )

  const handleClear = () => {
    setSearchKeyword('')
    setSearchResults([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch(searchKeyword)
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <Search size={16} className="text-zinc-400 shrink-0" />
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="搜索目的地"
          className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-50 outline-none placeholder:text-zinc-400"
        />
        {searchKeyword && (
          <button onClick={handleClear} className="text-zinc-400 hover:text-zinc-600">
            <X size={14} />
          </button>
        )}
        <button
          onClick={() => doSearch(searchKeyword)}
          className="shrink-0 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-xs font-medium px-3 py-1 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          搜索
        </button>
      </div>
    </div>
  )
}
