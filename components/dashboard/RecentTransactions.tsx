import { Transaction } from '@/lib/types'
import { format } from 'date-fns'

interface RecentTransactionsProps {
    transactions: Transaction[]
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">最近支出</h3>
                <button className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium">查看全部</button>
            </div>
            <div className="space-y-4">
                {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 font-bold shrink-0">
                                {t.merchant?.[0] || t.category?.[0] || '?'}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                                    {t.merchant || '未知商户'}
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {t.category} • {format(new Date(t.occurred_at), 'MM-dd HH:mm')}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                                - ¥{Number(t.amount).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
                {transactions.length === 0 && (
                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-4">暂无支出记录</p>
                )}
            </div>
        </div>
    )
}
