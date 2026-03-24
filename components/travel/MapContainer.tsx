'use client'

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { loadAMap } from '@/lib/amap'
import { useTravelStore } from '@/lib/stores/travel-store'
import { toast } from 'sonner'
import type { POIDetail } from '@/lib/types'

export interface MapContainerRef {
  getMap: () => any | null
  getAMap: () => any | null
}

const MapContainer = forwardRef<MapContainerRef>(function MapContainer(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const AMapRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { setCurrentLocation, setSelectedPOI } = useTravelStore()

  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
    getAMap: () => AMapRef.current,
  }))

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

            // Also search nearby for POI details
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

        // Try to geolocate user
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          showButton: false,
          showCircle: false,
          showMarker: false,
          needAddress: true,
        })

        geolocation.getCurrentPosition((status: string, result: any) => {
          if (!mounted) return
          if (status === 'complete' && result.position) {
            const { lng, lat } = result.position
            map.setCenter([lng, lat])
            setCurrentLocation({
              lng,
              lat,
              address: result.formattedAddress || '当前位置',
            })
          } else {
            const msg = result?.info === 'PERMISSION_DENIED'
              ? '定位权限被拒绝，请手动输入当前位置'
              : '定位失败，请手动输入当前位置'
            toast.error(msg)
          }
        })

        if (mounted) setLoading(false)
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
  }, [setCurrentLocation, setSelectedPOI])

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
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
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 z-10">
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
            <span>地图加载中...</span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  )
})

export default MapContainer
