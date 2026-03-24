'use client'

import { X, Navigation } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'

export default function DetailCard() {
  const { selectedPOI, setSelectedPOI, setDestination } = useTravelStore()

  if (!selectedPOI) return null

  const handleGoHere = () => {
    setDestination({
      lng: selectedPOI.location.lng,
      lat: selectedPOI.location.lat,
      name: selectedPOI.name,
      address: selectedPOI.address,
    })
    setSelectedPOI(null)
  }

  const handleClose = () => {
    setSelectedPOI(null)
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[360px] bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 p-4">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
      >
        <X size={16} />
      </button>

      <div className="flex gap-3">
        {/* Photo */}
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
