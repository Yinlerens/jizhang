import { useTravelStore } from '@/lib/stores/travel-store'
import { toast } from 'sonner'
import type { MapContainerRef } from '@/components/travel/MapContainer'
import type { TransportMode } from '@/lib/types'

export function planRoute(mapRef: React.RefObject<MapContainerRef | null>) {
  const { currentLocation, destination, transportMode, setIsRouting, clearRoute, setRouteInfo } =
    useTravelStore.getState()

  const AMap = mapRef.current?.getAMap()
  const map = mapRef.current?.getMap()
  if (!AMap || !map || !destination || !currentLocation) {
    if (!currentLocation) toast.error('请先设置当前位置')
    return
  }

  setIsRouting(true)
  clearRoute()
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

      const path: any[] = []
      const steps = transportMode === 'riding' ? route.rides : route.steps
      steps.forEach((step: any) => {
        path.push(...step.path)
      })

      const colors: Record<TransportMode, string> = { driving: '#3b82f6', walking: '#22c55e', riding: '#f97316' }
      const polyline = new AMap.Polyline({
        path,
        strokeColor: colors[transportMode],
        strokeWeight: 6,
        strokeOpacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round',
      })
      map.add(polyline)

      new AMap.Marker({ map, position: start, label: { content: '起', direction: 'top' } })
      new AMap.Marker({ map, position: end, label: { content: '终', direction: 'top' } })

      map.setFitView()

      setRouteInfo({
        distance: route.distance ?? 0,
        duration: route.time ?? 0,
      })
    } else {
      toast.error('无法规划该路线，请尝试其他出行方式')
    }
  })
}
