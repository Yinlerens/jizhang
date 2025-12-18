'use server'

import { createClient } from '@/lib/supabase/server'
import { Transaction, DashboardStats } from '@/lib/types'
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns'

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient()

    // Get all transactions
    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('occurred_at', { ascending: false })

    if (error) {
        console.error('Error fetching transactions:', error)
    }
    console.log('Fetched transactions count:', transactions?.length || 0)

    const typedTransactions = (transactions || []) as Transaction[]

    // Total spending
    const totalSpending = typedTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0)

    // Monthly spending (current month)
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const monthlyTransactions = typedTransactions.filter(t => {
        const date = new Date(t.occurred_at)
        return date >= monthStart && date <= monthEnd
    })
    const monthlySpending = monthlyTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0)

    // Daily average (last 30 days)
    const thirtyDaysAgo = subDays(now, 30)
    const last30DaysTransactions = typedTransactions.filter(t => new Date(t.occurred_at) >= thirtyDaysAgo)
    const dailyAverage = last30DaysTransactions.length > 0
        ? last30DaysTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0) / 30
        : 0

    // Spending trend (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = subDays(now, 6 - i)
        return format(d, 'yyyy-MM-dd')
    })
    const spendingTrend = last7Days.map(date => {
        const dayAmount = typedTransactions
            .filter(t => format(new Date(t.occurred_at), 'yyyy-MM-dd') === date)
            .reduce((acc, curr) => acc + Number(curr.amount), 0)
        return { date: format(new Date(date), 'MM-dd'), amount: dayAmount }
    })

    // Category distribution
    const categoryMap = new Map<string, number>()
    typedTransactions.forEach(t => {
        const cat = t.category || '未分类'
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + Number(t.amount))
    })
    const categoryDistribution = Array.from(categoryMap.entries()).map(([category, amount]) => ({
        category,
        amount
    })).sort((a, b) => b.amount - a.amount)

    return {
        totalSpending,
        monthlySpending,
        dailyAverage,
        spendingTrend,
        categoryDistribution
    }
}

export async function getRecentTransactions(limit = 5): Promise<Transaction[]> {
    const supabase = await createClient()
    const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('occurred_at', { ascending: false })
        .limit(limit)

    return (data || []) as Transaction[]
}
