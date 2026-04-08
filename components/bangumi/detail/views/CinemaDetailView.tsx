'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'
import type { AnimeDetail, CharacterInfo, StaffInfo, RelatedAnime } from '@/lib/types'
import { getDisplayTitles, getInitial } from '@/lib/bangumi/detail-view-model'
import { StatusBadge, TagPill } from '../shared/DetailAtoms'
import SynopsisBlock from '../shared/SynopsisBlock'

export default function CinemaDetailView({ detail }: { detail: AnimeDetail }) {
  const { primary, secondary } = getDisplayTitles(detail)
  const year = detail.airDate ? new Date(detail.airDate).getFullYear() : null
  const bannerSrc = detail.bannerImage || detail.coverImage

  return (
    <div className="space-y-8">
      {/* ===== HERO ===== */}
      <div className="relative min-h-[360px] h-[55vh] overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
        {/* Banner background */}
        {bannerSrc && (
          <img
            src={bannerSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradient overlay - left-heavy for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.2) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Back button */}
        <Link
          href="/dashboard/bangumi"
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          返回
        </Link>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
          <div className="flex items-end gap-5 sm:gap-7 max-w-7xl">
            {/* Poster */}
            <div className="w-28 sm:w-32 md:w-36 flex-shrink-0">
              <div className="aspect-[2/3] rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl bg-zinc-800">
                {detail.coverImage ? (
                  <Image
                    src={detail.coverImage}
                    alt={primary}
                    width={144}
                    height={216}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500 text-lg font-bold">
                    {getInitial(primary)}
                  </div>
                )}
              </div>
            </div>

            {/* Info cluster */}
            <div className="flex-1 min-w-0 space-y-3 pb-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight line-clamp-2">
                {primary}
              </h1>

              {secondary && (
                <p className="text-sm text-white/40 line-clamp-1">{secondary}</p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3">
                {detail.ratingScore && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star size={14} className="fill-current" />
                    <span className="font-bold text-sm">{detail.ratingScore.toFixed(1)}</span>
                    {detail.ratingCount > 0 && (
                      <span className="text-white/35 text-xs">{detail.ratingCount}人</span>
                    )}
                  </span>
                )}
                {year && <span className="text-sm text-white/50">{year}</span>}
                {detail.episodeCount > 0 && (
                  <span className="text-sm text-white/50">{detail.episodeCount}集</span>
                )}
                <StatusBadge status={detail.status} />
              </div>

              {/* Tags */}
              {detail.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {detail.tags.slice(0, 8).map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== SYNOPSIS ===== */}
      {detail.summary && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">简介</h2>
          <SynopsisBlock text={detail.summary} />
        </section>
      )}

      {/* ===== CHARACTERS ===== */}
      {detail.characters.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">角色</h2>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {detail.characters.map((c) => (
              <CinemaCharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      )}

      {/* ===== STAFF ===== */}
      {detail.staff.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">制作人员</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {detail.staff.map((s) => (
              <CinemaStaffCard key={`${s.id}-${s.role}`} staff={s} />
            ))}
          </div>
        </section>
      )}

      {/* ===== RELATED ===== */}
      {detail.related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">关联作品</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {detail.related.map((r) => (
              <CinemaRelatedCard key={`${r.id}-${r.relation}`} related={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function CinemaCharacterCard({ character }: { character: CharacterInfo }) {
  return (
    <div className="relative flex-shrink-0 w-[110px] h-[150px] rounded-lg overflow-hidden bg-zinc-800 group">
      {character.image ? (
        <img
          src={character.image}
          alt={character.nameCn || character.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-xl font-bold">
          {getInitial(character.nameCn || character.name)}
        </div>
      )}

      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-[11px] font-semibold text-white line-clamp-1">
          {character.nameCn || character.name}
        </p>
        {character.voiceActor && (
          <p className="text-[9px] text-white/50 line-clamp-1 mt-0.5">
            CV: {character.voiceActor.name}
          </p>
        )}
      </div>
    </div>
  )
}

function CinemaStaffCard({ staff }: { staff: StaffInfo }) {
  return (
    <div className="flex items-center gap-2.5 bg-white/[0.04] rounded-xl p-2.5">
      <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-zinc-800">
        {staff.image ? (
          <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-bold">
            {getInitial(staff.name)}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">{staff.name}</p>
        <p className="text-[9px] text-amber-500 line-clamp-1">{staff.role}</p>
      </div>
    </div>
  )
}

function CinemaRelatedCard({ related }: { related: RelatedAnime }) {
  return (
    <Link
      href={`/dashboard/bangumi/${related.source}/${related.id}`}
      className="flex-shrink-0 w-28 group"
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 shadow-md">
        {related.coverImage ? (
          <img
            src={related.coverImage}
            alt={related.nameCn || related.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
            {getInitial(related.nameCn || related.name)}
          </div>
        )}
      </div>
      <div className="mt-2 space-y-0.5">
        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">
          {related.nameCn || related.name}
        </p>
        <p className="text-[10px] text-zinc-400">{related.relation}</p>
      </div>
    </Link>
  )
}
