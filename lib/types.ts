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
