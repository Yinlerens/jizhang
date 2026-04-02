"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { type MapContainerRef } from "@/components/travel/MapContainer";
import LeftPanel from "@/components/travel/LeftPanel";
import DetailCard from "@/components/travel/DetailCard";
import RouteInfoBar from "@/components/travel/RouteInfoBar";

// 懒加载地图组件（体积大，且依赖浏览器 API，禁用 SSR）
const MapContainer = dynamic(() => import("@/components/travel/MapContainer"), { ssr: false });

export default function TravelPage() {
  const mapContainerRef = useRef<MapContainerRef>(null);

  return (
    <div className="flex h-dvh bg-white dark:bg-zinc-950">
      <LeftPanel mapRef={mapContainerRef} />
      <div className="flex-1 relative flex flex-col">
        <MapContainer ref={mapContainerRef} />
        <DetailCard mapRef={mapContainerRef} />
        <RouteInfoBar />
      </div>
    </div>
  );
}
