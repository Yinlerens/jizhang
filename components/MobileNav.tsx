'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BotMessageSquare, Settings, Settings2, Table2 } from 'lucide-react'

const tabs = [
    { icon: Table2, label: '图表', href: '/dashboard/charts', matchPaths: ['/dashboard/charts'] },
    { icon: BotMessageSquare, label: 'AI', href: '/dashboard/ai', matchPaths: ['/dashboard/ai'], exact: true },
    { icon: Settings2, label: '配置', href: '/dashboard/ai/settings', matchPaths: ['/dashboard/ai/settings'] },
    { icon: Settings, label: '设置', href: '/dashboard/settings', matchPaths: ['/dashboard/settings'] },
]

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-around bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-2 py-3">
            {tabs.map((tab) => {
                const isActive = tab.exact
                    ? pathname === tab.href
                    : tab.matchPaths.some(
                        (p) => pathname === p || (p !== '/dashboard' && pathname.startsWith(p + '/'))
                    )
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={`flex flex-col items-center gap-1 transition duration-200 ${isActive
                                ? 'text-zinc-900 dark:text-zinc-50'
                                : 'text-zinc-500 dark:text-zinc-400'
                            }`}
                    >
                        <tab.icon size={24} />
                        <span className="text-[10px] font-medium">{tab.label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
