'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { AnimeItem } from '@/lib/types'

interface AnimeCardProps {
  anime: AnimeItem
  viewMode: 'grid' | 'list'
  source: 'bgm' | 'al'
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
          <div className="flex items-center gap-1.5">
            {anime.episodeCount > 0 && (
              <span className="text-[10px] text-zinc-400">{anime.episodeCount}集</span>
            )}
            <StatusBadge status={anime.status} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ListCard({ anime }: { anime: AnimeItem }) {
  return (
    <div className="flex gap-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
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

export default function AnimeCard({ anime, viewMode, source }: AnimeCardProps) {
  return (
    <Link href={`/dashboard/bangumi/${source}/${anime.id}`}>
      {viewMode === 'grid' ? <GridCard anime={anime} /> : <ListCard anime={anime} />}
    </Link>
  )
}
