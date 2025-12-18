'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Transaction } from '@/lib/types'
import { format } from 'date-fns'
import { Search, Filter, Image as ImageIcon, X } from 'lucide-react'

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data } = await supabase
                .from('transactions')
                .select('*')
                .order('occurred_at', { ascending: false })

            setTransactions((data || []) as Transaction[])
            setLoading(false)
        }

        fetchTransactions()
    }, [])

    const filteredTransactions = transactions.filter(t =>
        t.merchant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">账单记录</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">管理您的所有交易明细</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="搜索商户或分类"
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">时间</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">商户</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">分类</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">金额</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-center">附件</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {filteredTransactions.map((t) => (
                                <tr key={t.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                                        {format(new Date(t.occurred_at), 'yyyy-MM-dd HH:mm')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                        {t.merchant || '未填写'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full">
                                            {t.category || '未分类'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-zinc-900 dark:text-zinc-50">
                                        ¥{Number(t.amount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {t.image_path ? (
                                            <button
                                                onClick={() => setSelectedImage(t.image_path)}
                                                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition duration-200"
                                            >
                                                <ImageIcon size={18} />
                                            </button>
                                        ) : (
                                            <span className="text-zinc-300 dark:text-zinc-700">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!loading && filteredTransactions.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">没有找到相关记录</p>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
                    >
                        <X size={24} />
                    </button>
                    <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${selectedImage}`}
                            alt="Transaction receipt"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
