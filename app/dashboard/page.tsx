import { getDashboardStats, getRecentTransactions } from '@/lib/actions/transactions'
import StatsCard from '@/components/dashboard/StatsCard'
import SpendingChart from '@/components/dashboard/SpendingChart'
import CategoryDistribution from '@/components/dashboard/CategoryDistribution'
import RecentTransactions from '@/components/dashboard/RecentTransactions'
import { Wallet, Calendar, TrendingDown } from 'lucide-react'

export default async function DashboardPage() {
    const stats = await getDashboardStats()
    const recentTransactions = await getRecentTransactions()

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">数据概览</h2>
                <p className="text-zinc-500 dark:text-zinc-400">查看您的财务状况和最近活动</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="总支出"
                    value={stats.totalSpending}
                    icon={Wallet}
                    description="历史累计支出"
                />
                <StatsCard
                    title="本月支出"
                    value={stats.monthlySpending}
                    icon={Calendar}
                    description="本月累计消费额"
                />
                <StatsCard
                    title="日均支出"
                    value={stats.dailyAverage.toFixed(2)}
                    icon={TrendingDown}
                    description="近30日日均消费"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpendingChart data={stats.spendingTrend} />
                <CategoryDistribution data={stats.categoryDistribution} />
            </div>

            <RecentTransactions transactions={recentTransactions} />
        </div>
    )
}
