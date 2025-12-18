import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: {
        value: number
        positive: boolean
    }
}

export default function StatsCard({ title, value, icon: Icon, description, trend }: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-[1.02] duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <Icon size={20} className="text-zinc-900 dark:text-zinc-50" />
                </div>
                {trend && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
                    {typeof value === 'number' ? `¥${value.toLocaleString()}` : value}
                </p>
                {description && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">{description}</p>
                )}
            </div>
        </div>
    )
}
