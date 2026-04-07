'use client'

import Link from 'next/link'
import { RelatedAnime } from '@/lib/types'

export default function RelatedList({ related }: { related: RelatedAnime[] }) {
  if (related.length === 0) return null

  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">关联作品</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {related.map((r) => (
          <Link
            key={`${r.id}-${r.relation}`}
            href={`/dashboard/bangumi/${r.source}/${r.id}`}
            className="flex-shrink-0 w-28 group"
          >
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm">
              {r.coverImage ? (
                <img
                  src={r.coverImage}
                  alt={r.nameCn || r.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                  暂无
                </div>
              )}
            </div>
            <div className="mt-2 space-y-0.5">
              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">
                {r.nameCn || r.name}
              </p>
              <p className="text-[10px] text-zinc-400">{r.relation}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
