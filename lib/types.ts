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
