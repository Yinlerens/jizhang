'use client'

import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import { getStatusBadge } from '@/lib/bangumi/detail-view-model'
import type { AnimeDetail } from '@/lib/types'

export function DetailBackLink() {
  return (
    <Link
      href="/dashboard/bangumi"
      className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition"
    >
      <ArrowLeft size={16} />
      返回搜索
    </Link>
  )
}

export function StatusBadge({ status }: { status: AnimeDetail['status'] }) {
  const { label, tone } = getStatusBadge(status)

  const toneClass = {
    success: 'bg-green-500/20 text-green-400',
    info: 'bg-blue-500/20 text-blue-400',
    neutral: 'bg-zinc-500/20 text-zinc-300',
  }[tone]

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${toneClass}`}>
      {label}
    </span>
  )
}

export function ScoreBadge({
  score,
  count,
}: {
  score: number | null
  count: number
}) {
  if (!score) return null

  return (
    <span className="flex items-center gap-1 text-amber-400">
      <Star size={14} className="fill-current" />
      <span className="font-bold text-sm">{score.toFixed(1)}</span>
      {count > 0 && (
        <span className="text-white/40 text-xs ml-0.5">{count}人</span>
      )}
    </span>
  )
}

export function TagPill({ tag }: { tag: string }) {
  return (
    <span className="text-xs text-white/50 bg-white/[0.06] border border-white/[0.08] px-2.5 py-1 rounded-full">
      {tag}
    </span>
  )
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  )
}
