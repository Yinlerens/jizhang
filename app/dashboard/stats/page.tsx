'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Transaction } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns'
import { CHART_COLORS, getChartColor } from '@/lib/colors'

export default function StatsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data } = await supabase
                .from('transactions')
                .select('*')
                .order('occurred_at', { ascending: false })

            setTransactions((data || []) as Transaction[])
            setLoading(false)
        }

        fetchTransactions()
    }, [])

    // Calculate stats for current month
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

    const dailyData = daysInMonth.map(day => {
        const amount = transactions
            .filter(t => isSameDay(new Date(t.occurred_at), day))
            .reduce((acc, curr) => acc + Number(curr.amount), 0)
        return {
            date: format(day, 'MM-dd'),
            amount
        }
    })

    const categoryMap = new Map<string, number>()
    transactions.forEach(t => {
        const cat = t.category || '未分类'
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + Number(t.amount))
    })
    const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)

    const primaryColor = CHART_COLORS[4] // Violet for bar chart

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">统计分析</h2>
                <p className="text-zinc-500 dark:text-zinc-400">深度分析您的消费习惯和支出分布</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Spending Bar Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-[450px]">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">本月每日支出</h3>
                    <div className="h-full w-full">
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={dailyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                                    }}
                                    formatter={(value) => [`¥${Number(value).toLocaleString()}`, '支出']}
                                />
                                <Bar dataKey="amount" fill={primaryColor} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Ranking */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">支出排行榜</h3>
                    <div className="space-y-6">
                        {categoryData.map((item, index) => (
                            <div key={item.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: getChartColor(index) }}
                                        />
                                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-zinc-900 dark:text-zinc-50">¥{item.value.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${(item.value / categoryData[0].value) * 100}%`,
                                            backgroundColor: getChartColor(index)
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        {categoryData.length === 0 && (
                            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-12">暂无统计数据</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
