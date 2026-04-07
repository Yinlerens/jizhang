'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { AnimeItem } from '@/lib/types'
import { searchBangumi, searchAniList } from '@/lib/actions/bangumi'
import SearchBar from '@/components/bangumi/SearchBar'
import ViewToggle from '@/components/bangumi/ViewToggle'
import AnimeGrid from '@/components/bangumi/AnimeGrid'

type Source = 'bangumi' | 'anilist'

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
  const [source, setSource] = useState<Source>('bangumi')
  const [aniListPage, setAniListPage] = useState(1)

  const doSearch = useCallback(async (keyword: string, src: Source) => {
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
      const result = src === 'bangumi'
        ? await searchBangumi(keyword, 0, PAGE_SIZE)
        : await searchAniList(keyword, 1, PAGE_SIZE)
      setResults(result.items)
      setTotal(result.total)
      setHasMore(result.hasMore)
      if (src === 'anilist') setAniListPage(1)
    } catch {
      toast.error('搜索失败，请稍后重试')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSearch = useCallback(async (keyword: string) => {
    setCurrentKeyword(keyword)
    doSearch(keyword, source)
  }, [source, doSearch])

  const handleSourceChange = useCallback((newSource: Source) => {
    setSource(newSource)
    setResults([])
    setHasSearched(false)
    setTotal(0)
    setHasMore(false)
    if (currentKeyword.trim()) {
      doSearch(currentKeyword, newSource)
    }
  }, [currentKeyword, doSearch])

  const handleLoadMore = useCallback(async () => {
    if (!currentKeyword.trim() || isLoadingMore) return

    setIsLoadingMore(true)

    try {
      let result
      if (source === 'bangumi') {
        result = await searchBangumi(currentKeyword, results.length, PAGE_SIZE)
      } else {
        const nextPage = aniListPage + 1
        result = await searchAniList(currentKeyword, nextPage, PAGE_SIZE)
        setAniListPage(nextPage)
      }
      setResults((prev) => [...prev, ...result.items])
      setHasMore(result.hasMore)
    } catch {
      toast.error('加载失败，请稍后重试')
    } finally {
      setIsLoadingMore(false)
    }
  }, [currentKeyword, results.length, isLoadingMore, source, aniListPage])

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

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleSourceChange('bangumi')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
            source === 'bangumi'
              ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          Bangumi
        </button>
        <button
          onClick={() => handleSourceChange('anilist')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
            source === 'anilist'
              ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          AniList
        </button>
        {hasSearched && !isLoading && results.length > 0 && (
          <span className="text-sm text-zinc-400 ml-2">
            共 {total} 个结果
          </span>
        )}
      </div>

      <AnimeGrid
        items={results}
        viewMode={viewMode}
        isLoading={isLoading}
        hasSearched={hasSearched}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
        source={source === 'bangumi' ? 'bgm' : 'al'}
      />
    </div>
  )
}
