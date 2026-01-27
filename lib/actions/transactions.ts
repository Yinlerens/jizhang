'use server'

import { createClient } from '@/lib/supabase/server'
import { Transaction, DashboardStats } from '@/lib/types'
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns'

/**
 * 获取仪表盘统计数据
 * 包括总支出、本月支出、日均支出（近30天）、支出趋势（近7天）和消费类别分布
 */
export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient()

    // 1. 获取所有交易记录
    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('occurred_at', { ascending: false })

    if (error) {
        console.error('获取交易记录出错:', error)
    }
    console.log('已获取交易记录数量:', transactions?.length || 0)

    const typedTransactions = (transactions || []) as Transaction[]

    // 2. 计算总支出
    const totalSpending = typedTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0)

    // 3. 计算本月支出 (当前月份)
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)
    const monthlyTransactions = typedTransactions.filter(t => {
        const date = new Date(t.occurred_at)
        return date >= monthStart && date <= monthEnd
    })
    const monthlySpending = monthlyTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0)

    // 4. 计算日均支出 (过去30天)
    const thirtyDaysAgo = subDays(now, 30)
    const last30DaysTransactions = typedTransactions.filter(t => new Date(t.occurred_at) >= thirtyDaysAgo)
    const dailyAverage = last30DaysTransactions.length > 0
        ? last30DaysTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0) / 30
        : 0

    // 5. 计算支出趋势 (过去7天)
    // 生成最近7天的日期数组
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = subDays(now, 6 - i)
        return format(d, 'yyyy-MM-dd')
    })
    
    // 映射每一天的支出总额
    const spendingTrend = last7Days.map(date => {
        const dayAmount = typedTransactions
            .filter(t => format(new Date(t.occurred_at), 'yyyy-MM-dd') === date)
            .reduce((acc, curr) => acc + Number(curr.amount), 0)
        return { date: format(new Date(date), 'MM-dd'), amount: dayAmount }
    })

    // 6. 计算消费类别分布
    const categoryMap = new Map<string, number>()
    typedTransactions.forEach(t => {
        // 如果没有类别，默认为 '未分类'
        const cat = t.category || '未分类'
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + Number(t.amount))
    })
    
    // 转换为数组并按金额降序排序
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

/**
 * 获取最近的交易记录
 * @param limit 限制返回的记录数量，默认为 5 条
 */
export async function getRecentTransactions(limit = 5): Promise<Transaction[]> {
    const supabase = await createClient()
    const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('occurred_at', { ascending: false })
        .limit(limit)

    return (data || []) as Transaction[]
}