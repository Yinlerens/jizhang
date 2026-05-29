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
        <nav className="mx-2 mb-2 flex items-center justify-around rounded-md border-2 border-[#26223a] bg-[#fff9ec]/92 px-2 py-2 shadow-[0_4px_0_#ff7aa8] backdrop-blur-lg dark:border-cyan-300/25 dark:bg-[#151a2c]/92 dark:shadow-[0_4px_0_rgba(103,232,249,0.18)]">
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
                        className={`flex min-w-14 flex-col items-center gap-1 rounded-md border px-2 py-1.5 transition duration-200 ${isActive
                                ? 'border-[#26223a] bg-[#ffd657] text-[#26223a] shadow-[2px_2px_0_#26223a] dark:border-cyan-200 dark:bg-cyan-300 dark:text-[#10131f] dark:shadow-none'
                                : 'border-transparent text-[#6e6172] dark:text-cyan-50/60'
                            }`}
                    >
                        <tab.icon size={24} />
                        <span className="text-[10px] font-black">{tab.label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
