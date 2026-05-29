import { Transaction } from '@/lib/types'
import { format } from 'date-fns'

interface RecentTransactionsProps {
    transactions: Transaction[]
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <div className="anime-surface p-5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="anime-panel-title text-lg">最近支出</h3>
                <button className="text-sm font-black text-[#8f5b72] hover:text-[#26223a] dark:text-cyan-100/70 dark:hover:text-cyan-50">查看全部</button>
            </div>
            <div className="space-y-4">
                {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between rounded-md border border-[#26223a]/10 bg-white/50 p-3 transition duration-200 hover:border-[#26223a] hover:bg-[#fff9ec] dark:border-cyan-300/10 dark:bg-white/5 dark:hover:border-cyan-300/30">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-[#26223a] bg-[#bdf7b7] font-black text-[#26223a] dark:border-cyan-200 dark:bg-cyan-300">
                                {t.merchant?.[0] || t.category?.[0] || '?'}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-black text-[#26223a] dark:text-cyan-50">
                                    {t.merchant || '未知商户'}
                                </p>
                                <p className="text-xs font-bold text-[#8f5b72] dark:text-cyan-100/60">
                                    {t.category} • {format(new Date(t.occurred_at), 'MM-dd HH:mm')}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-[#26223a] dark:text-cyan-50">
                                - ¥{Number(t.amount).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
                {transactions.length === 0 && (
                    <p className="py-4 text-center text-sm font-bold text-[#8f5b72] dark:text-cyan-100/60">暂无支出记录</p>
                )}
            </div>
        </div>
    )
}
