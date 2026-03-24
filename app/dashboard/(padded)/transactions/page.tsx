'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Transaction } from '@/lib/types'
import { format } from 'date-fns'
import { Search, Filter, Download } from 'lucide-react'
import { exportToExcel, ExportColumn } from '@/lib/export'

// 账单导出列配置
const transactionExportColumns: ExportColumn<Transaction>[] = [
    {
        header: '时间',
        key: 'occurred_at',
        formatter: (value) => format(new Date(value as string), 'yyyy-MM-dd HH:mm:ss')
    },
    {
        header: '商户',
        key: 'merchant',
        formatter: (value) => (value as string) || '未填写'
    },
    {
        header: '分类',
        key: 'category',
        formatter: (value) => (value as string) || '未分类'
    },
    {
        header: '金额',
        key: 'amount',
        formatter: (value) => Number(value)
    }
]

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
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

    const handleExport = () => {
        exportToExcel(filteredTransactions, transactionExportColumns, {
            filename: `账单记录_${format(new Date(), 'yyyyMMdd_HHmmss')}`,
            sheetName: '账单记录'
        })
    }

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
                    <button
                        onClick={handleExport}
                        disabled={filteredTransactions.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline">导出</span>
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
        </div>
    )
}
