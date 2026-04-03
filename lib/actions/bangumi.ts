'use server'

import { AnimeItem, AnimeSearchResult } from '@/lib/types'

const BANGUMI_API = 'https://api.bgm.tv'
const ANILIST_API = 'https://graphql.anilist.co'

interface BangumiSubject {
  id: number
  type: number
  name: string
  name_cn: string
  summary: string
  air_date: string
  eps_count?: number
  images?: {
    large: string
    medium: string
    small: string
    grid: string
  }
  rating?: {
    score: number
    total: number
  }
  rank?: number
  tags?: { name: string; count: number }[]
}

interface AniListMedia {
  id: number
  title: {
    romaji: string
    english: string | null
    native: string | null
  }
  coverImage: { large: string } | null
  averageScore: number | null
  episodes: number | null
  status: string | null
}

async function fetchBangumi(keyword: string, limit: number, offset: number) {
  const res = await fetch(`${BANGUMI_API}/v0/search/subjects?limit=${limit}&offset=${offset}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'AnimationFrame/1.0' },
    cache: 'no-store',
    body: JSON.stringify({
      keyword,
      sort: 'match',
      filter: { type: [2] },
    }),
  })

  if (!res.ok) {
    throw new Error(`Bangumi API error: ${res.status}`)
  }

  return res.json() as Promise<{ data: BangumiSubject[]; total: number; limit: number; offset: number }>
}

async function fetchAniList(keyword: string, perPage: number): Promise<AniListMedia[]> {
  const query = `
    query ($search: String!, $perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(search: $search, type: ANIME) {
          id
          title { romaji english native }
          coverImage { large }
          averageScore
          episodes
          status
        }
      }
    }
  `

  const res = await fetch(ANILIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({ query, variables: { search: keyword, perPage } }),
  })

  if (!res.ok) return []

  const json = await res.json()
  return json.data?.Page?.media ?? []
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[\s\-!！?？、。.,·:：;；]/g, '')
}

function matchAniListData(bangumiName: string, aniListResults: AniListMedia[]): AniListMedia | null {
  const normalized = normalizeTitle(bangumiName)
  if (!normalized) return null

  // Exact match first
  const exact = aniListResults.find((m) => {
    const romaji = normalizeTitle(m.title.romaji || '')
    const native = normalizeTitle(m.title.native || '')
    const english = normalizeTitle(m.title.english || '')
    return romaji === normalized || native === normalized || english === normalized
  })
  if (exact) return exact

  // Fuzzy match: either side contains the other
  return aniListResults.find((m) => {
    const romaji = normalizeTitle(m.title.romaji || '')
    const native = normalizeTitle(m.title.native || '')
    const english = normalizeTitle(m.title.english || '')
    return [romaji, native, english].some((t) =>
      t && (t.includes(normalized) || normalized.includes(t))
    )
  }) ?? null
}

function inferStatus(airDate: string): 'airing' | 'finished' | 'upcoming' {
  if (!airDate) return 'upcoming'
  const date = new Date(airDate)
  const now = new Date()
  if (date > now) return 'upcoming'
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  if (date < sixMonthsAgo) return 'finished'
  return 'airing'
}

function toBangumiItem(subject: BangumiSubject, aniListMatch: AniListMedia | null): AnimeItem {
  return {
    id: subject.id,
    name: subject.name,
    nameCn: subject.name_cn || subject.name,
    nameEn: aniListMatch?.title.english ?? null,
    summary: subject.summary || '',
    airDate: subject.air_date || '',
    episodeCount: subject.eps_count ?? aniListMatch?.episodes ?? 0,
    coverImage: subject.images?.large || subject.images?.medium || '',
    ratingBangumi: subject.rating?.score ?? null,
    ratingAniList: aniListMatch?.averageScore ? +(aniListMatch.averageScore / 10).toFixed(1) : null,
    tags: subject.tags?.slice(0, 5).map((t) => t.name) ?? [],
    status: inferStatus(subject.air_date || ''),
  }
}

function toAniListItem(media: AniListMedia): AnimeItem {
  return {
    id: -media.id,
    name: media.title.native || media.title.romaji,
    nameCn: media.title.native || media.title.romaji,
    nameEn: media.title.english ?? null,
    summary: '',
    airDate: '',
    episodeCount: media.episodes ?? 0,
    coverImage: media.coverImage?.large || '',
    ratingBangumi: null,
    ratingAniList: media.averageScore ? +(media.averageScore / 10).toFixed(1) : null,
    tags: [],
    status: media.status === 'RELEASING' ? 'airing'
      : media.status === 'NOT_YET_RELEASED' ? 'upcoming'
      : 'finished',
  }
}

export async function searchBangumi(keyword: string, offset = 0, limit = 24): Promise<AnimeSearchResult> {
  if (!keyword.trim()) {
    return { items: [], total: 0, hasMore: false }
  }

  const [bangumiResult, aniListResults] = await Promise.allSettled([
    fetchBangumi(keyword, limit, offset),
    fetchAniList(keyword, limit),
  ])

  const bangumiData = bangumiResult.status === 'fulfilled' ? bangumiResult.value : null
  const aniListData = aniListResults.status === 'fulfilled' ? aniListResults.value : []

  if (!bangumiData) {
    throw new Error('搜索失败，请稍后重试')
  }

  const matchedAniListIds = new Set<number>()

  const items = (bangumiData.data ?? []).map((subject) => {
    const aniListMatch = matchAniListData(subject.name, aniListData)
      ?? (subject.name_cn ? matchAniListData(subject.name_cn, aniListData) : null)
    if (aniListMatch) matchedAniListIds.add(aniListMatch.id)
    return toBangumiItem(subject, aniListMatch)
  })

  // Append AniList-only results that Bangumi didn't return
  if (offset === 0) {
    const aniListOnly = aniListData
      .filter((m) => !matchedAniListIds.has(m.id))
      .map(toAniListItem)
    items.push(...aniListOnly)
  }

  return {
    items,
    total: bangumiData.total + (offset === 0 ? aniListData.filter((m) => !matchedAniListIds.has(m.id)).length : 0),
    hasMore: offset + limit < bangumiData.total,
  }
}
