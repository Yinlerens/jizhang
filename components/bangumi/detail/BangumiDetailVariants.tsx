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
    <div>
      <div className="sticky top-4 z-30 flex justify-center py-2">
        <VariantSwitcher value={variant} onChange={setVariant} />
      </div>

      {variant === 'cinema' && <CinemaDetailView detail={detail} />}
      {variant === 'editorial' && <EditorialDetailView detail={detail} />}
      {variant === 'stream' && <StreamDetailView detail={detail} />}
    </div>
  )
}
