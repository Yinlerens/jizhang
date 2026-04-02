'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wallet, Navigation, Settings, BrainCircuit, Orbit } from 'lucide-react'

const tabs = [
    { icon: Wallet, label: '记账', href: '/dashboard', matchPaths: ['/dashboard', '/dashboard/transactions', '/dashboard/stats'] },
    { icon: Navigation, label: '出行', href: '/dashboard/travel', matchPaths: ['/dashboard/travel'] },
    { icon: BrainCircuit, label: 'Gemini', href: '/dashboard/gemini/tetris', matchPaths: ['/dashboard/gemini'] },
    { icon: Orbit, label: 'AG', href: '/dashboard/antigravity/tetris', matchPaths: ['/dashboard/antigravity'] },
    { icon: Settings, label: '设置', href: '/dashboard/settings', matchPaths: ['/dashboard/settings'] },
]

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-around bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-2 py-3">
            {tabs.map((tab) => {
                const isActive = tab.matchPaths.some(
                    (p) => pathname === p || (p !== '/dashboard' && pathname.startsWith(p + '/'))
                ) || (tab.href === '/dashboard' && pathname === '/dashboard')
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
