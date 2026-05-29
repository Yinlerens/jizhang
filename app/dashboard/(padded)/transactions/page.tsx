'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Transaction } from '@/lib/types'
import { format } from 'date-fns'
import { Search, Filter, Download } from 'lucide-react'
import { exportToExcel, ExportColumn } from '@/lib/export'
import { usePostHog } from 'posthog-js/react'

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
    const supabaseRef = useRef(createClient())
    const posthog = usePostHog()

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data } = await supabaseRef.current
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

    // 搜索行为追踪：用户停止输入 800ms 后记录一次搜索事件
    useEffect(() => {
        if (!searchTerm.trim()) return
        const timer = setTimeout(() => {
            posthog.capture('transaction_searched', {
                search_term: searchTerm,
                result_count: filteredTransactions.length,
            })
        }, 800)
        return () => clearTimeout(timer)
    }, [searchTerm]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleExport = () => {
        exportToExcel(filteredTransactions, transactionExportColumns, {
            filename: `账单记录_${format(new Date(), 'yyyyMMdd_HHmmss')}`,
            sheetName: '账单记录'
        })
        posthog.capture('transaction_exported', {
            count: filteredTransactions.length,
            has_search_filter: searchTerm.length > 0,
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="anime-kicker">Ledger Log</div>
                    <h2 className="anime-page-title mt-4">账单记录</h2>
                    <p className="anime-page-subtitle">管理您的所有交易明细</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8f5b72] dark:text-cyan-100/60" size={18} />
                        <input
                            type="text"
                            placeholder="搜索商户或分类"
                            className="anime-input h-10 w-full px-4 pl-10 text-sm font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="grid h-10 w-10 place-items-center rounded-md border-2 border-[#26223a] bg-white/80 text-[#26223a] transition hover:-translate-y-0.5 dark:border-cyan-300/25 dark:bg-white/10 dark:text-cyan-50">
                        <Filter size={18} />
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={filteredTransactions.length === 0}
                        className="anime-action"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline">导出</span>
                    </button>
                </div>
            </div>

            <div className="anime-surface overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#ffd657] text-[#26223a] dark:bg-cyan-300 dark:text-[#10131f]">
                            <tr>
                                <th className="px-6 py-4 text-xs font-black uppercase">时间</th>
                                <th className="px-6 py-4 text-xs font-black uppercase">商户</th>
                                <th className="px-6 py-4 text-xs font-black uppercase">分类</th>
                                <th className="px-6 py-4 text-right text-xs font-black uppercase">金额</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#26223a]/10 dark:divide-cyan-300/10">
                            {filteredTransactions.map((t) => (
                                <tr key={t.id} className="transition duration-150 hover:bg-[#fff1f6] dark:hover:bg-cyan-300/5">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-[#6e6172] dark:text-cyan-100/60">
                                        {format(new Date(t.occurred_at), 'yyyy-MM-dd HH:mm')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-black text-[#26223a] dark:text-cyan-50">
                                        {t.merchant || '未填写'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="rounded-md border border-[#26223a] bg-[#bdf7b7] px-2 py-1 text-xs font-black text-[#26223a] dark:border-cyan-200 dark:bg-cyan-300 dark:text-[#10131f]">
                                            {t.category || '未分类'}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-black text-[#26223a] dark:text-cyan-50">
                                        ¥{Number(t.amount).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!loading && filteredTransactions.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-sm font-bold text-[#8f5b72] dark:text-cyan-100/60">没有找到相关记录</p>
                    </div>
                )}
            </div>
        </div>
    )
}
