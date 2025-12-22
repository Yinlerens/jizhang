'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { getChartColor } from '@/lib/colors'
import { useEffect, useState } from 'react'

interface CategoryDistributionProps {
    data: { category: string; amount: number }[]
}

export default function CategoryDistribution({ data }: CategoryDistributionProps) {
    const [mounted, setMounted] = useState(false)

    // 确保只在客户端渲染图表
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">支出分类</h3>
            <div style={{ width: '100%', height: 280 }}>
                {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="amount"
                                nameKey="category"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                formatter={(value) => [`¥${Number(value).toLocaleString()}`, '金额']}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-zinc-400">
                        加载中...
                    </div>
                )}
            </div>
        </div>
    )
}
