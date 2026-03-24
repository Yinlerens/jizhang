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
  currentLocation: LocationInfo | null
  destination: DestinationInfo | null
  searchKeyword: string
  searchResults: POIResult[]
  transportMode: TransportMode
  routeInfo: RouteInfo | null
  selectedPOI: POIDetail | null
  isSearching: boolean
  isRouting: boolean
  error: { type: string; message: string } | null

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
  setDestination: (dest) => set({ destination: dest, selectedPOI: null }),
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
