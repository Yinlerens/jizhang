import AMapLoader from '@amap/amap-jsapi-loader'

let AMapInstance: any = null

export async function loadAMap(): Promise<any> {
  if (AMapInstance) return AMapInstance

  // Security config must be set before loading
  ;(window as any)._AMapSecurityConfig = {
    securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || '',
  }

  AMapInstance = await AMapLoader.load({
    key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
    version: '2.0',
    plugins: [
      'AMap.PlaceSearch',
      'AMap.Geocoder',
      'AMap.Driving',
      'AMap.Walking',
      'AMap.Riding',
      'AMap.Geolocation',
      'AMap.Scale',
    ],
  })

  return AMapInstance
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}米`
  }
  return `${(meters / 1000).toFixed(1)}公里`
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}
