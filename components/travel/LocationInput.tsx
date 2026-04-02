'use client'

import { useState, useCallback } from 'react'
import { Crosshair, MapPin, Search } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { loadAMap } from '@/lib/amap'
import { toast } from 'sonner'

interface Suggestion {
  name: string
  address: string
  lng: number
  lat: number
}

export default function LocationInput() {
  // 使用选择器精确订阅，避免无关状态变化触发重渲染
  const currentLocation = useTravelStore((s) => s.currentLocation)
  const setCurrentLocation = useTravelStore((s) => s.setCurrentLocation)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    setInputValue(currentLocation?.address || '')
    setSuggestions([])
  }

  const doSearch = useCallback(async () => {
    const keyword = inputValue.trim()
    if (keyword.length < 2) {
      setSuggestions([])
      return
    }
    setIsSearching(true)
    try {
      const AMap = await loadAMap()
      const placeSearch = new AMap.PlaceSearch({ pageSize: 5, extensions: 'base' })
      placeSearch.search(keyword, (status: string, result: any) => {
        setIsSearching(false)
        if (status === 'complete' && result.poiList?.pois) {
          setSuggestions(
            result.poiList.pois.map((poi: any) => ({
              name: poi.name,
              address: poi.address || '',
              lng: poi.location.getLng(),
              lat: poi.location.getLat(),
            }))
          )
        } else {
          setSuggestions([])
          toast.error('未找到该地址')
        }
      })
    } catch {
      setIsSearching(false)
      setSuggestions([])
      toast.error('地址解析失败')
    }
  }, [inputValue])

  const handleSelectSuggestion = (s: Suggestion) => {
    setCurrentLocation({ lng: s.lng, lat: s.lat, address: s.name })
    setIsEditing(false)
    setSuggestions([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch()
    if (e.key === 'Escape') {
      setIsEditing(false)
      setSuggestions([])
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <Crosshair size={16} className="text-blue-500 shrink-0" />
        {isEditing ? (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => {
                setTimeout(() => {
                  setIsEditing(false)
                  setSuggestions([])
                }, 200)
              }}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="输入当前位置"
              className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-50 outline-none placeholder:text-zinc-400"
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={doSearch}
              disabled={isSearching}
              className="shrink-0 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-xs font-medium px-3 py-1 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isSearching ? '...' : '搜索'}
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="flex-1 text-left text-sm truncate"
          >
            {currentLocation ? (
              <span className="text-zinc-900 dark:text-zinc-50">{currentLocation.address}</span>
            ) : (
              <span className="text-zinc-400">定位中...</span>
            )}
          </button>
        )}
      </div>

      {/* 地址搜索建议下拉列表 */}
      {isEditing && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg z-30 max-h-48 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelectSuggestion(s)}
              className="w-full flex items-start gap-2 px-3 py-2.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <MapPin size={14} className="text-zinc-400 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-900 dark:text-zinc-50 truncate">{s.name}</p>
                <p className="text-xs text-zinc-500 truncate">{s.address}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
