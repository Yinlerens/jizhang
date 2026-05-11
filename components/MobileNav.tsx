'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Navigation, Tv2, Settings, Table2 } from 'lucide-react'

const tabs = [
    { icon: Table2, label: '图表', href: '/dashboard/charts', matchPaths: ['/dashboard/charts'] },
    { icon: Navigation, label: '出行', href: '/dashboard/travel', matchPaths: ['/dashboard/travel'] },
    { icon: Tv2, label: '番剧', href: '/dashboard/bangumi', matchPaths: ['/dashboard/bangumi'] },
    { icon: Settings, label: '设置', href: '/dashboard/settings', matchPaths: ['/dashboard/settings'] },
]

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-around bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-2 py-3">
            {tabs.map((tab) => {
                const isActive = tab.matchPaths.some(
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
