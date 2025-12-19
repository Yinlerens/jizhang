'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CHART_COLORS } from '@/lib/colors'

interface SpendingChartProps {
    data: { date: string; amount: number }[]
}

export default function SpendingChart({ data }: SpendingChartProps) {
    const primaryColor = CHART_COLORS[0] // Indigo

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-[400px]">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">支出趋势 (近7日)</h3>
            <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickFormatter={(value) => `¥${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value) => [`¥${Number(value).toLocaleString()}`, '支出']}
                        />
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke={primaryColor}
                            strokeWidth={3}
                            dot={{ r: 4, fill: primaryColor, strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: primaryColor, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
