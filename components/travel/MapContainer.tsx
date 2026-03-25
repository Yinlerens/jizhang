'use client'

import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react'
import { loadAMap } from '@/lib/amap'
import { useTravelStore } from '@/lib/stores/travel-store'
import { toast } from 'sonner'
import { Locate } from 'lucide-react'
import type { POIDetail } from '@/lib/types'

export interface MapContainerRef {
  getMap: () => any | null
  getAMap: () => any | null
}

const MapContainer = forwardRef<MapContainerRef>(function MapContainer(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const AMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const locationMarkerRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { setCurrentLocation, setSelectedPOI } = useTravelStore()
  const searchResults = useTravelStore((s) => s.searchResults)

  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
    getAMap: () => AMapRef.current,
  }))

  // Locate user and place marker
  const locateUser = useCallback(() => {
    const AMap = AMapRef.current
    const map = mapRef.current
    if (!AMap || !map) return

    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      showButton: false,
      showCircle: false,
      showMarker: false,
      needAddress: true,
    })

    geolocation.getCurrentPosition((status: string, result: any) => {
      if (status === 'complete' && result.position) {
        const { lng, lat } = result.position
        map.setCenter([lng, lat])
        map.setZoom(15)

        // Update store
        useTravelStore.getState().setCurrentLocation({
          lng,
          lat,
          address: result.formattedAddress || '当前位置',
        })

        // Place/move location marker
        if (locationMarkerRef.current) {
          locationMarkerRef.current.setPosition([lng, lat])
        } else {
          locationMarkerRef.current = new AMap.Marker({
            position: [lng, lat],
            icon: new AMap.Icon({
              size: new AMap.Size(32, 32),
              image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
              imageSize: new AMap.Size(32, 32),
            }),
            anchor: 'bottom-center',
          })
          map.add(locationMarkerRef.current)
        }
      } else {
        const msg = result?.info === 'PERMISSION_DENIED'
          ? '定位权限被拒绝，请手动输入当前位置'
          : '定位失败，请手动输入当前位置'
        toast.error(msg)
      }
    })
  }, [])

  useEffect(() => {
    let mounted = true

    async function initMap() {
      try {
        const AMap = await loadAMap()
        if (!mounted || !containerRef.current) return

        AMapRef.current = AMap

        const map = new AMap.Map(containerRef.current, {
          zoom: 15,
          viewMode: '2D',
        })

        mapRef.current = map

        // Add scale control
        map.addControl(new AMap.Scale())

        // Handle map click — reverse geocode + nearby POI search
        map.on('click', (e: any) => {
          const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]

          const geocoder = new AMap.Geocoder({ extensions: 'all' })
          const placeSearch = new AMap.PlaceSearch({ extensions: 'all', pageSize: 1 })

          geocoder.getAddress(lnglat, (status: string, result: any) => {
            if (status !== 'complete') return

            const address = result.regeocode.formattedAddress || ''

            placeSearch.searchNearBy('', lnglat, 200, (pStatus: string, pResult: any) => {
              const nearbyPOI = pResult?.poiList?.pois?.[0]

              const poi: POIDetail = {
                id: nearbyPOI?.id || String(Date.now()),
                name: nearbyPOI?.name || address,
                address: nearbyPOI?.address || address,
                location: { lng: lnglat[0], lat: lnglat[1] },
                type: nearbyPOI?.type || '',
                photos: nearbyPOI?.photos?.map((p: any) => ({ url: p.url })) || [],
                tel: nearbyPOI?.tel || undefined,
              }

              useTravelStore.getState().setSelectedPOI(poi)
            })
          })
        })

        // Initial geolocation
        if (mounted) {
          setLoading(false)
          // Delay slightly to ensure map is ready
          setTimeout(() => locateUser(), 100)
        }
      } catch (e) {
        console.error('AMap load failed:', e)
        if (mounted) {
          setError(true)
          setLoading(false)
          toast.error('地图加载失败')
        }
      }
    }

    initMap()

    return () => {
      mounted = false
      if (mapRef.current) {
        mapRef.current.destroy()
        mapRef.current = null
      }
    }
  }, [setCurrentLocation, setSelectedPOI, locateUser])

  // Show clickable markers for search results
  useEffect(() => {
    const map = mapRef.current
    const AMap = AMapRef.current
    if (!map || !AMap) return

    // Clear previous search markers
    markersRef.current.forEach((m) => map.remove(m))
    markersRef.current = []

    if (searchResults.length === 0) return

    const markers = searchResults.map((poi, index) => {
      const marker = new AMap.Marker({
        position: [poi.location.lng, poi.location.lat],
        label: {
          content: `<span style="background:#3b82f6;color:#fff;padding:2px 6px;border-radius:10px;font-size:12px;font-weight:600;">${index + 1}</span>`,
          direction: 'top',
          offset: new AMap.Pixel(0, -4),
        },
        extData: poi,
      })

      // Click marker → show detail card
      marker.on('click', () => {
        const data = marker.getExtData()
        const detail: POIDetail = {
          id: data.id,
          name: data.name,
          address: data.address,
          location: data.location,
          type: data.type || '',
          photos: [],
          tel: undefined,
        }

        // Try to fetch richer POI detail
        const placeSearch = new AMap.PlaceSearch({ extensions: 'all' })
        placeSearch.getDetails(data.id, (status: string, result: any) => {
          if (status === 'complete' && result.poiList?.pois?.[0]) {
            const rich = result.poiList.pois[0]
            detail.photos = rich.photos?.map((p: any) => ({ url: p.url })) || []
            detail.tel = rich.tel || undefined
          }
          useTravelStore.getState().setSelectedPOI(detail)
        })

        map.setCenter([data.location.lng, data.location.lat])
        map.setZoom(16)
      })

      return marker
    })

    map.add(markers)
    markersRef.current = markers

    if (markers.length > 0) {
      map.setFitView(markers)
    }
  }, [searchResults])

  if (error) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-2">地图加载失败</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            刷新重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex-1 h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 z-10">
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
            <span>地图加载中...</span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />

      {/* Locate me button */}
      {!loading && (
        <button
          onClick={locateUser}
          className="absolute bottom-6 right-6 z-10 w-10 h-10 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
          title="回到当前位置"
        >
          <Locate size={18} className="text-blue-500" />
        </button>
      )}
    </div>
  )
})

export default MapContainer
