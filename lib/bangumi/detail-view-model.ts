import type { AnimeDetail } from '@/lib/types'

export function getDisplayTitles(detail: AnimeDetail) {
  const primary = detail.nameCn || detail.name
  const secondary =
    detail.nameCn && detail.name !== detail.nameCn ? detail.name : detail.nameEn || ''
  const tertiary =
    detail.nameEn && detail.nameEn !== secondary ? detail.nameEn : ''

  return { primary, secondary, tertiary }
}

export function getMetaItems(detail: AnimeDetail) {
  const items: string[] = []

  if (detail.ratingScore) items.push(detail.ratingScore.toFixed(1))
  if (detail.ratingCount > 0) items.push(`${detail.ratingCount}人评分`)
  if (detail.airDate) items.push(String(new Date(detail.airDate).getFullYear()))
  if (detail.episodeCount > 0) items.push(`${detail.episodeCount}集`)

  return items
}

export function getStatusBadge(status: AnimeDetail['status']) {
  if (status === 'airing') return { label: '放送中', tone: 'success' as const }
  if (status === 'upcoming') return { label: '未放送', tone: 'info' as const }
  return { label: '已完结', tone: 'neutral' as const }
}

export function getInitial(value?: string | null) {
  return value?.trim()?.charAt(0) || '?'
}
