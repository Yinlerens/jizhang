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
