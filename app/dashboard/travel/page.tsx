'use client'

import { useRef } from 'react'
import MapContainer, { type MapContainerRef } from '@/components/travel/MapContainer'
import LeftPanel from '@/components/travel/LeftPanel'
import DetailCard from '@/components/travel/DetailCard'

export default function TravelPage() {
  const mapContainerRef = useRef<MapContainerRef>(null)

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950">
      <LeftPanel mapRef={mapContainerRef} />
      <div className="flex-1 relative">
        <MapContainer ref={mapContainerRef} />
        <DetailCard />
      </div>
    </div>
  )
}
