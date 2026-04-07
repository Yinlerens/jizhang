'use client'

import { Star } from 'lucide-react'
import { AnimeDetail } from '@/lib/types'

export default function DetailHero({ detail }: { detail: AnimeDetail }) {
  const year = detail.airDate ? new Date(detail.airDate).getFullYear() : null

  const statusLabel = {
    airing: '放送中',
    finished: '已完结',
    upcoming: '未放送',
  }[detail.status]

  const statusClass = {
    airing: 'bg-green-500/20 text-green-400',
    finished: 'bg-zinc-500/20 text-zinc-300',
    upcoming: 'bg-blue-500/20 text-blue-400',
  }[detail.status]

  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${detail.bannerImage || detail.coverImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30" />
      </div>

      {/* Poster + Info overlay */}
      <div className="relative -mt-24 sm:-mt-32 px-4 sm:px-6 flex gap-5 sm:gap-6">
        {/* Poster */}
        <div className="w-28 sm:w-36 md:w-40 flex-shrink-0">
          <div className="aspect-[2/3] rounded-xl overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl bg-zinc-800">
            {detail.coverImage ? (
              <img
                src={detail.coverImage}
                alt={detail.nameCn || detail.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm">
                暂无封面
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pt-8 sm:pt-16 space-y-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 line-clamp-2">
            {detail.nameCn || detail.name}
          </h1>

          {detail.nameCn && detail.name !== detail.nameCn && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
              {detail.name}
              {detail.nameEn && detail.nameEn !== detail.name && ` / ${detail.nameEn}`}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {detail.ratingScore && (
              <span className="flex items-center gap-1 text-amber-500">
                <Star size={14} className="fill-current" />
                <span className="font-semibold">{detail.ratingScore.toFixed(1)}</span>
                {detail.ratingCount > 0 && (
                  <span className="text-zinc-400 text-xs">({detail.ratingCount}人)</span>
                )}
              </span>
            )}
            {detail.episodeCount > 0 && (
              <span className="text-zinc-500 dark:text-zinc-400">{detail.episodeCount}集</span>
            )}
            {year && (
              <span className="text-zinc-500 dark:text-zinc-400">{year}</span>
            )}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusClass}`}>
              {statusLabel}
            </span>
          </div>

          {/* Tags */}
          {detail.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {detail.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Synopsis */}
      {detail.summary && (
        <div className="mt-6 px-4 sm:px-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">简介</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line line-clamp-6">
            {detail.summary}
          </p>
        </div>
      )}
    </div>
  )
}
