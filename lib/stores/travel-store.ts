/**
 * 出行助手状态管理（Zustand）
 * 管理：当前位置、目的地、搜索、路线规划、POI 详情等状态
 */

import { create } from 'zustand'
import type {
  POIResult,
  POIDetail,
  TransportMode,
  RouteInfo,
  LocationInfo,
  DestinationInfo,
} from '@/lib/types'

interface TravelState {
  // --- 状态 ---
  currentLocation: LocationInfo | null   // 当前位置
  destination: DestinationInfo | null    // 目的地
  searchKeyword: string                  // 搜索关键词
  searchResults: POIResult[]             // 搜索结果列表
  transportMode: TransportMode           // 出行方式（驾车/步行/骑行）
  routeInfo: RouteInfo | null            // 路线信息（距离、时长）
  selectedPOI: POIDetail | null          // 选中的 POI 详情
  isSearching: boolean                   // 搜索中
  isRouting: boolean                     // 路线规划中
  error: { type: string; message: string } | null

  // --- 操作 ---
  setCurrentLocation: (loc: LocationInfo | null) => void
  setDestination: (dest: DestinationInfo | null) => void
  setSearchKeyword: (keyword: string) => void
  setSearchResults: (results: POIResult[]) => void
  setTransportMode: (mode: TransportMode) => void
  setRouteInfo: (info: RouteInfo | null) => void
  setSelectedPOI: (poi: POIDetail | null) => void
  setIsSearching: (v: boolean) => void
  setIsRouting: (v: boolean) => void
  setError: (error: { type: string; message: string } | null) => void
  clearError: () => void
  clearRoute: () => void
  reset: () => void
}

/** 初始状态 */
const initialState = {
  currentLocation: null,
  destination: null,
  searchKeyword: '',
  searchResults: [],
  transportMode: 'driving' as TransportMode,
  routeInfo: null,
  selectedPOI: null,
  isSearching: false,
  isRouting: false,
  error: null,
}

export const useTravelStore = create<TravelState>((set) => ({
  ...initialState,

  setCurrentLocation: (loc) => set({ currentLocation: loc }),
  setDestination: (dest) => set({ destination: dest, selectedPOI: null }), // 设置目的地时清除已选 POI
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setSearchResults: (results) => set({ searchResults: results }),
  setTransportMode: (mode) => set({ transportMode: mode }),
  setRouteInfo: (info) => set({ routeInfo: info }),
  setSelectedPOI: (poi) => set({ selectedPOI: poi }),
  setIsSearching: (v) => set({ isSearching: v }),
  setIsRouting: (v) => set({ isRouting: v }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  clearRoute: () => set({ routeInfo: null }),
  reset: () => set(initialState),
}))
