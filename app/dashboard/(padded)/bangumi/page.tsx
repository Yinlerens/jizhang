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
