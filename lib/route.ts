/**
 * 路线规划模块
 * 支持驾车、步行、骑行三种出行方式
 * 被 DetailCard（去这里）和 NavigateButton（开始导航）共同调用
 */

import { useTravelStore } from '@/lib/stores/travel-store'
import { toast } from 'sonner'
import type { MapContainerRef } from '@/components/travel/MapContainer'
import type { TransportMode } from '@/lib/types'

/** 规划路线并在地图上绘制 */
export function planRoute(mapRef: React.RefObject<MapContainerRef | null>) {
  const { currentLocation, destination, transportMode, setIsRouting, clearRoute, setRouteInfo } =
    useTravelStore.getState()

  const AMap = mapRef.current?.getAMap()
  const map = mapRef.current?.getMap()

  // 校验必要条件
  if (!AMap || !map || !destination || !currentLocation) {
    if (!currentLocation) toast.error('请先设置当前位置')
    return
  }

  setIsRouting(true)
  clearRoute()
  map.clearMap()

  const start = [currentLocation.lng, currentLocation.lat]
  const end = [destination.lng, destination.lat]

  // 根据出行方式创建对应的路线规划服务
  let service: any
  if (transportMode === 'driving') {
    service = new AMap.Driving({ policy: AMap.DrivingPolicy.LEAST_TIME })
  } else if (transportMode === 'walking') {
    service = new AMap.Walking()
  } else {
    service = new AMap.Riding({ policy: 0 }) // 0=综合, 1=推荐, 2=最快
  }

  // 发起路线搜索
  service.search(start, end, (status: string, result: any) => {
    setIsRouting(false)

    if (status === 'complete') {
      const route = result.routes[0]

      // 提取路线坐标点（骑行用 rides，其他用 steps）
      const path: any[] = []
      const steps = transportMode === 'riding' ? route.rides : route.steps
      steps.forEach((step: any) => {
        path.push(...step.path)
      })

      // 出行方式对应的路线颜色
      const colors: Record<TransportMode, string> = { driving: '#3b82f6', walking: '#22c55e', riding: '#f97316' }

      // 绘制路线折线
      const polyline = new AMap.Polyline({
        path,
        strokeColor: colors[transportMode],
        strokeWeight: 6,
        strokeOpacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round',
      })
      map.add(polyline)

      // 添加起点和终点标记
      new AMap.Marker({ map, position: start, label: { content: '起', direction: 'top' } })
      new AMap.Marker({ map, position: end, label: { content: '终', direction: 'top' } })

      // 自适应视图，展示完整路线
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
