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
  const {
    searchKeyword,
    setSearchKeyword,
    setSearchResults,
    setIsSearching,
  } = useTravelStore()

  const doSearch = useCallback(
    (keyword: string) => {
      const AMap = mapRef.current?.getAMap()
      const map = mapRef.current?.getMap()
      if (!AMap || !map || !keyword.trim()) return

      setIsSearching(true)

      const placeSearch = new AMap.PlaceSearch({
        pageSize: 20,
        extensions: 'all',
      })

      placeSearch.search(keyword.trim(), (status: string, result: any) => {
        setIsSearching(false)
        if (status === 'complete' && result.poiList?.pois) {
          const pois: POIResult[] = result.poiList.pois.map((poi: any) => ({
            id: poi.id,
            name: poi.name,
            address: poi.address || '',
            location: {
              lng: poi.location.getLng(),
              lat: poi.location.getLat(),
            },
            distance: poi.distance,
            type: poi.type || '',
          }))
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
