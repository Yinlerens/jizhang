// 高德地图加载器（单例模式）及格式化工具

let AMapInstance: any = null

/**
 * 加载高德地图 JS API
 * 使用动态 import 避免 SSR 环境下 window 未定义的错误
 */
export async function loadAMap(): Promise<any> {
  if (AMapInstance) return AMapInstance

  // 动态导入，避免 SSR 时模块级别访问 window 报错
  const AMapLoader = (await import('@amap/amap-jsapi-loader')).default

  // 安全密钥配置，必须在加载前设置
  ;(window as any)._AMapSecurityConfig = {
    securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || '',
  }

  AMapInstance = await AMapLoader.load({
    key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
    version: '2.0',
    plugins: [
      'AMap.PlaceSearch',   // POI 搜索
      'AMap.Geocoder',      // 地理/逆地理编码
      'AMap.Driving',       // 驾车路线规划
      'AMap.Walking',       // 步行路线规划
      'AMap.Riding',        // 骑行路线规划
      'AMap.Geolocation',   // 浏览器定位
      'AMap.Scale',         // 比例尺控件
    ],
  })

  return AMapInstance
}

/** 格式化距离：米 → "xxx米" 或 "x.x公里"（兼容字符串类型） */
export function formatDistance(meters: number | string | undefined): string {
  const m = Number(meters)
  if (!m || isNaN(m)) return ''
  if (m < 1000) {
    return `${Math.round(m)}米`
  }
  return `${(m / 1000).toFixed(1)}公里`
}

/** 格式化时长：秒 → "x小时x分钟" 或 "x分钟" */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}
