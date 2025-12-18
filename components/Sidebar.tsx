'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ReceiptText, BarChart3, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const menuItems = [
    { icon: LayoutDashboard, label: '概览', href: '/dashboard' },
    { icon: ReceiptText, label: '账单记录', href: '/dashboard/transactions' },
    { icon: BarChart3, label: '统计分析', href: '/dashboard/stats' },
    { icon: Settings, label: '设置', href: '/dashboard/settings' },
]

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="w-64 flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
            <div className="p-6">
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center">
                        <ReceiptText size={20} className="text-white dark:text-zinc-900" />
                    </div>
                    记账管理
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 ${isActive
                                    ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-center gap-3 px-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                            {user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition duration-200 rounded-xl"
                >
                    <LogOut size={20} />
                    <span className="font-medium">注销登出</span>
                </button>
            </div>
        </div>
    )
}
