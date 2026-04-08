import Image from 'next/image'
import { getInitial } from '@/lib/bangumi/detail-view-model'

export default function PosterImage({
  src,
  alt,
  className = '',
  width = 160,
  height = 240,
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-800 text-zinc-500 text-lg font-bold ${className}`}
        style={{ width, height }}
      >
        {getInitial(alt)}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      loading="lazy"
    />
  )
}
