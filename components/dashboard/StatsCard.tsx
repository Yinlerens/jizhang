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
        <div className="anime-surface p-5 transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
                <div className="grid h-10 w-10 place-items-center rounded-md border-2 border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[3px_3px_0_#ff7aa8] dark:border-cyan-200 dark:bg-cyan-300">
                    <Icon size={20} />
                </div>
                {trend && (
                    <span className={`rounded-md border border-[#26223a] px-2 py-1 text-xs font-black ${trend.positive ? 'bg-[#bdf7b7] text-[#1f5c3e]' : 'bg-[#ffe0eb] text-[#a8325a]'
                        }`}>
                        {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-sm font-black text-[#8f5b72] dark:text-cyan-100/70">{title}</h3>
                <p className="anime-display mt-1 text-3xl font-black text-[#26223a] dark:text-cyan-50">
                    {typeof value === 'number' ? `¥${value.toLocaleString()}` : value}
                </p>
                {description && (
                    <p className="mt-2 text-xs font-bold text-[#6e6172] dark:text-cyan-50/60">{description}</p>
                )}
            </div>
        </div>
    )
}
