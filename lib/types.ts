export interface Transaction {
    id: number;
    merchant: string | null;
    amount: number;
    category: string | null;
    occurred_at: string;
    image_path: string | null;
    created_at: string;
}

export type TransactionInsert = Omit<Transaction, 'id' | 'created_at'>;
export type TransactionUpdate = Partial<TransactionInsert>;

export interface DailySpending {
    date: string;
    amount: number;
}

export interface CategorySpending {
    category: string;
    amount: number;
}

export interface DashboardStats {
    totalSpending: number;
    monthlySpending: number;
    dailyAverage: number;
    spendingTrend: DailySpending[];
    categoryDistribution: CategorySpending[];
}

// === 出行助手类型定义 ===

/** POI 搜索结果 */
export interface POIResult {
  id: string
  name: string
  address: string
  location: { lng: number; lat: number }
  distance?: number   // 距离（米）
  type: string
}

/** POI 详情（含照片和电话） */
export interface POIDetail extends POIResult {
  tel?: string
  photos: { url: string }[]
}

/** 出行方式：驾车 | 步行 | 骑行 */
export type TransportMode = 'driving' | 'walking' | 'riding'

/** 路线信息 */
export interface RouteInfo {
  distance: number  // 距离（米）
  duration: number  // 时长（秒）
}

/** 当前位置信息 */
export interface LocationInfo {
  lng: number
  lat: number
  address: string
}

/** 目的地信息 */
export interface DestinationInfo {
  lng: number
  lat: number
  name: string
  address: string
}

// === 番剧搜索类型定义 ===

/** 统一的番剧数据格式 */
export interface AnimeItem {
  id: number
  name: string
  nameCn: string
  nameEn: string | null
  summary: string
  airDate: string
  episodeCount: number
  coverImage: string
  ratingBangumi: number | null
  ratingAniList: number | null
  tags: string[]
  status: 'airing' | 'finished' | 'upcoming'
}

/** 番剧搜索结果 */
export interface AnimeSearchResult {
  items: AnimeItem[]
  total: number
  hasMore: boolean
}

