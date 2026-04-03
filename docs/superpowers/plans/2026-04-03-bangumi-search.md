# Bangumi Search & Display Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add anime search functionality to the dashboard, powered by Bangumi API (primary) and AniList API (supplementary), with switchable grid/list card display.

**Architecture:** Server Actions proxy external API calls. A single client page manages search state, debounced input, and renders results using switchable grid/list views. Bangumi provides core data; AniList supplements English titles and scores via name matching.

**Tech Stack:** Next.js 16 Server Actions, React 19 client components, Tailwind CSS v4, Lucide icons, existing project patterns.

**Spec:** `docs/superpowers/specs/2026-04-03-bangumi-search-design.md`

---

## File Structure

| Action | Path | Responsibility |
|--------|------|---------------|
| Modify | `lib/types.ts` | Add AnimeItem and AnimeSearchResult types |
| Create | `lib/actions/bangumi.ts` | Server Actions: searchBangumi() — calls Bangumi + AniList APIs, merges results |
| Create | `components/bangumi/SearchBar.tsx` | Search input with debounce |
| Create | `components/bangumi/ViewToggle.tsx` | Grid/List view toggle buttons |
| Create | `components/bangumi/AnimeCard.tsx` | Single anime card (grid + list mode) |
| Create | `components/bangumi/AnimeGrid.tsx` | Results container: manages layout, empty/loading states |
| Create | `app/dashboard/(padded)/bangumi/page.tsx` | Main bangumi search page |
| Modify | `components/Sidebar.tsx` | Add "番剧" menu group |
| Modify | `components/MobileNav.tsx` | Add "番剧" tab |

---

### Task 1: Add Anime Types

**Files:**
- Modify: `lib/types.ts:73` (append after existing types)

- [ ] **Step 1: Add AnimeItem and AnimeSearchResult types**

Append these types at the end of `lib/types.ts`:

```typescript
// === 番剧搜索类型定义 ===

/** 统一的番剧数据格式 */
export interface AnimeItem {
  id: number
  name: string
  nameCn: string
  nameEn: string | null
  summary: string
  airDate: string
  episodeCount: number
  coverImage: string
  ratingBangumi: number | null
  ratingAniList: number | null
  tags: string[]
  status: 'airing' | 'finished' | 'upcoming'
}

/** 番剧搜索结果 */
export interface AnimeSearchResult {
  items: AnimeItem[]
  total: number
  hasMore: boolean
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/types.ts
git commit -m "feat(bangumi): add AnimeItem and AnimeSearchResult types"
```

---

### Task 2: Create Server Action for Bangumi Search

**Files:**
- Create: `lib/actions/bangumi.ts`

- [ ] **Step 1: Create the searchBangumi server action**

Create `lib/actions/bangumi.ts`:

```typescript
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
  return aniListResults.find((m) => {
    const romaji = normalizeTitle(m.title.romaji || '')
    const native = normalizeTitle(m.title.native || '')
    const english = normalizeTitle(m.title.english || '')
    return romaji === normalized || native === normalized || english === normalized
  }) ?? null
}

function inferStatus(airDate: string): 'airing' | 'finished' | 'upcoming' {
  if (!airDate) return 'upcoming'
  const date = new Date(airDate)
  const now = new Date()
  if (date > now) return 'upcoming'
  // Rough heuristic: if air date is more than 6 months ago, likely finished
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

  const items = bangumiData.data.map((subject) => {
    const aniListMatch = matchAniListData(subject.name, aniListData)
    return toBangumiItem(subject, aniListMatch)
  })

  return {
    items,
    total: bangumiData.total,
    hasMore: offset + limit < bangumiData.total,
  }
}
```

- [ ] **Step 2: Verify the server action compiles**

Run: `npx next lint --file lib/actions/bangumi.ts` or just check that `npx tsc --noEmit` passes without errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add lib/actions/bangumi.ts
git commit -m "feat(bangumi): add searchBangumi server action with Bangumi + AniList API"
```

---

### Task 3: Create SearchBar Component

**Files:**
- Create: `components/bangumi/SearchBar.tsx`

- [ ] **Step 1: Create SearchBar component**

Create `components/bangumi/SearchBar.tsx`:

```tsx
'use client'

import { Search, X } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'

interface SearchBarProps {
  onSearch: (keyword: string) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const debouncedSearch = useCallback(
    (keyword: string) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        onSearch(keyword)
      }, 300)
    },
    [onSearch]
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedSearch(newValue)
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="搜索番剧..."
        className="w-full pl-11 pr-10 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition duration-200"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <X size={18} />
          )}
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/bangumi/SearchBar.tsx
git commit -m "feat(bangumi): add SearchBar component with debounced input"
```

---

### Task 4: Create ViewToggle Component

**Files:**
- Create: `components/bangumi/ViewToggle.tsx`

- [ ] **Step 1: Create ViewToggle component**

Create `components/bangumi/ViewToggle.tsx`:

```tsx
'use client'

import { LayoutGrid, List } from 'lucide-react'

interface ViewToggleProps {
  viewMode: 'grid' | 'list'
  onToggle: (mode: 'grid' | 'list') => void
}

export default function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
      <button
        onClick={() => onToggle('grid')}
        className={`p-2 rounded-md transition duration-200 ${
          viewMode === 'grid'
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
        }`}
        title="网格视图"
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => onToggle('list')}
        className={`p-2 rounded-md transition duration-200 ${
          viewMode === 'list'
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
        }`}
        title="列表视图"
      >
        <List size={16} />
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/bangumi/ViewToggle.tsx
git commit -m "feat(bangumi): add ViewToggle component for grid/list switching"
```

---

### Task 5: Create AnimeCard Component

**Files:**
- Create: `components/bangumi/AnimeCard.tsx`

- [ ] **Step 1: Create AnimeCard component**

Create `components/bangumi/AnimeCard.tsx`:

```tsx
'use client'

import { Star } from 'lucide-react'
import { AnimeItem } from '@/lib/types'

interface AnimeCardProps {
  anime: AnimeItem
  viewMode: 'grid' | 'list'
}

function StatusBadge({ status }: { status: AnimeItem['status'] }) {
  const config = {
    airing: { label: '放送中', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    finished: { label: '已完结', className: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
    upcoming: { label: '未放送', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  }
  const { label, className } = config[status]
  return <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${className}`}>{label}</span>
}

function RatingDisplay({ bangumi, aniList }: { bangumi: number | null; aniList: number | null }) {
  if (!bangumi && !aniList) return null
  return (
    <div className="flex items-center gap-1.5">
      {bangumi && (
        <span className="flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400">
          <Star size={12} className="fill-current" />
          {bangumi.toFixed(1)}
        </span>
      )}
      {aniList && (
        <span className="text-[10px] text-zinc-400">
          AL {aniList.toFixed(1)}
        </span>
      )}
    </div>
  )
}

function GridCard({ anime }: { anime: AnimeItem }) {
  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="aspect-[2/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        {anime.coverImage ? (
          <img
            src={anime.coverImage}
            alt={anime.nameCn || anime.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
            暂无封面
          </div>
        )}
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">
          {anime.nameCn || anime.name}
        </h3>
        {anime.nameCn && anime.name !== anime.nameCn && (
          <p className="text-[11px] text-zinc-400 line-clamp-1">{anime.name}</p>
        )}
        <div className="flex items-center justify-between">
          <RatingDisplay bangumi={anime.ratingBangumi} aniList={anime.ratingAniList} />
          {anime.episodeCount > 0 && (
            <span className="text-[10px] text-zinc-400">{anime.episodeCount}集</span>
          )}
        </div>
      </div>
    </div>
  )
}

function ListCard({ anime }: { anime: AnimeItem }) {
  return (
    <div className="flex gap-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="w-16 h-22 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {anime.coverImage ? (
          <img
            src={anime.coverImage}
            alt={anime.nameCn || anime.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-[10px]">
            暂无
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">
            {anime.nameCn || anime.name}
          </h3>
          <StatusBadge status={anime.status} />
        </div>
        {anime.nameCn && anime.name !== anime.nameCn && (
          <p className="text-[11px] text-zinc-400 line-clamp-1">{anime.name}</p>
        )}
        {anime.summary && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{anime.summary}</p>
        )}
        <div className="flex items-center gap-3 pt-0.5">
          <RatingDisplay bangumi={anime.ratingBangumi} aniList={anime.ratingAniList} />
          {anime.episodeCount > 0 && (
            <span className="text-[10px] text-zinc-400">{anime.episodeCount}集</span>
          )}
          {anime.tags.length > 0 && (
            <div className="flex gap-1">
              {anime.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AnimeCard({ anime, viewMode }: AnimeCardProps) {
  return viewMode === 'grid' ? <GridCard anime={anime} /> : <ListCard anime={anime} />
}
```

- [ ] **Step 2: Commit**

```bash
git add components/bangumi/AnimeCard.tsx
git commit -m "feat(bangumi): add AnimeCard component with grid and list modes"
```

---

### Task 6: Create AnimeGrid Component

**Files:**
- Create: `components/bangumi/AnimeGrid.tsx`

- [ ] **Step 1: Create AnimeGrid component**

Create `components/bangumi/AnimeGrid.tsx`:

```tsx
'use client'

import { AnimeItem } from '@/lib/types'
import AnimeCard from './AnimeCard'

interface AnimeGridProps {
  items: AnimeItem[]
  viewMode: 'grid' | 'list'
  isLoading: boolean
  hasSearched: boolean
  hasMore: boolean
  onLoadMore: () => void
  isLoadingMore: boolean
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="aspect-[2/3] bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="w-16 h-22 flex-shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-1/3 animate-pulse" />
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-1/2 animate-pulse" />
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AnimeGrid({
  items,
  viewMode,
  isLoading,
  hasSearched,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: AnimeGridProps) {
  if (isLoading) {
    return viewMode === 'grid' ? <SkeletonGrid /> : <SkeletonList />
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
        <p className="text-lg">输入关键词搜索番剧</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
        <p className="text-lg">未找到相关番剧</p>
      </div>
    )
  }

  return (
    <div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} viewMode="list" />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition duration-200 disabled:opacity-50"
          >
            {isLoadingMore ? '加载中...' : '加载更多'}
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/bangumi/AnimeGrid.tsx
git commit -m "feat(bangumi): add AnimeGrid component with skeleton loading and empty states"
```

---

### Task 7: Create Bangumi Search Page

**Files:**
- Create: `app/dashboard/(padded)/bangumi/page.tsx`

- [ ] **Step 1: Create the bangumi search page**

Create `app/dashboard/(padded)/bangumi/page.tsx`:

```tsx
'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { AnimeItem } from '@/lib/types'
import { searchBangumi } from '@/lib/actions/bangumi'
import SearchBar from '@/components/bangumi/SearchBar'
import ViewToggle from '@/components/bangumi/ViewToggle'
import AnimeGrid from '@/components/bangumi/AnimeGrid'

const PAGE_SIZE = 24

export default function BangumiPage() {
  const [results, setResults] = useState<AnimeItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hasSearched, setHasSearched] = useState(false)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [currentKeyword, setCurrentKeyword] = useState('')

  const handleSearch = useCallback(async (keyword: string) => {
    setCurrentKeyword(keyword)

    if (!keyword.trim()) {
      setResults([])
      setHasSearched(false)
      setTotal(0)
      setHasMore(false)
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      const result = await searchBangumi(keyword, 0, PAGE_SIZE)
      setResults(result.items)
      setTotal(result.total)
      setHasMore(result.hasMore)
    } catch {
      toast.error('搜索失败，请稍后重试')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleLoadMore = useCallback(async () => {
    if (!currentKeyword.trim() || isLoadingMore) return

    setIsLoadingMore(true)

    try {
      const result = await searchBangumi(currentKeyword, results.length, PAGE_SIZE)
      setResults((prev) => [...prev, ...result.items])
      setHasMore(result.hasMore)
    } catch {
      toast.error('加载失败，请稍后重试')
    } finally {
      setIsLoadingMore(false)
    }
  }, [currentKeyword, results.length, isLoadingMore])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">番剧搜索</h2>
        <p className="text-zinc-500 dark:text-zinc-400">搜索并浏览番剧信息</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
      </div>

      {hasSearched && !isLoading && results.length > 0 && (
        <p className="text-sm text-zinc-400">
          共找到 {total} 个结果
        </p>
      )}

      <AnimeGrid
        items={results}
        viewMode={viewMode}
        isLoading={isLoading}
        hasSearched={hasSearched}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/dashboard/(padded)/bangumi/page.tsx
git commit -m "feat(bangumi): add bangumi search page"
```

---

### Task 8: Update Navigation (Sidebar + MobileNav)

**Files:**
- Modify: `components/Sidebar.tsx:1-45` (imports and menuGroups)
- Modify: `components/MobileNav.tsx:1-11` (imports and tabs)

- [ ] **Step 1: Add Tv2 import and bangumi menu group to Sidebar**

In `components/Sidebar.tsx`, add `Tv2` to the lucide-react import and add the bangumi menu group:

Add `Tv2, Search` to the import on line 5-15:

```typescript
import {
  LayoutDashboard,
  ReceiptText,
  BarChart3,
  Settings,
  LogOut,
  Wallet,
  Navigation,
  MapPin,
  ChevronDown,
  Tv2,
  Search,
} from "lucide-react";
```

Then add the bangumi group to the `menuGroups` array (after the "出行" group, before `];`):

```typescript
  {
    label: "番剧",
    icon: Tv2,
    items: [
      { icon: Search, label: "搜索", href: "/dashboard/bangumi" },
    ],
  },
```

- [ ] **Step 2: Add bangumi tab to MobileNav**

In `components/MobileNav.tsx`, add `Tv2` to the import:

```typescript
import { Wallet, Navigation, Tv2, Settings } from 'lucide-react'
```

Then add the bangumi tab to the `tabs` array (between 出行 and 设置):

```typescript
    { icon: Tv2, label: '番剧', href: '/dashboard/bangumi', matchPaths: ['/dashboard/bangumi'] },
```

The final `tabs` array should be:

```typescript
const tabs = [
    { icon: Wallet, label: '记账', href: '/dashboard', matchPaths: ['/dashboard', '/dashboard/transactions', '/dashboard/stats'] },
    { icon: Navigation, label: '出行', href: '/dashboard/travel', matchPaths: ['/dashboard/travel'] },
    { icon: Tv2, label: '番剧', href: '/dashboard/bangumi', matchPaths: ['/dashboard/bangumi'] },
    { icon: Settings, label: '设置', href: '/dashboard/settings', matchPaths: ['/dashboard/settings'] },
]
```

- [ ] **Step 3: Commit**

```bash
git add components/Sidebar.tsx components/MobileNav.tsx
git commit -m "feat(bangumi): add bangumi navigation to Sidebar and MobileNav"
```

---

### Task 9: Manual Verification

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify navigation**

- Open `http://localhost:3000/dashboard`
- Confirm "番剧" menu group appears in sidebar with Tv2 icon
- Click "搜索" navigates to `/dashboard/bangumi`
- On mobile viewport, confirm "番剧" tab appears in bottom nav

- [ ] **Step 3: Verify search functionality**

- On `/dashboard/bangumi`, confirm the page loads with "输入关键词搜索番剧" placeholder
- Type "孤独摇滚" in search bar
- Confirm results appear as grid cards with cover images, Chinese titles, ratings
- Confirm skeleton loading shows during search

- [ ] **Step 4: Verify view switching**

- Click the list view toggle
- Confirm cards switch to horizontal list format with summaries and tags
- Click grid toggle to switch back
- Confirm grid view restores

- [ ] **Step 5: Verify load more**

- Search for a common term like "高达" (Gundam)
- Scroll down and click "加载更多"
- Confirm more results append below

- [ ] **Step 6: Verify error handling**

- Confirm empty search clears results
- Confirm "未找到相关番剧" shows for gibberish input

- [ ] **Step 7: Final commit**

If any fixes were needed during verification, commit them:

```bash
git add -A
git commit -m "fix(bangumi): address issues found during manual verification"
```
