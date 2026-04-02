"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from "react";
import { loadAMap } from "@/lib/amap";
import { useTravelStore } from "@/lib/stores/travel-store";
import { toast } from "sonner";
import { Locate } from "lucide-react";
import type { POIDetail } from "@/lib/types";

/** 暴露给父组件的地图操作接口 */
export interface MapContainerRef {
  getMap: () => any | null;
  getAMap: () => any | null;
}

const MapContainer = forwardRef<MapContainerRef>(function MapContainer(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const AMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);          // 搜索结果标记
  const locationMarkerRef = useRef<any>(null);   // 当前定位标记
  const clickMarkerRef = useRef<any>(null);      // 地图点击标记
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // 使用选择器精确订阅，避免无关状态变化触发重渲染
  const setCurrentLocation = useTravelStore((s) => s.setCurrentLocation);
  const setSelectedPOI = useTravelStore((s) => s.setSelectedPOI);
  const searchResults = useTravelStore((s) => s.searchResults);

  // 暴露地图实例和 AMap 对象给父组件
  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
    getAMap: () => AMapRef.current,
  }));

  /** 浏览器定位：获取当前位置并放置标记 */
  const locateUser = useCallback(() => {
    const AMap = AMapRef.current;
    const map = mapRef.current;
    if (!AMap || !map) return;

    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: false, // true 会显著拖慢定位速度，IP 定位场景下 false 足够
      timeout: 10000,
      showButton: false,
      showCircle: false,
      showMarker: false,
      needAddress: true,
    });

    geolocation.getCurrentPosition((status: string, result: any) => {
      if (status === "complete" && result.position) {
        const { lng, lat } = result.position;
        map.setCenter([lng, lat]);
        map.setZoom(15);

        // 更新全局位置状态
        useTravelStore.getState().setCurrentLocation({
          lng,
          lat,
          address: result.formattedAddress || "当前位置",
        });

        // 放置或移动定位标记
        if (locationMarkerRef.current) {
          locationMarkerRef.current.setPosition([lng, lat]);
        } else {
          locationMarkerRef.current = new AMap.Marker({
            position: [lng, lat],
            icon: new AMap.Icon({
              size: new AMap.Size(19, 31),
              image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
              imageSize: new AMap.Size(19, 31),
            }),
            anchor: "bottom-center",
          });
          map.add(locationMarkerRef.current);
        }
      } else {
        const msg =
          result?.info === "PERMISSION_DENIED"
            ? "定位权限被拒绝，请手动输入当前位置"
            : "定位失败，请手动输入当前位置";
        toast.error(msg);
      }
    });
  }, []);

  /** 初始化地图 */
  useEffect(() => {
    let mounted = true;

    async function initMap() {
      try {
        const AMap = await loadAMap();
        if (!mounted || !containerRef.current) return;

        AMapRef.current = AMap;

        const map = new AMap.Map(containerRef.current, {
          zoom: 15,
          viewMode: "2D",
        });

        mapRef.current = map;

        // 添加比例尺控件
        map.addControl(new AMap.Scale());

        // 地图点击事件：逆地理编码 + 附近 POI 搜索
        map.on("click", (e: any) => {
          const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];

          // 放置或移动点击标记
          if (clickMarkerRef.current) {
            clickMarkerRef.current.setPosition(lnglat);
          } else {
            clickMarkerRef.current = new AMap.Marker({
              position: lnglat,
              anchor: "bottom-center",
            });
            map.add(clickMarkerRef.current);
          }

          const geocoder = new AMap.Geocoder({ extensions: "all" });
          const placeSearch = new AMap.PlaceSearch({ extensions: "all", pageSize: 1 });

          // 逆地理编码获取地址
          geocoder.getAddress(lnglat, (status: string, result: any) => {
            if (status !== "complete") return;

            const address = result.regeocode.formattedAddress || "";

            // 搜索附近 200 米内的 POI
            placeSearch.searchNearBy("", lnglat, 200, (pStatus: string, pResult: any) => {
              const nearbyPOI = pResult?.poiList?.pois?.[0];

              const poi: POIDetail = {
                id: nearbyPOI?.id || String(Date.now()),
                name: nearbyPOI?.name || address,
                address: nearbyPOI?.address || address,
                location: { lng: lnglat[0], lat: lnglat[1] },
                type: nearbyPOI?.type || "",
                photos: Array.isArray(nearbyPOI?.photos) ? nearbyPOI.photos.map((p: any) => ({ url: p.url })) : [],
                tel: nearbyPOI?.tel || undefined,
              };

              useTravelStore.getState().setSelectedPOI(poi);
            });
          });
        });

        // 地图加载完成后自动定位
        if (mounted) {
          setLoading(false);
          setTimeout(() => locateUser(), 100);
        }
      } catch (e) {
        console.error("地图加载失败:", e);
        if (mounted) {
          setError(true);
          setLoading(false);
          toast.error("地图加载失败");
        }
      }
    }

    initMap();

    return () => {
      mounted = false;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [setCurrentLocation, setSelectedPOI, locateUser]);

  /** 搜索结果变化时，在地图上显示可点击的标记 */
  useEffect(() => {
    const map = mapRef.current;
    const AMap = AMapRef.current;
    if (!map || !AMap) return;

    // 清除之前的搜索标记
    markersRef.current.forEach((m) => map.remove(m));
    markersRef.current = [];

    if (searchResults.length === 0) return;

    const markers = searchResults.map((poi) => {
      const marker = new AMap.Marker({
        position: [poi.location.lng, poi.location.lat],
        extData: poi,
      });

      // 点击标记 → 获取详情并展示详情卡片
      marker.on("click", () => {
        const data = marker.getExtData();
        const detail: POIDetail = {
          id: data.id,
          name: data.name,
          address: data.address,
          location: data.location,
          type: data.type || "",
          photos: [],
          tel: undefined,
        };

        // 尝试获取更丰富的 POI 详情（照片、电话等）
        const placeSearch = new AMap.PlaceSearch({ extensions: "all" });
        placeSearch.getDetails(data.id, (status: string, result: any) => {
          if (status === "complete" && result.poiList?.pois?.[0]) {
            const rich = result.poiList.pois[0];
            detail.photos = rich.photos?.map((p: any) => ({ url: p.url })) || [];
            detail.tel = rich.tel || undefined;
          }
          useTravelStore.getState().setSelectedPOI(detail);
        });

        map.setCenter([data.location.lng, data.location.lat]);
        map.setZoom(16);
      });

      return marker;
    });

    map.add(markers);
    markersRef.current = markers;

    // 自适应视图，展示所有搜索结果标记
    if (markers.length > 0) {
      map.setFitView(markers);
    }
  }, [searchResults]);

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
    );
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

      {/* 回到当前位置按钮 */}
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
  );
});

export default MapContainer;
