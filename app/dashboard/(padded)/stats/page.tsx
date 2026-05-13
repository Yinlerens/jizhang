'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { EChartsOption } from 'echarts'
import { createClient } from '@/lib/supabase/client'
import ResponsiveEChart from '@/components/charts/ResponsiveEChart'
import { Transaction } from '@/lib/types'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns'
import { CHART_COLORS, getChartColor } from '@/lib/colors'

export default function StatsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const supabaseRef = useRef(createClient())

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data } = await supabaseRef.current
                .from('transactions')
                .select('*')
                .order('occurred_at', { ascending: false })

            setTransactions((data || []) as Transaction[])
            setLoading(false)
        }

        fetchTransactions()
    }, [])

    const dailyData = useMemo(() => {
        const now = new Date()
        const monthStart = startOfMonth(now)
        const monthEnd = endOfMonth(now)
        const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

        return daysInMonth.map(day => {
            const amount = transactions
                .filter(t => isSameDay(new Date(t.occurred_at), day))
                .reduce((acc, curr) => acc + Number(curr.amount), 0)
            return {
                date: format(day, 'MM-dd'),
                amount
            }
        })
    }, [transactions])

    const categoryData = useMemo(() => {
        const categoryMap = new Map<string, number>()
        transactions.forEach(t => {
            const cat = t.category || '未分类'
            categoryMap.set(cat, (categoryMap.get(cat) || 0) + Number(t.amount))
        })

        return Array.from(categoryMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
    }, [transactions])

    const primaryColor = CHART_COLORS[4] // Violet for bar chart
    const maxCategoryValue = categoryData[0]?.value ?? 0
    const dailyChartOption = useMemo<EChartsOption>(() => ({
        color: [primaryColor],
        grid: {
            left: 10,
            right: 12,
            top: 18,
            bottom: 8,
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(139, 92, 246, 0.1)',
                },
            },
            valueFormatter: (value) => `¥${Number(value).toLocaleString()}`,
        },
        xAxis: {
            type: 'category',
            data: dailyData.map((item) => item.date),
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: '#71717a',
                fontSize: 10,
            },
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                lineStyle: {
                    color: '#e5e7eb',
                    type: 'dashed',
                },
            },
            axisLabel: {
                color: '#71717a',
                fontSize: 10,
                formatter: '¥{value}',
            },
        },
        series: [
            {
                name: '支出',
                type: 'bar',
                data: dailyData.map((item) => item.amount),
                barMaxWidth: 18,
                itemStyle: {
                    color: primaryColor,
                    borderRadius: [4, 4, 0, 0],
                },
            },
        ],
    }), [dailyData, primaryColor])

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">统计分析</h2>
                <p className="text-zinc-500 dark:text-zinc-400">深度分析您的消费习惯和支出分布</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Spending Bar Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">本月每日支出</h3>
                    <div className="h-[350px]">
                        {loading ? (
                            <div className="h-full flex items-center justify-center text-zinc-400">
                                加载中...
                            </div>
                        ) : (
                            <ResponsiveEChart option={dailyChartOption} height={350} />
                        )}
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
                                             width: `${maxCategoryValue > 0 ? (item.value / maxCategoryValue) * 100 : 0}%`,
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
