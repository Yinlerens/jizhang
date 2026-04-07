'use server'

import { AnimeItem, AnimeSearchResult, AnimeDetail, CharacterInfo, StaffInfo, RelatedAnime } from '@/lib/types'

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

// === Detail Actions ===

const BGM_HEADERS = { 'User-Agent': 'AnimationFrame/1.0' }

export async function getBangumiDetail(id: number): Promise<AnimeDetail> {
  const [subjectRes, charsRes, personsRes] = await Promise.all([
    fetch(`${BANGUMI_API}/v0/subjects/${id}`, { headers: BGM_HEADERS, cache: 'no-store' }),
    fetch(`${BANGUMI_API}/v0/subjects/${id}/characters`, { headers: BGM_HEADERS, cache: 'no-store' }),
    fetch(`${BANGUMI_API}/v0/subjects/${id}/persons`, { headers: BGM_HEADERS, cache: 'no-store' }),
  ])

  if (!subjectRes.ok) throw new Error(`Bangumi subject error: ${subjectRes.status}`)

  const subject = await subjectRes.json()
  const charsData = charsRes.ok ? await charsRes.json() : []
  const personsData = personsRes.ok ? await personsRes.json() : []

  const characters: CharacterInfo[] = (Array.isArray(charsData) ? charsData : []).slice(0, 20).map((c: any) => ({
    id: c.id,
    name: c.name || '',
    nameCn: c.name_cn || c.name || '',
    image: c.images?.medium || c.images?.grid || '',
    role: c.relation === '主角' ? 'main' as const : 'supporting' as const,
    voiceActor: c.actors?.[0] ? {
      id: c.actors[0].id,
      name: c.actors[0].name || '',
      image: c.actors[0].images?.medium || c.actors[0].images?.grid || '',
    } : undefined,
  }))

  const staff: StaffInfo[] = (Array.isArray(personsData) ? personsData : []).slice(0, 20).map((p: any) => ({
    id: p.id,
    name: p.name || '',
    image: p.images?.medium || p.images?.grid || '',
    role: p.relation || '',
  }))

  return {
    id: subject.id,
    name: subject.name || '',
    nameCn: subject.name_cn || subject.name || '',
    nameEn: null,
    summary: subject.summary || '',
    airDate: subject.date || subject.air_date || '',
    episodeCount: subject.eps || subject.total_episodes || 0,
    coverImage: subject.images?.large || subject.images?.common || '',
    bannerImage: null,
    ratingScore: subject.rating?.score ?? null,
    ratingCount: subject.rating?.total ?? 0,
    tags: (subject.tags ?? []).slice(0, 10).map((t: any) => t.name),
    status: inferStatus(subject.date || subject.air_date || ''),
    source: 'bgm',
    characters,
    staff,
    related: [],
  }
}

export async function getAniListDetail(id: number): Promise<AnimeDetail> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji english native }
        description(asHtml: false)
        bannerImage
        coverImage { extraLarge large }
        averageScore
        meanScore
        popularity
        episodes
        duration
        status
        season
        seasonYear
        genres
        tags { name rank }
        startDate { year month day }
        studios(isMain: true) { nodes { id name } }
        characters(sort: [ROLE, RELEVANCE], perPage: 20) {
          edges {
            role
            node { id name { native userPreferred } image { medium } }
            voiceActors(language: JAPANESE) { id name { native userPreferred } image { medium } }
          }
        }
        staff(sort: [RELEVANCE], perPage: 20) {
          edges {
            role
            node { id name { native userPreferred } image { medium } }
          }
        }
        relations {
          edges {
            relationType
            node {
              id
              title { romaji native }
              coverImage { medium }
              type
            }
          }
        }
      }
    }
  `

  const res = await fetch(ANILIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({ query, variables: { id } }),
  })

  if (!res.ok) throw new Error(`AniList detail error: ${res.status}`)

  const json = await res.json()
  const m = json.data?.Media
  if (!m) throw new Error('AniList: media not found')

  const characters: CharacterInfo[] = (m.characters?.edges ?? []).map((e: any) => ({
    id: e.node.id,
    name: e.node.name?.userPreferred || '',
    nameCn: e.node.name?.native || e.node.name?.userPreferred || '',
    image: e.node.image?.medium || '',
    role: e.role === 'MAIN' ? 'main' as const : 'supporting' as const,
    voiceActor: e.voiceActors?.[0] ? {
      id: e.voiceActors[0].id,
      name: e.voiceActors[0].name?.userPreferred || e.voiceActors[0].name?.native || '',
      image: e.voiceActors[0].image?.medium || '',
    } : undefined,
  }))

  const staffList: StaffInfo[] = (m.staff?.edges ?? []).map((e: any) => ({
    id: e.node.id,
    name: e.node.name?.userPreferred || e.node.name?.native || '',
    image: e.node.image?.medium || '',
    role: e.role || '',
  }))

  const relationMap: Record<string, string> = {
    ADAPTATION: '改编', PREQUEL: '前传', SEQUEL: '续集', PARENT: '主作品',
    SIDE_STORY: '外传', CHARACTER: '角色出演', SUMMARY: '总集篇',
    ALTERNATIVE: '替代版', SPIN_OFF: '衍生', OTHER: '其他', SOURCE: '原作',
    COMPILATION: '合集', CONTAINS: '包含',
  }

  const related: RelatedAnime[] = (m.relations?.edges ?? []).map((e: any) => ({
    id: e.node.id,
    name: e.node.title?.romaji || '',
    nameCn: e.node.title?.native || e.node.title?.romaji || '',
    coverImage: e.node.coverImage?.medium || '',
    relation: relationMap[e.relationType] || e.relationType || '',
    source: 'al' as const,
  }))

  const startDate = m.startDate
  const airDate = startDate?.year ? `${startDate.year}-${String(startDate.month ?? 1).padStart(2, '0')}-${String(startDate.day ?? 1).padStart(2, '0')}` : ''

  const aniStatus = m.status === 'RELEASING' ? 'airing' as const
    : m.status === 'NOT_YET_RELEASED' ? 'upcoming' as const
    : 'finished' as const

  return {
    id: m.id,
    name: m.title?.romaji || '',
    nameCn: m.title?.native || m.title?.romaji || '',
    nameEn: m.title?.english ?? null,
    summary: (m.description || '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''),
    airDate,
    episodeCount: m.episodes ?? 0,
    coverImage: m.coverImage?.extraLarge || m.coverImage?.large || '',
    bannerImage: m.bannerImage || null,
    ratingScore: m.averageScore ? +(m.averageScore / 10).toFixed(1) : null,
    ratingCount: m.popularity ?? 0,
    tags: (m.genres ?? []).slice(0, 10),
    status: aniStatus,
    source: 'al',
    characters,
    staff: staffList,
    related,
  }
}
