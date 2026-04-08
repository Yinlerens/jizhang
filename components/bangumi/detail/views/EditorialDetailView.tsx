'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'
import type { AnimeDetail, CharacterInfo, StaffInfo, RelatedAnime } from '@/lib/types'
import { getDisplayTitles, getStatusBadge, getInitial } from '@/lib/bangumi/detail-view-model'
import SynopsisBlock from '../shared/SynopsisBlock'

export default function EditorialDetailView({ detail }: { detail: AnimeDetail }) {
  const { primary, secondary } = getDisplayTitles(detail)
  const year = detail.airDate ? new Date(detail.airDate).getFullYear() : null
  const { label: statusLabel } = getStatusBadge(detail.status)

  return (
    <div className="space-y-10">
      {/* ===== EDITORIAL HEADER ===== */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
        {/* Back link */}
        <div className="px-6 pt-6 pb-4">
          <Link
            href="/dashboard/bangumi"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 uppercase tracking-widest transition"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>

        {/* Asymmetrical split layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-0">
          {/* Left: poster panel */}
          <div className="relative bg-zinc-100 dark:bg-zinc-900 p-6 sm:p-8 flex items-center justify-center">
            <div className="w-44 sm:w-52 md:w-56">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl bg-zinc-800">
                {detail.coverImage ? (
                  <Image
                    src={detail.coverImage}
                    alt={primary}
                    width={224}
                    height={336}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500 text-2xl font-bold">
                    {getInitial(primary)}
                  </div>
                )}
              </div>
            </div>
            {/* Issue-style number */}
            <span className="absolute top-6 right-6 text-[80px] sm:text-[100px] font-black text-zinc-200/30 dark:text-zinc-700/30 leading-none select-none">
              {String(detail.id).slice(-2).padStart(2, '0')}
            </span>
          </div>

          {/* Right: info panel */}
          <div className="relative p-6 sm:p-8 flex flex-col justify-center space-y-5 bg-white dark:bg-zinc-950">
            {/* Thin top line accent */}
            <div className="absolute top-0 left-6 right-6 h-px bg-amber-500/60" />

            {/* Title block */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-semibold">
                {statusLabel} / {year || '—'}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 leading-[1.1] tracking-tight">
                {primary}
              </h1>
              {secondary && (
                <p className="text-sm text-zinc-400 italic mt-2">{secondary}</p>
              )}
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-3 gap-4 border-y border-zinc-200 dark:border-zinc-800 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">评分</p>
                {detail.ratingScore ? (
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {detail.ratingScore.toFixed(1)}
                  </p>
                ) : (
                  <p className="text-sm text-zinc-400">—</p>
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">集数</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {detail.episodeCount > 0 ? detail.episodeCount : '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">评价人数</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {detail.ratingCount > 0 ? detail.ratingCount.toLocaleString() : '—'}
                </p>
              </div>
            </div>

            {/* Tags */}
            {detail.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {detail.tags.slice(0, 10).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 px-2.5 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== SYNOPSIS PANEL ===== */}
      {detail.summary && (
        <section className="relative pl-6 border-l-2 border-amber-500/40">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-semibold mb-3">Synopsis</p>
          <SynopsisBlock text={detail.summary} />
        </section>
      )}

      {/* ===== CHARACTERS — Art card wall ===== */}
      {detail.characters.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-900 dark:text-zinc-50">Characters</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400">{detail.characters.length}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {detail.characters.map((c) => (
              <EditorialCharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      )}

      {/* ===== STAFF — Credits list ===== */}
      {detail.staff.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-900 dark:text-zinc-50">Staff</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400">{detail.staff.length}</span>
          </div>
          <div className="space-y-0 divide-y divide-zinc-200 dark:divide-zinc-800">
            {detail.staff.map((s) => (
              <EditorialStaffRow key={`${s.id}-${s.role}`} staff={s} />
            ))}
          </div>
        </section>
      )}

      {/* ===== RELATED ===== */}
      {detail.related.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-900 dark:text-zinc-50">Related</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {detail.related.map((r) => (
              <EditorialRelatedCard key={`${r.id}-${r.relation}`} related={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function EditorialCharacterCard({ character }: { character: CharacterInfo }) {
  return (
    <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 group">
      {character.image ? (
        <img
          src={character.image}
          alt={character.nameCn || character.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-2xl font-bold">
          {getInitial(character.nameCn || character.name)}
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.85) 100%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-xs font-semibold text-white line-clamp-1">
          {character.nameCn || character.name}
        </p>
        {character.voiceActor && (
          <p className="text-[9px] text-white/50 mt-0.5 line-clamp-1">
            {character.voiceActor.name}
          </p>
        )}
        <p className="text-[8px] uppercase tracking-wider text-amber-400/80 mt-1">
          {character.role}
        </p>
      </div>
    </div>
  )
}

function EditorialStaffRow({ staff }: { staff: StaffInfo }) {
  return (
    <div className="flex items-center justify-between py-3 px-1">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
          {staff.image ? (
            <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-[10px] font-bold">
              {getInitial(staff.name)}
            </div>
          )}
        </div>
        <span className="text-sm text-zinc-900 dark:text-zinc-50 font-medium">{staff.name}</span>
      </div>
      <span className="text-xs text-zinc-400 uppercase tracking-wider">{staff.role}</span>
    </div>
  )
}

function EditorialRelatedCard({ related }: { related: RelatedAnime }) {
  return (
    <Link
      href={`/dashboard/bangumi/${related.source}/${related.id}`}
      className="group space-y-2"
    >
      <div className="aspect-[2/3] rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {related.coverImage ? (
          <img
            src={related.coverImage}
            alt={related.nameCn || related.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm font-bold">
            {getInitial(related.nameCn || related.name)}
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">
          {related.nameCn || related.name}
        </p>
        <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{related.relation}</p>
      </div>
    </Link>
  )
}
