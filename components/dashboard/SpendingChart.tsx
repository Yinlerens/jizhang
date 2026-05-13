'use client'

import { useMemo } from 'react'
import type { EChartsOption } from 'echarts'
import ResponsiveEChart from '@/components/charts/ResponsiveEChart'
import { CHART_COLORS } from '@/lib/colors'

interface SpendingChartProps {
    data: { date: string; amount: number }[]
}

export default function SpendingChart({ data }: SpendingChartProps) {
    const primaryColor = CHART_COLORS[0] // Indigo
    const option = useMemo<EChartsOption>(() => ({
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
                type: 'line',
                lineStyle: {
                    color: primaryColor,
                    opacity: 0.3,
                },
            },
            valueFormatter: (value) => `¥${Number(value).toLocaleString()}`,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.map((item) => item.date),
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: '#9ca3af',
                fontSize: 12,
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
                color: '#9ca3af',
                fontSize: 12,
                formatter: '¥{value}',
            },
        },
        series: [
            {
                name: '支出',
                type: 'line',
                smooth: true,
                symbolSize: 8,
                data: data.map((item) => item.amount),
                lineStyle: {
                    width: 3,
                    color: primaryColor,
                },
                itemStyle: {
                    color: primaryColor,
                },
                areaStyle: {
                    opacity: 0.12,
                },
            },
        ],
    }), [data, primaryColor])

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">支出趋势 (近7日)</h3>
            <ResponsiveEChart option={option} height={280} />
        </div>
    )
}
