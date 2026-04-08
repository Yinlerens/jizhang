# Bangumi Detail Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the bangumi detail page into one page with a top switcher that renders three clearly different, fully working variants: CINEMA, EDITORIAL, and STREAM.

**Architecture:** Keep data fetching in the existing server route, then hand the single `AnimeDetail` payload into a new client-side variant shell that manages the selected style. Implement small shared helpers/atoms once, but keep each variant’s hero/layout/section composition in separate view components so the three designs stay meaningfully different.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Vitest, Lucide React, `next/image`.

**Spec:** `docs/superpowers/specs/2026-04-08-bangumi-detail-variants-design.md`

---

## File Structure

| Action | Path | Responsibility |
|--------|------|---------------|
| Modify | `next.config.ts` | Allow remote image hosts for Bangumi/AniList so new detail views can use `next/image` |
| Create | `lib/bangumi/detail-view-model.ts` | Shared formatting helpers for titles, badges, fallback text, and section-safe derived values |
| Create | `lib/bangumi/detail-view-model.test.ts` | Vitest coverage for shared detail formatting helpers |
| Create | `components/bangumi/detail/VariantSwitcher.tsx` | Client segmented control for CINEMA / EDITORIAL / STREAM |
| Create | `components/bangumi/detail/BangumiDetailVariants.tsx` | Client state container and variant renderer |
| Create | `components/bangumi/detail/shared/DetailAtoms.tsx` | Shared micro components: back link, badges, tag pills, section heading |
| Create | `components/bangumi/detail/shared/PosterImage.tsx` | Shared poster/banner image wrapper with `next/image` + fallback |
| Create | `components/bangumi/detail/shared/SynopsisBlock.tsx` | Expand/collapse synopsis block reused where appropriate |
| Create | `components/bangumi/detail/views/CinemaDetailView.tsx` | CINEMA layout |
| Create | `components/bangumi/detail/views/EditorialDetailView.tsx` | EDITORIAL layout |
| Create | `components/bangumi/detail/views/StreamDetailView.tsx` | STREAM layout |
| Modify | `app/dashboard/(padded)/bangumi/[source]/[id]/page.tsx` | Replace current composition with new page shell + variant renderer |
| Optional cleanup | `components/bangumi/DetailHero.tsx` | Remove or leave unused after migration |
| Optional cleanup | `components/bangumi/CharacterList.tsx` | Remove or leave unused after migration |
| Optional cleanup | `components/bangumi/StaffList.tsx` | Remove or leave unused after migration |
| Optional cleanup | `components/bangumi/RelatedList.tsx` | Keep as-is or absorb later if variant-specific related section becomes necessary |

---

### Task 1: Add shared detail view model helpers

**Files:**
- Create: `lib/bangumi/detail-view-model.ts`
- Test: `lib/bangumi/detail-view-model.test.ts`

- [ ] **Step 1: Write the failing helper tests**

Create `lib/bangumi/detail-view-model.test.ts` with focused tests for the formatting logic the UI will depend on:

```ts
import { describe, expect, it } from 'vitest'
import {
  getDisplayTitles,
  getMetaItems,
  getStatusBadge,
  getInitial,
} from './detail-view-model'
import type { AnimeDetail } from '@/lib/types'

const detail: AnimeDetail = {
  id: 1,
  name: 'Bocchi the Rock!',
  nameCn: '孤独摇滚！',
  nameEn: 'Bocchi the Rock!',
  summary: 'summary',
  airDate: '2022-10-09',
  episodeCount: 12,
  coverImage: 'https://lain.bgm.tv/pic/cover/l/test.jpg',
  bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/test.jpg',
  ratingScore: 8.7,
  ratingCount: 12345,
  tags: ['校园', '乐队'],
  status: 'finished',
  source: 'al',
  characters: [],
  staff: [],
  related: [],
}

describe('detail view model helpers', () => {
  it('prefers Chinese title while preserving subtitle lines', () => {
    expect(getDisplayTitles(detail)).toEqual({
      primary: '孤独摇滚！',
      secondary: 'Bocchi the Rock!',
      tertiary: 'Bocchi the Rock!',
    })
  })

  it('builds concise meta rows', () => {
    expect(getMetaItems(detail)).toEqual(['8.7', '12345人评分', '2022', '12集'])
  })

  it('maps status to Chinese copy and style token', () => {
    expect(getStatusBadge('finished')).toEqual({
      label: '已完结',
      tone: 'neutral',
    })
  })

  it('returns a safe initial fallback', () => {
    expect(getInitial('后藤一里')).toBe('后')
    expect(getInitial('')).toBe('?')
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test lib/bangumi/detail-view-model.test.ts`

Expected: FAIL because `detail-view-model.ts` does not exist yet.

- [ ] **Step 3: Write the minimal helper implementation**

Create `lib/bangumi/detail-view-model.ts`:

```ts
import type { AnimeDetail } from '@/lib/types'

export function getDisplayTitles(detail: AnimeDetail) {
  const primary = detail.nameCn || detail.name
  const secondary =
    detail.nameCn && detail.name !== detail.nameCn ? detail.name : detail.nameEn || ''
  const tertiary =
    detail.nameEn && detail.nameEn !== secondary ? detail.nameEn : ''

  return { primary, secondary, tertiary }
}

export function getMetaItems(detail: AnimeDetail) {
  const items: string[] = []

  if (detail.ratingScore) items.push(detail.ratingScore.toFixed(1))
  if (detail.ratingCount > 0) items.push(`${detail.ratingCount}人评分`)
  if (detail.airDate) items.push(String(new Date(detail.airDate).getFullYear()))
  if (detail.episodeCount > 0) items.push(`${detail.episodeCount}集`)

  return items
}

export function getStatusBadge(status: AnimeDetail['status']) {
  if (status === 'airing') return { label: '放送中', tone: 'success' as const }
  if (status === 'upcoming') return { label: '未放送', tone: 'info' as const }
  return { label: '已完结', tone: 'neutral' as const }
}

export function getInitial(value?: string | null) {
  return value?.trim()?.charAt(0) || '?'
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test lib/bangumi/detail-view-model.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/bangumi/detail-view-model.ts lib/bangumi/detail-view-model.test.ts
git commit -m "feat(bangumi): add detail view model helpers"
```

---

### Task 2: Enable remote image hosts for `next/image`

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add image remote patterns**

Extend `next.config.ts` so the new detail views can safely use `next/image` with Bangumi and AniList assets:

```ts
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lain.bgm.tv',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
      },
    ],
  },
  async rewrites() {
    // existing rewrites...
  },
  skipTrailingSlashRedirect: true,
}
```

- [ ] **Step 2: Run config verification**

Run: `pnpm lint next.config.ts`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat(bangumi): allow remote detail images in next config"
```

---

### Task 3: Build the client-side variant switch shell

**Files:**
- Create: `components/bangumi/detail/VariantSwitcher.tsx`
- Create: `components/bangumi/detail/BangumiDetailVariants.tsx`
- Create: `components/bangumi/detail/shared/DetailAtoms.tsx`
- Create: `components/bangumi/detail/shared/PosterImage.tsx`
- Create: `components/bangumi/detail/shared/SynopsisBlock.tsx`

- [ ] **Step 1: Create `VariantSwitcher.tsx`**

Implement a client segmented control:

```tsx
'use client'

const options = [
  { value: 'cinema', label: 'CINEMA' },
  { value: 'editorial', label: 'EDITORIAL' },
  { value: 'stream', label: 'STREAM' },
] as const

export type DetailVariant = (typeof options)[number]['value']

export default function VariantSwitcher({
  value,
  onChange,
}: {
  value: DetailVariant
  onChange: (value: DetailVariant) => void
}) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={active
              ? 'rounded-full bg-white px-4 py-2 text-xs font-semibold text-black'
              : 'rounded-full px-4 py-2 text-xs font-semibold text-white/65 hover:text-white'}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Create shared atoms**

Implement:

- `DetailAtoms.tsx`
  - `DetailBackLink`
  - `StatusBadge`
  - `ScoreBadge`
  - `TagPill`
  - `SectionHeading`
- `PosterImage.tsx`
  - shared wrapper around `Image`
  - graceful empty-state fallback
- `SynopsisBlock.tsx`
  - client expand/collapse block with `line-clamp-4`

- [ ] **Step 3: Create `BangumiDetailVariants.tsx`**

Implement client state and conditional rendering only:

```tsx
'use client'

import { useState } from 'react'
import type { AnimeDetail } from '@/lib/types'
import VariantSwitcher, { type DetailVariant } from './VariantSwitcher'
import CinemaDetailView from './views/CinemaDetailView'
import EditorialDetailView from './views/EditorialDetailView'
import StreamDetailView from './views/StreamDetailView'

export default function BangumiDetailVariants({ detail }: { detail: AnimeDetail }) {
  const [variant, setVariant] = useState<DetailVariant>('cinema')

  return (
    <div className="space-y-6">
      <div className="sticky top-4 z-30 flex justify-center">
        <VariantSwitcher value={variant} onChange={setVariant} />
      </div>

      {variant === 'cinema' && <CinemaDetailView detail={detail} />}
      {variant === 'editorial' && <EditorialDetailView detail={detail} />}
      {variant === 'stream' && <StreamDetailView detail={detail} />}
    </div>
  )
}
```

- [ ] **Step 4: Run lint on the new shell**

Run:

```bash
pnpm lint components/bangumi/detail/VariantSwitcher.tsx
pnpm lint components/bangumi/detail/BangumiDetailVariants.tsx
pnpm lint components/bangumi/detail/shared/DetailAtoms.tsx
pnpm lint components/bangumi/detail/shared/PosterImage.tsx
pnpm lint components/bangumi/detail/shared/SynopsisBlock.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/bangumi/detail
git commit -m "feat(bangumi): add detail variant switch shell"
```

---

### Task 4: Implement the CINEMA variant

**Files:**
- Create: `components/bangumi/detail/views/CinemaDetailView.tsx`

- [ ] **Step 1: Implement the CINEMA hero-first layout**

Build a large-banner view with:

- immersive top section
- back link inside hero
- poster overlapping hero/body boundary
- left-heavy title cluster
- concise synopsis block directly after hero
- character / staff / related rendered as bold horizontal content bands

Use the shared helpers:

```tsx
import { getDisplayTitles } from '@/lib/bangumi/detail-view-model'
import { DetailBackLink, ScoreBadge, SectionHeading, StatusBadge, TagPill } from '../shared/DetailAtoms'
import PosterImage from '../shared/PosterImage'
import SynopsisBlock from '../shared/SynopsisBlock'
```

- [ ] **Step 2: Keep section-specific rendering inside this file**

Do not extract large CINEMA-only sections yet. Keep them local so the variant can stay visually opinionated without fake abstraction.

- [ ] **Step 3: Run lint**

Run: `pnpm lint components/bangumi/detail/views/CinemaDetailView.tsx`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/bangumi/detail/views/CinemaDetailView.tsx
git commit -m "feat(bangumi): add cinema detail variant"
```

---

### Task 5: Implement the EDITORIAL variant

**Files:**
- Create: `components/bangumi/detail/views/EditorialDetailView.tsx`

- [ ] **Step 1: Implement the asymmetrical editorial layout**

Build a composition that clearly differs from CINEMA:

- non-standard split or asymmetrical top layout
- stronger typography hierarchy
- meta info in framed / columnar blocks
- synopsis as an editorial text panel
- characters as art-card wall or staggered strip
- staff as list/editorial credits rather than generic pills

The important constraint: do not reuse the CINEMA block structure with minor styling changes.

- [ ] **Step 2: Run lint**

Run: `pnpm lint components/bangumi/detail/views/EditorialDetailView.tsx`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/bangumi/detail/views/EditorialDetailView.tsx
git commit -m "feat(bangumi): add editorial detail variant"
```

---

### Task 6: Implement the STREAM variant

**Files:**
- Create: `components/bangumi/detail/views/StreamDetailView.tsx`

- [ ] **Step 1: Implement the platform-style layout**

Build the most production-like variant:

- strong but more restrained hero
- stable modular layout
- clean content rails for characters / staff / related
- easiest scan path of the three variants

The output should feel clearly different from both CINEMA and EDITORIAL, even if this is the most conservative one.

- [ ] **Step 2: Run lint**

Run: `pnpm lint components/bangumi/detail/views/StreamDetailView.tsx`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/bangumi/detail/views/StreamDetailView.tsx
git commit -m "feat(bangumi): add stream detail variant"
```

---

### Task 7: Integrate the new shell into the route

**Files:**
- Modify: `app/dashboard/(padded)/bangumi/[source]/[id]/page.tsx`

- [ ] **Step 1: Replace old detail composition**

Update the route to:

- keep the existing `getBangumiDetail` / `getAniListDetail` server fetching flow
- remove direct usage of `DetailHero`, `CharacterList`, `StaffList`
- render `BangumiDetailVariants detail={detail}`
- simplify route-level background logic so each variant owns its look

Target structure:

```tsx
import { notFound } from 'next/navigation'
import { getBangumiDetail, getAniListDetail } from '@/lib/actions/bangumi'
import BangumiDetailVariants from '@/components/bangumi/detail/BangumiDetailVariants'

export default async function AnimeDetailPage({ params }: { params: Promise<{ source: string; id: string }> }) {
  // existing validation + fetch logic...

  return (
    <div className="relative z-10 pb-12">
      <BangumiDetailVariants detail={detail} />
    </div>
  )
}
```

- [ ] **Step 2: Run route-level lint**

Run: `pnpm lint "app/dashboard/(padded)/bangumi/[source]/[id]/page.tsx"`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add "app/dashboard/(padded)/bangumi/[source]/[id]/page.tsx"
git commit -m "feat(bangumi): integrate switchable detail variants"
```

---

### Task 8: Decide how to handle legacy detail components

**Files:**
- Modify or delete: `components/bangumi/DetailHero.tsx`
- Modify or delete: `components/bangumi/CharacterList.tsx`
- Modify or delete: `components/bangumi/StaffList.tsx`
- Optional modify: `components/bangumi/RelatedList.tsx`

- [ ] **Step 1: Check whether old components still have callers**

Run:

```bash
Get-ChildItem app,components -Recurse -Include *.ts,*.tsx | Select-String -Pattern 'DetailHero|CharacterList|StaffList|RelatedList'
```

Expected: only the new intended call sites remain.

- [ ] **Step 2: Remove dead code or leave explicit compatibility note**

If `DetailHero`, `CharacterList`, and `StaffList` are no longer referenced, either:

- delete them, or
- replace file contents with a short compatibility note and re-export if needed

Prefer deletion if there are no callers.

- [ ] **Step 3: Run lint after cleanup**

Run: `pnpm lint components/bangumi`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/bangumi
git commit -m "refactor(bangumi): remove legacy detail presentation components"
```

---

### Task 9: Full verification

**Files:**
- Test: `lib/bangumi/detail-view-model.test.ts`

- [ ] **Step 1: Run unit tests**

Run: `pnpm test lib/bangumi/detail-view-model.test.ts`

Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 3: Start the dev server**

Run: `pnpm dev`

- [ ] **Step 4: Manually verify the three variants**

Open a real detail page such as:

- `/dashboard/bangumi/al/<id>`
- `/dashboard/bangumi/bgm/<id>`

Verify:

- switcher is visible and usable
- default variant is CINEMA
- each variant is obviously different in layout, not just color
- switching variants does not trigger a reload
- titles, scores, tags, synopsis, characters, staff, and related sections render from the same data

- [ ] **Step 5: Verify empty-state fallbacks**

Check at least one entry lacking some assets or temporarily simulate missing data to confirm:

- no banner image fallback
- no cover image fallback
- no character image fallback
- no staff image fallback

- [ ] **Step 6: Verify responsive layout**

Check:

- mobile width (~390px)
- tablet width
- desktop width

Expected:

- switcher remains usable
- hero text does not collide with poster
- horizontal rails remain scrollable
- editorial layout does not collapse awkwardly

- [ ] **Step 7: Final commit for verification fixes**

If any fixes were needed:

```bash
git add -A
git commit -m "fix(bangumi): polish detail variants after verification"
```

