# 出行助手页面设计文档

## 概述

在现有记账应用中新增"出行助手"功能模块，提供通用导航能力：目的地搜索、地图选点、路径规划。

## 导航结构改造

### 现状

扁平菜单：概览、账单记录、统计分析、设置

### 改造后

分组菜单结构：

```
记账（一级菜单，可展开/收起）
  ├── 概览          /dashboard
  ├── 账单记录      /dashboard/transactions
  └── 统计分析      /dashboard/stats

出行（一级菜单）
  └── 出行助手      /dashboard/travel

设置              /dashboard/settings（不归属分组）
```

- 点击一级菜单展开/收起子菜单
- 当前路由所在分组自动展开
- 移动端底部导航：记账、出行、设置三个 tab，记账 tab 默认进概览

## 页面布局

**浅色主题**，左右分栏布局：

- **左侧面板**（~360px 宽面板）：当前位置、目的地搜索框、出行方式切换（驾车/步行/骑行）、搜索结果列表、开始导航按钮
- **右侧地图**（flex: 1）：高德地图实例，占据剩余空间

### Dashboard 布局适配

现有 `app/dashboard/layout.tsx` 用 `max-w-7xl mx-auto px-4 py-8` 包裹 children，这会限制出行页面的全屏地图布局。解决方案：在 `app/dashboard/travel/` 下新建 `layout.tsx`，去掉 max-width 容器和 padding，让出行页面直接填满可用空间（`flex-1 overflow-hidden`，无 padding）。

### 移动端布局

移动端（<768px）采用全屏地图 + 底部面板方案：
- 地图全屏展示
- 搜索框浮在地图顶部
- 搜索结果以半屏底部抽屉形式弹出
- DetailCard 和 RouteInfoBar 显示在底部导航栏上方（z-index 高于底部导航）

### 主题说明

出行页面跟随系统主题（支持 light/dark），不强制浅色。设计以浅色为主，dark 模式通过 Tailwind `dark:` 变体适配。

## 交互流程

### 搜索流程

1. 用户在搜索框输入关键词（300ms 防抖，最少 2 个字符触发） → 调用 `AMap.PlaceSearch` 搜索 POI，最多返回 20 条结果
2. 搜索结果显示在左侧列表（名称、地址、距离）
3. 地图上同步标记搜索结果的位置点
4. 用户点击列表中某项 → 地图居中到该点，选中状态高亮
5. 导航按钮变为可用

### 地图点击选点流程

1. 用户点击地图任意位置 → 调用 `AMap.Geocoder` 逆地理编码获取地址
2. 同时调用 `AMap.PlaceSearch.searchNearBy` 获取附近 POI 信息
3. 地图底部弹出详情浮层卡片（名称、地址、图片、"去这里"按钮）
4. 点击"去这里" → 以该点为目的地，开始路径规划

### 路径规划流程

1. 根据出行方式调用对应服务：
   - 驾车：`AMap.Driving`
   - 步行：`AMap.Walking`
   - 骑行：`AMap.Riding`
2. 地图上绘制路线
3. 地图底部浮层显示：总距离、预计时间
4. 切换出行方式 → 重新规划，更新路线和信息

### 当前位置获取

- 优先调用浏览器 Geolocation API 自动定位
- 定位失败时允许用户手动输入地址

## 技术方案

**方案**：纯高德 JS API v2.0

使用 `@amap/amap-jsapi-loader` 加载高德地图 JS API，所有功能（地图渲染、POI 搜索、路径规划、地理编码）通过高德官方 API 完成。

### 新增依赖

- `@amap/amap-jsapi-loader` — 高德地图加载器
- `zustand` — 状态管理

### 环境变量

```
NEXT_PUBLIC_AMAP_KEY=<高德 JS API Key>
NEXT_PUBLIC_AMAP_SECURITY_CODE=<高德安全密钥>
```

### 高德安全密钥初始化

`lib/amap.ts` 在加载地图前设置 `window._AMapSecurityConfig = { securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE }`，然后调用 `AMapLoader.load()` 加载 JS API v2.0。

## 文件结构

```
components/
  Sidebar.tsx              ← 改造：支持分组菜单
  MobileNav.tsx            ← 改造：记账/出行/设置 tab

app/dashboard/travel/
  layout.tsx               ← 出行专用布局（去掉 max-width 容器）
  page.tsx                 ← 页面入口（"use client"），组合所有子组件

components/travel/
  MapContainer.tsx         ← 高德地图容器，管理地图实例
  LeftPanel.tsx            ← 左侧面板（搜索、结果、出行方式）
  LocationInput.tsx        ← 当前位置输入框（自动定位+手动）
  SearchInput.tsx          ← 目的地搜索框
  SearchResults.tsx        ← 搜索结果列表
  TransportModeSelector.tsx ← 驾车/步行/骑行切换
  DetailCard.tsx           ← 地图底部浮层（POI详情+"去这里"）
  RouteInfoBar.tsx         ← 路径规划底部浮层（距离+时间）

lib/
  amap.ts                  ← 高德地图加载与初始化工具函数
  stores/
    travel-store.ts        ← zustand store
```

## 状态管理

使用 zustand 管理出行助手页面状态。地图实例通过 `useRef` 在 MapContainer 内持有，不放入 store。

### 地图实例与组件通信

MapContainer 通过 `useRef` 持有 AMap 实例，并暴露 `mapRef` 给 page.tsx。page.tsx 将 `mapRef` 通过 props 传递给需要操作地图的组件。地图操作（添加标记、绘制路线、平移缩放）由各组件通过 `mapRef.current` 直接调用。组件卸载时（离开出行页面），MapContainer 在 `useEffect` cleanup 中调用 `map.destroy()` 释放资源。

### 类型定义

```typescript
interface POIResult {
  id: string
  name: string
  address: string
  location: { lng: number; lat: number }
  distance?: number
  type: string  // POI 类型/类别
}

interface POIDetail extends POIResult {
  tel?: string
  photos: { url: string }[]
}
```

### Store 定义

```typescript
interface TravelState {
  // 位置
  currentLocation: { lng: number; lat: number; address: string } | null
  destination: { lng: number; lat: number; name: string; address: string } | null

  // 搜索
  searchKeyword: string
  searchResults: POIResult[]

  // 出行方式
  transportMode: 'driving' | 'walking' | 'riding'

  // 路径规划
  routeInfo: { distance: number; duration: number } | null  // 米、秒

  // 地图选点详情
  selectedPOI: POIDetail | null

  // UI 状态
  isSearching: boolean
  isRouting: boolean
  error: { type: string; message: string } | null

  // Actions
  setCurrentLocation: (loc) => void
  setDestination: (dest) => void
  setSearchKeyword: (keyword) => void
  setSearchResults: (results) => void
  setTransportMode: (mode) => void
  setRouteInfo: (info) => void
  setSelectedPOI: (poi) => void
  setError: (error) => void
  clearError: () => void
  clearRoute: () => void
  reset: () => void
}
```

## 详情卡片设计

地图底部浮层样式，点击地图选点后展示：
- 左侧：POI 图片缩略图
- 右侧：名称、地址、距离
- 底部："去这里"按钮
- 点击"去这里"以该点为目的地开始路径规划

## 错误处理与加载状态

### 加载状态

- **地图加载中**：MapContainer 显示居中 spinner + "地图加载中..."
- **搜索中**（`isSearching`）：搜索结果区域显示 skeleton 占位
- **路径规划中**（`isRouting`）：底部浮层显示 spinner + "规划路线中..."

### 错误处理

所有错误通过 sonner toast 提示（与项目现有模式一致）：

- 地图加载失败 → toast 错误提示，页面显示 fallback（"地图加载失败，请刷新重试"）
- 搜索无结果 → 搜索结果区域显示"未找到相关地点"
- 路径规划失败 → toast "无法规划该路线，请尝试其他出行方式"
- 定位权限拒绝 → toast "定位权限被拒绝"，当前位置框变为可手动输入
- 定位超时 → 同上，静默回退到手动输入
