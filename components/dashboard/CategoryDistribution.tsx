'use client'

import { useMemo } from 'react'
import type { EChartsOption } from 'echarts'
import ResponsiveEChart from '@/components/charts/ResponsiveEChart'
import { getChartColor } from '@/lib/colors'

interface CategoryDistributionProps {
    data: { category: string; amount: number }[]
}

export default function CategoryDistribution({ data }: CategoryDistributionProps) {
    const option = useMemo<EChartsOption>(() => ({
        color: data.map((_, index) => getChartColor(index)),
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>金额: ¥{c} ({d}%)',
        },
        legend: {
            type: 'scroll',
            bottom: 0,
            left: 'center',
            textStyle: {
                color: '#71717a',
                fontSize: 12,
            },
        },
        series: [
            {
                name: '支出分类',
                type: 'pie',
                radius: ['46%', '68%'],
                center: ['50%', '43%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderColor: '#ffffff',
                    borderWidth: 3,
                },
                label: {
                    color: '#52525b',
                    formatter: '{b}',
                },
                data: data.map((item) => ({
                    name: item.category,
                    value: item.amount,
                })),
            },
        ],
    }), [data])

    return (
        <div className="anime-surface p-5">
            <h3 className="anime-panel-title mb-5 text-lg">支出分类</h3>
            <ResponsiveEChart option={option} height={280} />
        </div>
    )
}
