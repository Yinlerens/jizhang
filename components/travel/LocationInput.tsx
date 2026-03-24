'use client'

import { useState } from 'react'
import { Crosshair } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { loadAMap } from '@/lib/amap'
import { toast } from 'sonner'

export default function LocationInput() {
  const { currentLocation, setCurrentLocation } = useTravelStore()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleEdit = () => {
    setIsEditing(true)
    setInputValue(currentLocation?.address || '')
  }

  const handleSubmit = async () => {
    setIsEditing(false)
    const address = inputValue.trim()
    if (!address) return

    try {
      const AMap = await loadAMap()
      const geocoder = new AMap.Geocoder({ city: '' })
      geocoder.getLocation(address, (status: string, result: any) => {
        if (status === 'complete' && result.geocodes?.length > 0) {
          const { location } = result.geocodes[0]
          setCurrentLocation({
            lng: location.getLng(),
            lat: location.getLat(),
            address,
          })
        } else {
          toast.error('未找到该地址')
        }
      })
    } catch {
      toast.error('地址解析失败')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <Crosshair size={16} className="text-blue-500 shrink-0" />
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="输入当前位置"
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-50 outline-none placeholder:text-zinc-400"
          />
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
    </div>
  )
}
