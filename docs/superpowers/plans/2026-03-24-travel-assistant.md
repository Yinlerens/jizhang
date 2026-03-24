# Travel Assistant (出行助手) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Travel Assistant" page to the existing bookkeeping app with AMap integration for POI search, map interaction, and route planning.

**Architecture:** Client-side SPA page at `/dashboard/travel` using AMap JS API v2.0 for all map operations. Zustand store manages UI state. Sidebar/MobileNav restructured into grouped menus (记账/出行/设置). Travel page uses a dedicated layout to escape the dashboard's max-width container.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, AMap JS API v2.0 (`@amap/amap-jsapi-loader`), Zustand, Sonner (toasts)

**Spec:** `docs/superpowers/specs/2026-03-24-travel-assistant-design.md`

---

### Task 1: Install Dependencies & Configure Environment

**Files:**
- Modify: `package.json`
- Modify: `.env.local` (add AMap keys)

- [ ] **Step 1: Install zustand and @amap/amap-jsapi-loader**

```bash
pnpm add zustand @amap/amap-jsapi-loader
```

- [ ] **Step 2: Add AMap environment variables to `.env.local`**

Append to `.env.local`:
```
NEXT_PUBLIC_AMAP_KEY=your_amap_key_here
NEXT_PUBLIC_AMAP_SECURITY_CODE=your_security_code_here
```

The user must replace these with real keys from https://console.amap.com/

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add zustand and @amap/amap-jsapi-loader dependencies"
```

---

### Task 2: Add Travel Types & Zustand Store

**Files:**
- Modify: `lib/types.ts` — add POI and travel-related types
- Create: `lib/stores/travel-store.ts` — zustand store

- [ ] **Step 1: Add type definitions to `lib/types.ts`**

Append to `lib/types.ts`:

```typescript
// === Travel Assistant Types ===

export interface POIResult {
  id: string
  name: string
  address: string
  location: { lng: number; lat: number }
  distance?: number
  type: string
}

export interface POIDetail extends POIResult {
  tel?: string
  photos: { url: string }[]
}

export type TransportMode = 'driving' | 'walking' | 'riding'

export interface RouteInfo {
  distance: number  // meters
  duration: number  // seconds
}

export interface LocationInfo {
  lng: number
  lat: number
  address: string
}

export interface DestinationInfo {
  lng: number
  lat: number
  name: string
  address: string
}
```

- [ ] **Step 2: Create zustand store at `lib/stores/travel-store.ts`**

```typescript
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
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add lib/types.ts lib/stores/travel-store.ts
git commit -m "feat: add travel types and zustand store"
```

---

### Task 3: Create AMap Loader Utility

**Files:**
- Create: `lib/amap.ts`

- [ ] **Step 1: Create `lib/amap.ts`**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add lib/amap.ts
git commit -m "feat: add AMap loader utility with security config"
```

---

### Task 4: Restructure Sidebar with Grouped Menus

**Files:**
- Modify: `components/Sidebar.tsx`

The sidebar needs to change from flat menu items to grouped menu sections: 记账 (概览/账单记录/统计分析), 出行 (出行助手), and 设置 at the bottom.

- [ ] **Step 1: Rewrite `components/Sidebar.tsx`**

Replace the entire `menuItems` array and nav rendering with grouped structure:

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptText,
  BarChart3,
  Settings,
  LogOut,
  Wallet,
  Navigation,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MenuGroup {
  label: string;
  icon: React.ElementType;
  items: { icon: React.ElementType; label: string; href: string }[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "记账",
    icon: Wallet,
    items: [
      { icon: LayoutDashboard, label: "概览", href: "/dashboard" },
      { icon: ReceiptText, label: "账单记录", href: "/dashboard/transactions" },
      { icon: BarChart3, label: "统计分析", href: "/dashboard/stats" },
    ],
  },
  {
    label: "出行",
    icon: Navigation,
    items: [
      { icon: MapPin, label: "出行助手", href: "/dashboard/travel" },
    ],
  },
];

const settingsItem = { icon: Settings, label: "设置", href: "/dashboard/settings" };

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Determine which groups should be open based on current path
  const getInitialOpenGroups = () => {
    return menuGroups
      .filter((group) => group.items.some((item) => pathname === item.href || pathname.startsWith(item.href + "/")))
      .map((group) => group.label);
  };

  const [openGroups, setOpenGroups] = useState<string[]>(getInitialOpenGroups);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-64 flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center">
            <ReceiptText size={20} className="text-white dark:text-zinc-900" />
          </div>
          AnimationFrame
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuGroups.map((group) => {
          const isOpen = openGroups.includes(group.label);
          const hasActiveItem = group.items.some(
            (item) => pathname === item.href || pathname.startsWith(item.href + "/")
          );

          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition duration-200 ${
                  hasActiveItem && !isOpen
                    ? "text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <group.icon size={20} />
                <span className="font-medium flex-1 text-left">{group.label}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="ml-4 space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition duration-200 ${
                        isActive(item.href)
                          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Settings - standalone */}
        <Link
          href={settingsItem.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 ${
            isActive(settingsItem.href)
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          <settingsItem.icon size={20} />
          <span className="font-medium">{settingsItem.label}</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center gap-3 px-4">
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
              {user.email?.split("@")[0]}
            </p>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition duration-200 rounded-xl"
        >
          <LogOut size={20} />
          <span className="font-medium">注销登出</span>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the app builds and sidebar renders correctly**

```bash
pnpm dev
```

Visit `/dashboard` and verify:
- "记账" group expands showing 概览/账单记录/统计分析
- "出行" group expands showing 出行助手
- "设置" is standalone at the bottom of nav
- Active route highlights correctly
- Groups auto-expand when containing the active route

- [ ] **Step 3: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "feat: restructure sidebar with grouped menus (记账/出行)"
```

---

### Task 5: Update MobileNav with Grouped Tabs

**Files:**
- Modify: `components/MobileNav.tsx`

Change from 4 flat tabs to 3 tabs: 记账 (default → /dashboard), 出行 (/dashboard/travel), 设置 (/dashboard/settings).

- [ ] **Step 1: Rewrite `components/MobileNav.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wallet, Navigation, Settings } from 'lucide-react'

const tabs = [
    { icon: Wallet, label: '记账', href: '/dashboard', matchPaths: ['/dashboard', '/dashboard/transactions', '/dashboard/stats'] },
    { icon: Navigation, label: '出行', href: '/dashboard/travel', matchPaths: ['/dashboard/travel'] },
    { icon: Settings, label: '设置', href: '/dashboard/settings', matchPaths: ['/dashboard/settings'] },
]

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-around bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-2 py-3">
            {tabs.map((tab) => {
                const isActive = tab.matchPaths.some(
                    (p) => pathname === p || (p !== '/dashboard' && pathname.startsWith(p + '/'))
                ) || (tab.href === '/dashboard' && pathname === '/dashboard')
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={`flex flex-col items-center gap-1 transition duration-200 ${isActive
                                ? 'text-zinc-900 dark:text-zinc-50'
                                : 'text-zinc-500 dark:text-zinc-400'
                            }`}
                    >
                        <tab.icon size={24} />
                        <span className="text-[10px] font-medium">{tab.label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
```

- [ ] **Step 2: Verify mobile nav renders with 3 tabs**

```bash
pnpm dev
```

Open browser dev tools, switch to mobile viewport, verify 3 tabs: 记账/出行/设置.

- [ ] **Step 3: Commit**

```bash
git add components/MobileNav.tsx
git commit -m "feat: update mobile nav to 3-tab layout (记账/出行/设置)"
```

---

### Task 6: Create Travel Page Layout & Scaffold

**Files:**
- Create: `app/dashboard/travel/layout.tsx` — removes max-width container
- Create: `app/dashboard/travel/page.tsx` — page scaffold

- [ ] **Step 1: Modify `app/dashboard/layout.tsx` to conditionally remove the max-width wrapper**

The current dashboard layout wraps children in `max-w-7xl mx-auto px-4 py-8`. The travel page needs full-bleed. Instead of fragile negative margins, modify the dashboard layout to conditionally apply the wrapper. Use a slot pattern: child layouts can opt out by structure.

Replace lines 26-31 of `app/dashboard/layout.tsx`:

```typescript
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                    {children}
                </main>
```

Then create `app/dashboard/(padded)/layout.tsx` as a route group layout that applies the padding/max-width to existing pages:

```typescript
export default function PaddedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  )
}
```

Move existing dashboard pages into the `(padded)` route group:
- `app/dashboard/(padded)/page.tsx` (move from `app/dashboard/page.tsx`)
- `app/dashboard/(padded)/transactions/page.tsx` (move from `app/dashboard/transactions/page.tsx`)
- `app/dashboard/(padded)/stats/page.tsx` (move from `app/dashboard/stats/page.tsx`)
- `app/dashboard/(padded)/settings/page.tsx` (move from `app/dashboard/settings/page.tsx`)

This keeps all existing routes working identically (same URLs, same styles) while `app/dashboard/travel/` sits outside the padded group and gets raw `flex-1` space.

- [ ] **Step 2: Create `app/dashboard/travel/layout.tsx`**

```typescript
export default function TravelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 h-full overflow-hidden">
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create `app/dashboard/travel/page.tsx` scaffold**

```typescript
'use client'

export default function TravelPage() {
  return (
    <div className="flex h-full bg-white dark:bg-zinc-950">
      {/* Left Panel */}
      <div className="hidden md:flex w-[360px] flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="p-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">出行助手</h2>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        <p className="text-zinc-400">地图加载中...</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify the page renders at `/dashboard/travel`**

```bash
pnpm dev
```

Visit `/dashboard/travel`. Verify:
- Left panel shows "出行助手" title (desktop only)
- Map area shows "地图加载中..."
- No max-width constraint — content fills full width
- Sidebar "出行" group highlights correctly

- [ ] **Step 4: Commit**

```bash
git add app/dashboard/travel/layout.tsx app/dashboard/travel/page.tsx
git commit -m "feat: add travel page scaffold with full-bleed layout"
```

---

### Task 7: Implement MapContainer Component

**Files:**
- Create: `components/travel/MapContainer.tsx`
- Modify: `app/dashboard/travel/page.tsx` — integrate MapContainer

- [ ] **Step 1: Create `components/travel/MapContainer.tsx`**

```typescript
'use client'

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { loadAMap } from '@/lib/amap'
import { useTravelStore } from '@/lib/stores/travel-store'
import { toast } from 'sonner'

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
  const { setCurrentLocation } = useTravelStore()

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
  }, [setCurrentLocation])

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
```

- [ ] **Step 2: Update `app/dashboard/travel/page.tsx` to use MapContainer**

```typescript
'use client'

import { useRef } from 'react'
import MapContainer, { type MapContainerRef } from '@/components/travel/MapContainer'

export default function TravelPage() {
  const mapContainerRef = useRef<MapContainerRef>(null)

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950">
      {/* Left Panel */}
      <div className="hidden md:flex w-[360px] flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="p-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">出行助手</h2>
        </div>
      </div>

      {/* Map */}
      <MapContainer ref={mapContainerRef} />
    </div>
  )
}
```

- [ ] **Step 3: Verify map loads at `/dashboard/travel`**

```bash
pnpm dev
```

Visit `/dashboard/travel`. Verify:
- Map loads (requires valid AMap key in `.env.local`)
- Loading spinner shows during initialization
- If key is missing, error fallback renders
- Auto-geolocation attempts (may fail in dev)

- [ ] **Step 4: Commit**

```bash
git add components/travel/MapContainer.tsx app/dashboard/travel/page.tsx
git commit -m "feat: implement MapContainer with AMap initialization and geolocation"
```

---

### Task 8: Implement Left Panel Components (LocationInput, SearchInput, TransportModeSelector)

**Files:**
- Create: `components/travel/LocationInput.tsx`
- Create: `components/travel/SearchInput.tsx`
- Create: `components/travel/TransportModeSelector.tsx`
- Create: `components/travel/LeftPanel.tsx`
- Modify: `app/dashboard/travel/page.tsx`

- [ ] **Step 1: Create `components/travel/LocationInput.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { Crosshair } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { loadAMap } from '@/lib/amap'
import { toast } from 'sonner'

export default function LocationInput() {
  const { currentLocation, setCurrentLocation } = useTravelStore()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleEdit = () => {
    setIsEditing(true)
    setInputValue(currentLocation?.address || '')
  }

  const handleSubmit = async () => {
    setIsEditing(false)
    const address = inputValue.trim()
    if (!address) return

    try {
      const AMap = await loadAMap()
      const geocoder = new AMap.Geocoder({ city: '' })
      geocoder.getLocation(address, (status: string, result: any) => {
        if (status === 'complete' && result.geocodes?.length > 0) {
          const { location } = result.geocodes[0]
          setCurrentLocation({
            lng: location.getLng(),
            lat: location.getLat(),
            address,
          })
        } else {
          toast.error('未找到该地址')
        }
      })
    } catch {
      toast.error('地址解析失败')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <Crosshair size={16} className="text-blue-500 shrink-0" />
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="输入当前位置"
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-50 outline-none placeholder:text-zinc-400"
          />
        ) : (
          <button
            onClick={handleEdit}
            className="flex-1 text-left text-sm truncate"
          >
            {currentLocation ? (
              <span className="text-zinc-900 dark:text-zinc-50">{currentLocation.address}</span>
            ) : (
              <span className="text-zinc-400">定位中...</span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/travel/SearchInput.tsx`**

```typescript
'use client'

import { useCallback, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import type { MapContainerRef } from './MapContainer'
import type { POIResult } from '@/lib/types'
import { toast } from 'sonner'

interface SearchInputProps {
  mapRef: React.RefObject<MapContainerRef | null>
}

export default function SearchInput({ mapRef }: SearchInputProps) {
  const {
    searchKeyword,
    setSearchKeyword,
    setSearchResults,
    setIsSearching,
    currentLocation,
  } = useTravelStore()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const doSearch = useCallback(
    (keyword: string) => {
      const AMap = mapRef.current?.getAMap()
      const map = mapRef.current?.getMap()
      if (!AMap || !map) return

      setIsSearching(true)

      const placeSearch = new AMap.PlaceSearch({
        pageSize: 20,
        extensions: 'all',
      })

      placeSearch.search(keyword, (status: string, result: any) => {
        setIsSearching(false)
        if (status === 'complete' && result.poiList?.pois) {
          const pois: POIResult[] = result.poiList.pois.map((poi: any) => ({
            id: poi.id,
            name: poi.name,
            address: poi.address || '',
            location: {
              lng: poi.location.getLng(),
              lat: poi.location.getLat(),
            },
            distance: poi.distance,
            type: poi.type || '',
          }))
          setSearchResults(pois)
        } else {
          setSearchResults([])
        }
      })
    },
    [mapRef, setSearchResults, setIsSearching]
  )

  const handleChange = (value: string) => {
    setSearchKeyword(value)

    if (timerRef.current) clearTimeout(timerRef.current)

    if (value.trim().length < 2) {
      setSearchResults([])
      return
    }

    timerRef.current = setTimeout(() => {
      doSearch(value.trim())
    }, 300)
  }

  const handleClear = () => {
    setSearchKeyword('')
    setSearchResults([])
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <Search size={16} className="text-zinc-400 shrink-0" />
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="搜索目的地"
          className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-50 outline-none placeholder:text-zinc-400"
        />
        {searchKeyword && (
          <button onClick={handleClear} className="text-zinc-400 hover:text-zinc-600">
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `components/travel/TransportModeSelector.tsx`**

```typescript
'use client'

import { Car, Footprints, Bike } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import type { TransportMode } from '@/lib/types'

const modes: { value: TransportMode; label: string; icon: React.ElementType }[] = [
  { value: 'driving', label: '驾车', icon: Car },
  { value: 'walking', label: '步行', icon: Footprints },
  { value: 'riding', label: '骑行', icon: Bike },
]

export default function TransportModeSelector() {
  const { transportMode, setTransportMode } = useTravelStore()

  return (
    <div className="flex gap-2">
      {modes.map((mode) => {
        const isActive = transportMode === mode.value
        return (
          <button
            key={mode.value}
            onClick={() => setTransportMode(mode.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <mode.icon size={14} />
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: Create `components/travel/LeftPanel.tsx`**

```typescript
'use client'

import LocationInput from './LocationInput'
import SearchInput from './SearchInput'
import TransportModeSelector from './TransportModeSelector'
import type { MapContainerRef } from './MapContainer'

interface LeftPanelProps {
  mapRef: React.RefObject<MapContainerRef | null>
}

export default function LeftPanel({ mapRef }: LeftPanelProps) {
  return (
    <div className="hidden md:flex w-[360px] flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">出行助手</h2>
        <LocationInput />
        <SearchInput mapRef={mapRef} />
        <TransportModeSelector />
      </div>

      {/* Search Results — placeholder, replaced in Task 9 */}
      <div className="flex-1 overflow-y-auto" />

      {/* Navigate Button — added in Task 11 */}
    </div>
  )
}
```

- [ ] **Step 5: Update `app/dashboard/travel/page.tsx`**

```typescript
'use client'

import { useRef } from 'react'
import MapContainer, { type MapContainerRef } from '@/components/travel/MapContainer'
import LeftPanel from '@/components/travel/LeftPanel'

export default function TravelPage() {
  const mapContainerRef = useRef<MapContainerRef>(null)

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950">
      <LeftPanel mapRef={mapContainerRef} />
      <MapContainer ref={mapContainerRef} />
    </div>
  )
}
```

- [ ] **Step 6: Verify left panel renders with all inputs**

```bash
pnpm dev
```

Visit `/dashboard/travel`. Verify:
- Left panel shows: 出行助手 title, location input, search input, transport mode pills
- Transport mode pills switch correctly
- Search input has debounce behavior

- [ ] **Step 7: Commit**

```bash
git add components/travel/LocationInput.tsx components/travel/SearchInput.tsx components/travel/TransportModeSelector.tsx components/travel/LeftPanel.tsx app/dashboard/travel/page.tsx
git commit -m "feat: implement left panel with location, search, and transport mode"
```

---

### Task 9: Implement SearchResults Component

**Files:**
- Create: `components/travel/SearchResults.tsx`
- Modify: `components/travel/LeftPanel.tsx` — add SearchResults import

- [ ] **Step 1: Create `components/travel/SearchResults.tsx`**

```typescript
'use client'

import { MapPin } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { formatDistance } from '@/lib/amap'
import type { MapContainerRef } from './MapContainer'

interface SearchResultsProps {
  mapRef: React.RefObject<MapContainerRef | null>
}

export default function SearchResults({ mapRef }: SearchResultsProps) {
  const {
    searchResults,
    isSearching,
    searchKeyword,
    setDestination,
    destination,
  } = useTravelStore()

  const handleSelect = (poi: (typeof searchResults)[0]) => {
    setDestination({
      lng: poi.location.lng,
      lat: poi.location.lat,
      name: poi.name,
      address: poi.address,
    })

    // Center map on selected POI
    const map = mapRef.current?.getMap()
    const AMap = mapRef.current?.getAMap()
    if (map && AMap) {
      map.setCenter([poi.location.lng, poi.location.lat])
      map.setZoom(16)
    }
  }

  if (isSearching) {
    return (
      <div className="px-4 py-3 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex items-start gap-3">
            <div className="w-4 h-4 mt-0.5 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (searchKeyword.length >= 2 && searchResults.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-zinc-400">
        未找到相关地点
      </div>
    )
  }

  if (searchResults.length === 0) return null

  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {searchResults.map((poi) => {
        const isSelected =
          destination?.lng === poi.location.lng && destination?.lat === poi.location.lat
        return (
          <button
            key={poi.id}
            onClick={() => handleSelect(poi)}
            className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
              isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <MapPin
              size={16}
              className={`mt-0.5 shrink-0 ${
                isSelected ? 'text-blue-500' : 'text-zinc-400'
              }`}
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  isSelected
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-900 dark:text-zinc-50'
                }`}
              >
                {poi.name}
              </p>
              <p className="text-xs text-zinc-500 truncate mt-0.5">{poi.address}</p>
            </div>
            {poi.distance != null && (
              <span className="text-xs text-zinc-400 shrink-0 mt-0.5">
                {formatDistance(poi.distance)}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Update `LeftPanel.tsx` to import and render SearchResults**

Add import at the top of `components/travel/LeftPanel.tsx`:
```typescript
import SearchResults from './SearchResults'
```

Replace the placeholder `<div className="flex-1 overflow-y-auto" />` with:
```typescript
      <div className="flex-1 overflow-y-auto">
        <SearchResults mapRef={mapRef} />
      </div>
```

- [ ] **Step 3: Verify search results display correctly**

```bash
pnpm dev
```

Type a search query in the search box (e.g. "天安门"). Verify:
- Skeleton loading shows during search
- Results appear with name, address, optional distance
- Clicking a result highlights it and centers map
- "未找到相关地点" shows for no-result queries

- [ ] **Step 4: Commit**

```bash
git add components/travel/SearchResults.tsx components/travel/LeftPanel.tsx
git commit -m "feat: implement search results list with selection highlighting"
```

---

### Task 10: Implement Map Click → DetailCard Flow

**Files:**
- Create: `components/travel/DetailCard.tsx`
- Modify: `components/travel/MapContainer.tsx` — add click handler

- [ ] **Step 1: Create `components/travel/DetailCard.tsx`**

```typescript
'use client'

import { X, Navigation } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'

export default function DetailCard() {
  const { selectedPOI, setSelectedPOI, setDestination } = useTravelStore()

  if (!selectedPOI) return null

  const handleGoHere = () => {
    setDestination({
      lng: selectedPOI.location.lng,
      lat: selectedPOI.location.lat,
      name: selectedPOI.name,
      address: selectedPOI.address,
    })
    setSelectedPOI(null)
  }

  const handleClose = () => {
    setSelectedPOI(null)
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[360px] bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 p-4">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
      >
        <X size={16} />
      </button>

      <div className="flex gap-3">
        {/* Photo */}
        {selectedPOI.photos.length > 0 ? (
          <img
            src={selectedPOI.photos[0].url}
            alt={selectedPOI.name}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <Navigation size={20} className="text-zinc-400" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">
            {selectedPOI.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 truncate">{selectedPOI.address}</p>
          {selectedPOI.tel && (
            <p className="text-xs text-zinc-400 mt-0.5">{selectedPOI.tel}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleGoHere}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
      >
        <Navigation size={14} />
        去这里
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Add map click handler in `MapContainer.tsx`**

After the map is created (after `mapRef.current = map`), add the click event listener:

Add to imports:
```typescript
import type { POIDetail } from '@/lib/types'
```

Add to the store destructuring:
```typescript
const { setCurrentLocation, setSelectedPOI } = useTravelStore()
```

After the `map.addControl(new AMap.Scale())` line, add:

```typescript
// Handle map click — reverse geocode + nearby POI search
map.on('click', (e: any) => {
  const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]

  const geocoder = new AMap.Geocoder({ extensions: 'all' })
  const placeSearch = new AMap.PlaceSearch({ extensions: 'all', pageSize: 1 })

  geocoder.getAddress(lnglat, (status: string, result: any) => {
    if (status !== 'complete') return

    const address = result.regeocode.formattedAddress || ''

    // Also search nearby for POI details (use general type to avoid empty keyword issues)
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

      setSelectedPOI(poi)
    })
  })
})
```

- [ ] **Step 3: Add DetailCard to the page**

Modify `app/dashboard/travel/page.tsx`:

```typescript
'use client'

import { useRef } from 'react'
import MapContainer, { type MapContainerRef } from '@/components/travel/MapContainer'
import LeftPanel from '@/components/travel/LeftPanel'
import DetailCard from '@/components/travel/DetailCard'

export default function TravelPage() {
  const mapContainerRef = useRef<MapContainerRef>(null)

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950">
      <LeftPanel mapRef={mapContainerRef} />
      <div className="flex-1 relative">
        <MapContainer ref={mapContainerRef} />
        <DetailCard />
      </div>
    </div>
  )
}
```

Note: MapContainer now renders as a Fragment (`<>...</>`) with absolute-positioned children, so the parent `flex-1 relative` div provides the positioning context. DetailCard renders inside the same wrapper and positions itself absolutely at the bottom.

- [ ] **Step 4: Verify map click → detail card flow**

```bash
pnpm dev
```

Visit `/dashboard/travel`. Click on the map. Verify:
- DetailCard appears at bottom with POI name, address, optional photo
- "去这里" button is visible
- Close button (X) dismisses the card
- Clicking "去这里" sets the destination

- [ ] **Step 5: Commit**

```bash
git add components/travel/DetailCard.tsx components/travel/MapContainer.tsx app/dashboard/travel/page.tsx
git commit -m "feat: implement map click detail card with reverse geocode"
```

---

### Task 11: Implement Route Planning (RouteInfoBar + Navigate Button)

**Files:**
- Create: `components/travel/RouteInfoBar.tsx`
- Modify: `components/travel/LeftPanel.tsx` — add navigate button
- Modify: `app/dashboard/travel/page.tsx` — add RouteInfoBar
- Modify: `components/travel/MapContainer.tsx` — add route planning logic

This is the core routing feature. When user clicks "开始导航" (left panel) or "去这里" (detail card), route planning triggers using the selected transport mode.

- [ ] **Step 1: Create `components/travel/RouteInfoBar.tsx`**

```typescript
'use client'

import { X, Car, Footprints, Bike } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
import { formatDistance, formatDuration } from '@/lib/amap'

const modeIcons = {
  driving: Car,
  walking: Footprints,
  riding: Bike,
}

const modeLabels = {
  driving: '驾车',
  walking: '步行',
  riding: '骑行',
}

export default function RouteInfoBar() {
  const { routeInfo, transportMode, isRouting, clearRoute, destination } = useTravelStore()

  if (isRouting) {
    return (
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[360px] bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 p-4">
        <div className="flex items-center justify-center gap-2 text-zinc-400">
          <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
          <span className="text-sm">规划路线中...</span>
        </div>
      </div>
    )
  }

  if (!routeInfo) return null

  const ModeIcon = modeIcons[transportMode]

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[360px] bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 p-4">
      <button
        onClick={clearRoute}
        className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
      >
        <X size={16} />
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
          <ModeIcon size={20} className="text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {modeLabels[transportMode]} · {formatDistance(routeInfo.distance)}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">
            预计 {formatDuration(routeInfo.duration)}
          </p>
        </div>
      </div>

      {destination && (
        <p className="text-xs text-zinc-400 mt-2 truncate">
          目的地：{destination.name}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Add navigate button to `LeftPanel.tsx`**

Add to the bottom of `LeftPanel`, after the `SearchResults` div:

```typescript
import { Navigation } from 'lucide-react'
import { useTravelStore } from '@/lib/stores/travel-store'
```

Add at the bottom of the component, before the closing `</div>`:

```typescript
{/* Navigate Button */}
<NavigateButton mapRef={mapRef} />
```

Create `NavigateButton` as a separate sub-component in the same file or extract it. The simplest: add it inline in LeftPanel:

```typescript
function NavigateButton({ mapRef }: { mapRef: React.RefObject<MapContainerRef | null> }) {
  const { destination, currentLocation, transportMode, setRouteInfo, setIsRouting, clearRoute } = useTravelStore()

  const handleNavigate = async () => {
    const AMap = mapRef.current?.getAMap()
    const map = mapRef.current?.getMap()
    if (!AMap || !map || !destination || !currentLocation) return

    setIsRouting(true)
    clearRoute()

    // Clear previous overlays
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

        // Extract path points
        const path: any[] = []
        const steps = transportMode === 'riding' ? route.rides : route.steps
        steps.forEach((step: any) => {
          path.push(...step.path)
        })

        // Draw route line
        const colors = { driving: '#3b82f6', walking: '#22c55e', riding: '#f97316' }
        const polyline = new AMap.Polyline({
          path,
          strokeColor: colors[transportMode],
          strokeWeight: 6,
          strokeOpacity: 0.9,
          lineJoin: 'round',
          lineCap: 'round',
        })
        map.add(polyline)

        // Add start/end markers
        new AMap.Marker({ map, position: start, label: { content: '起', direction: 'top' } })
        new AMap.Marker({ map, position: end, label: { content: '终', direction: 'top' } })

        // Fit view
        map.setFitView()

        // Update store
        setRouteInfo({
          distance: route.distance ?? 0,
          duration: route.time ?? 0,
        })
      } else {
        toast.error('无法规划该路线，请尝试其他出行方式')
      }
    })
  }

  const disabled = !destination || !currentLocation

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
      <button
        onClick={handleNavigate}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
          disabled
            ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
            : 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
        }`}
      >
        <Navigation size={16} />
        开始导航
      </button>
    </div>
  )
}
```

Also add `import { toast } from 'sonner'` and `import { Navigation } from 'lucide-react'` and `import { useTravelStore } from '@/lib/stores/travel-store'` at the top of LeftPanel.tsx.

Create `NavigateButton` as a separate function component in the same file:

- [ ] **Step 3: Add RouteInfoBar to page.tsx**

```typescript
import RouteInfoBar from '@/components/travel/RouteInfoBar'

// In the render, add inside the map wrapper div:
<RouteInfoBar />
```

- [ ] **Step 4: Wire up "去这里" in DetailCard to trigger route planning**

Update `DetailCard.tsx`'s `handleGoHere` — setting the destination already works. The user then clicks "开始导航" in the left panel. Alternatively, to auto-start planning when clicking "去这里", we can add the route planning logic. But per the spec, setting destination and clicking navigate are separate actions. Keep them separate: "去这里" sets destination, user clicks "开始导航" to plan.

No code change needed here — the existing flow already works.

- [ ] **Step 5: Handle transport mode change while route is active**

In `MapContainer.tsx`, add a `useEffect` that watches `transportMode` changes and re-plans if there's an active route. Actually, the simpler approach: in LeftPanel's NavigateButton, the user just clicks "开始导航" again. Per the spec: "切换出行方式 → 重新规划". Add a `useEffect` in LeftPanel:

In `LeftPanel.tsx`, add this effect inside the NavigateButton component. Read values from the store at invocation time using `useTravelStore.getState()` to avoid stale closures:

```typescript
// Re-plan when transport mode changes and there's an active route
useEffect(() => {
  const { routeInfo, destination, currentLocation } = useTravelStore.getState()
  if (routeInfo && destination && currentLocation) {
    handleNavigate()
  }
}, [transportMode])
```

This auto-replans when transport mode is switched while a route is displayed.

- [ ] **Step 6: Verify end-to-end route planning flow**

```bash
pnpm dev
```

Test flow:
1. Search for a destination → select from results
2. Click "开始导航" → route appears on map, RouteInfoBar shows distance/time
3. Switch transport mode → route replans automatically
4. Click map → DetailCard appears → click "去这里" → destination updates → click "开始导航"
5. Click X on RouteInfoBar → route clears

- [ ] **Step 7: Commit**

```bash
git add components/travel/RouteInfoBar.tsx components/travel/LeftPanel.tsx app/dashboard/travel/page.tsx
git commit -m "feat: implement route planning with driving/walking/riding support"
```

---

### Task 12: Add Map Markers for Search Results

**Files:**
- Modify: `components/travel/MapContainer.tsx`

When search results update, show markers on the map for each POI.

- [ ] **Step 1: Add search result markers to MapContainer**

Add a `useEffect` in `MapContainer` that watches `searchResults` from the store and adds/removes markers:

```typescript
const { searchResults } = useTravelStore()
const markersRef = useRef<any[]>([])

useEffect(() => {
  const map = mapRef.current
  const AMap = AMapRef.current
  if (!map || !AMap) return

  // Clear previous search markers
  markersRef.current.forEach((m) => map.remove(m))
  markersRef.current = []

  if (searchResults.length === 0) return

  const markers = searchResults.map((poi, index) => {
    return new AMap.Marker({
      position: [poi.location.lng, poi.location.lat],
      label: {
        content: `${index + 1}`,
        direction: 'top',
      },
    })
  })

  map.add(markers)
  markersRef.current = markers

  // Fit view to show all markers
  if (markers.length > 0) {
    map.setFitView(markers)
  }
}, [searchResults])
```

- [ ] **Step 2: Verify markers appear on search**

Search for something like "咖啡". Verify numbered markers appear on the map and the view adjusts to fit all results.

- [ ] **Step 3: Commit**

```bash
git add components/travel/MapContainer.tsx
git commit -m "feat: show search result markers on map"
```

---

### Task 13: Final Polish & Verification

**Files:**
- Various touch-ups across travel components

- [ ] **Step 1: Verify the complete flow end-to-end**

```bash
pnpm dev
```

Test the full flow:
1. Navigate to `/dashboard/travel` from sidebar
2. Verify auto-geolocation attempts
3. Search for a destination → results show in list + markers on map
4. Click a search result → map centers, result highlights
5. Click "开始导航" → route draws, info bar shows
6. Switch transport mode → route replans
7. Click on map → detail card shows → "去这里" sets destination
8. Close route → clear
9. Mobile view: verify layout is appropriate (map takes full screen)
10. Sidebar: "出行" group expanded with "出行助手" active
11. Dark mode: toggle theme, verify all components render correctly

- [ ] **Step 2: Run build to verify no TypeScript errors**

```bash
pnpm build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit any final fixes**

```bash
git add -A
git commit -m "feat: complete travel assistant page implementation"
```

---

## File Map Summary

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Modify | Add zustand, @amap/amap-jsapi-loader |
| `.env.local` | Modify | Add NEXT_PUBLIC_AMAP_KEY, NEXT_PUBLIC_AMAP_SECURITY_CODE |
| `lib/types.ts` | Modify | Add POI and travel type definitions |
| `lib/stores/travel-store.ts` | Create | Zustand store for travel page state |
| `lib/amap.ts` | Create | AMap loader utility with security config |
| `components/Sidebar.tsx` | Modify | Grouped menu structure (记账/出行) |
| `components/MobileNav.tsx` | Modify | 3-tab layout (记账/出行/设置) |
| `app/dashboard/layout.tsx` | Modify | Remove max-width wrapper (moved to route group) |
| `app/dashboard/(padded)/layout.tsx` | Create | Max-width wrapper for existing pages |
| `app/dashboard/(padded)/page.tsx` | Move | From `app/dashboard/page.tsx` |
| `app/dashboard/(padded)/transactions/page.tsx` | Move | From `app/dashboard/transactions/page.tsx` |
| `app/dashboard/(padded)/stats/page.tsx` | Move | From `app/dashboard/stats/page.tsx` |
| `app/dashboard/(padded)/settings/page.tsx` | Move | From `app/dashboard/settings/page.tsx` |
| `app/dashboard/travel/layout.tsx` | Create | Full-bleed layout (no max-width) |
| `app/dashboard/travel/page.tsx` | Create | Page entry point composing all components |
| `components/travel/MapContainer.tsx` | Create | AMap map instance, geolocation, click handler |
| `components/travel/LeftPanel.tsx` | Create | Left panel container with navigate button |
| `components/travel/LocationInput.tsx` | Create | Current location input (auto + manual geocoding) |
| `components/travel/SearchInput.tsx` | Create | Destination search with debounce |
| `components/travel/SearchResults.tsx` | Create | Search results list |
| `components/travel/TransportModeSelector.tsx` | Create | Driving/walking/riding toggle |
| `components/travel/DetailCard.tsx` | Create | Map bottom overlay for POI details |
| `components/travel/RouteInfoBar.tsx` | Create | Route planning result overlay |
