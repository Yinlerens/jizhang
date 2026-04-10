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
  genres: string[] | null
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

function toBangumiItem(subject: BangumiSubject): AnimeItem {
  return {
    id: subject.id,
    name: subject.name,
    nameCn: subject.name_cn || subject.name,
    nameEn: null,
    summary: subject.summary || '',
    airDate: subject.air_date || '',
    episodeCount: subject.eps_count ?? 0,
    coverImage: subject.images?.large || subject.images?.medium || '',
    ratingBangumi: subject.rating?.score ?? null,
    ratingAniList: null,
    tags: subject.tags?.slice(0, 5).map((t) => t.name) ?? [],
    status: inferStatus(subject.air_date || ''),
  }
}

function toAniListItem(media: AniListMedia): AnimeItem {
  return {
    id: media.id,
    name: media.title.romaji || media.title.native || '',
    nameCn: media.title.native || media.title.romaji || '',
    nameEn: media.title.english ?? null,
    summary: '',
    airDate: '',
    episodeCount: media.episodes ?? 0,
    coverImage: media.coverImage?.large || '',
    ratingBangumi: null,
    ratingAniList: media.averageScore ? +(media.averageScore / 10).toFixed(1) : null,
    tags: media.genres?.slice(0, 5) ?? [],
    status: media.status === 'RELEASING' ? 'airing'
      : media.status === 'NOT_YET_RELEASED' ? 'upcoming'
      : 'finished',
  }
}

export async function searchBangumi(keyword: string, offset = 0, limit = 24): Promise<AnimeSearchResult> {
  if (!keyword.trim()) {
    return { items: [], total: 0, hasMore: false }
  }

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

  const data = await res.json() as { data: BangumiSubject[]; total: number }
  const items = (data.data ?? []).map(toBangumiItem)

  return {
    items,
    total: data.total,
    hasMore: offset + limit < data.total,
  }
}

export async function searchAniList(keyword: string, page = 1, perPage = 24): Promise<AnimeSearchResult> {
  if (!keyword.trim()) {
    return { items: [], total: 0, hasMore: false }
  }

  const query = `
    query ($search: String!, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { total hasNextPage }
        media(search: $search, type: ANIME) {
          id
          title { romaji english native }
          coverImage { large }
          averageScore
          episodes
          status
          genres
        }
      }
    }
  `

  const res = await fetch(ANILIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({ query, variables: { search: keyword, page, perPage } }),
  })

  if (!res.ok) {
    throw new Error(`AniList API error: ${res.status}`)
  }

  const json = await res.json()
  const pageData = json.data?.Page
  const items = (pageData?.media ?? []).map(toAniListItem)

  return {
    items,
    total: pageData?.pageInfo?.total ?? items.length,
    hasMore: pageData?.pageInfo?.hasNextPage ?? false,
  }
}

