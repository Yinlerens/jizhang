'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ReceiptText, BarChart3, Settings } from 'lucide-react'

const menuItems = [
    { icon: LayoutDashboard, label: '概览', href: '/dashboard' },
    { icon: ReceiptText, label: '记录', href: '/dashboard/transactions' },
    { icon: BarChart3, label: '统计', href: '/dashboard/stats' },
    { icon: Settings, label: '设置', href: '/dashboard/settings' },
]

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-around bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-2 py-3">
            {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 transition duration-200 ${isActive
                                ? 'text-zinc-900 dark:text-zinc-50'
                                : 'text-zinc-500 dark:text-zinc-400'
                            }`}
                    >
                        <item.icon size={24} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
