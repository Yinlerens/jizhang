'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'
import type { AnimeDetail, CharacterInfo, StaffInfo, RelatedAnime } from '@/lib/types'
import { getDisplayTitles, getStatusBadge, getInitial } from '@/lib/bangumi/detail-view-model'
import { StatusBadge } from '../shared/DetailAtoms'
import SynopsisBlock from '../shared/SynopsisBlock'

export default function StreamDetailView({ detail }: { detail: AnimeDetail }) {
  const { primary, secondary } = getDisplayTitles(detail)
  const year = detail.airDate ? new Date(detail.airDate).getFullYear() : null
  const bannerSrc = detail.bannerImage || detail.coverImage

  return (
    <div className="space-y-6">
      {/* ===== HERO ===== */}
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden rounded-2xl -mx-4 sm:-mx-6 lg:-mx-8">
        {bannerSrc && (
          <img
            src={bannerSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20" />

        {/* Back */}
        <Link
          href="/dashboard/bangumi"
          className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* ===== INFO CARD ===== */}
      <div className="flex gap-5 -mt-20 relative z-10 px-1">
        {/* Poster */}
        <div className="w-28 sm:w-32 flex-shrink-0">
          <div className="aspect-[2/3] rounded-xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-800">
            {detail.coverImage ? (
              <Image
                src={detail.coverImage}
                alt={primary}
                width={128}
                height={192}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-lg font-bold">
                {getInitial(primary)}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 pt-14 sm:pt-12 space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-2">
            {primary}
          </h1>
          {secondary && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">{secondary}</p>
          )}

          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            {detail.ratingScore && (
              <span className="flex items-center gap-1 text-amber-500">
                <Star size={13} className="fill-current" />
                <span className="font-semibold text-xs">{detail.ratingScore.toFixed(1)}</span>
                {detail.ratingCount > 0 && (
                  <span className="text-zinc-400 text-[10px]">({detail.ratingCount})</span>
                )}
              </span>
            )}
            {year && <span className="text-xs text-zinc-500 dark:text-zinc-400">{year}</span>}
            {detail.episodeCount > 0 && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{detail.episodeCount}集</span>
            )}
            <StatusBadge status={detail.status} />
          </div>
        </div>
      </div>

      {/* ===== TAGS ===== */}
      {detail.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {detail.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ===== SYNOPSIS ===== */}
      {detail.summary && (
        <section className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 sm:p-5 space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">简介</h2>
          <SynopsisBlock text={detail.summary} />
        </section>
      )}

      {/* ===== CHARACTERS ===== */}
      {detail.characters.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">角色</h2>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {detail.characters.map((c) => (
              <StreamCharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      )}

      {/* ===== STAFF ===== */}
      {detail.staff.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">制作人员</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {detail.staff.map((s) => (
              <StreamStaffCard key={`${s.id}-${s.role}`} staff={s} />
            ))}
          </div>
        </section>
      )}

      {/* ===== RELATED ===== */}
      {detail.related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">关联作品</h2>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {detail.related.map((r) => (
              <StreamRelatedCard key={`${r.id}-${r.relation}`} related={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function StreamCharacterCard({ character }: { character: CharacterInfo }) {
  return (
    <div className="flex-shrink-0 w-24 text-center space-y-2">
      <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {character.image ? (
          <img
            src={character.image}
            alt={character.nameCn || character.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm font-bold">
            {getInitial(character.nameCn || character.name)}
          </div>
        )}
      </div>
      <div>
        <p className="text-[11px] font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">
          {character.nameCn || character.name}
        </p>
        {character.voiceActor && (
          <p className="text-[9px] text-zinc-400 line-clamp-1 mt-0.5">
            CV: {character.voiceActor.name}
          </p>
        )}
      </div>
    </div>
  )
}

function StreamStaffCard({ staff }: { staff: StaffInfo }) {
  return (
    <div className="flex items-center gap-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-2.5">
      <div className="w-9 h-9 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        {staff.image ? (
          <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-[10px] font-bold">
            {getInitial(staff.name)}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">{staff.name}</p>
        <p className="text-[10px] text-zinc-400 line-clamp-1">{staff.role}</p>
      </div>
    </div>
  )
}

function StreamRelatedCard({ related }: { related: RelatedAnime }) {
  return (
    <Link
      href={`/dashboard/bangumi/${related.source}/${related.id}`}
      className="flex-shrink-0 w-28 group"
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm">
        {related.coverImage ? (
          <img
            src={related.coverImage}
            alt={related.nameCn || related.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
            {getInitial(related.nameCn || related.name)}
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">
          {related.nameCn || related.name}
        </p>
        <p className="text-[10px] text-zinc-400">{related.relation}</p>
      </div>
    </Link>
  )
}
