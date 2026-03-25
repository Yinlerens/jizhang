'use client'

import { useRef } from 'react'
import MapContainer, { type MapContainerRef } from '@/components/travel/MapContainer'
import LeftPanel from '@/components/travel/LeftPanel'
import DetailCard from '@/components/travel/DetailCard'
import RouteInfoBar from '@/components/travel/RouteInfoBar'

export default function TravelPage() {
  const mapContainerRef = useRef<MapContainerRef>(null)

  return (
    <div className="flex h-[100dvh] bg-white dark:bg-zinc-950">
      <LeftPanel mapRef={mapContainerRef} />
      <div className="flex-1 relative flex flex-col">
        <MapContainer ref={mapContainerRef} />
        <DetailCard mapRef={mapContainerRef} />
        <RouteInfoBar />
      </div>
    </div>
  )
}
