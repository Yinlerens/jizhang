import { notFound } from 'next/navigation'
import { getBangumiDetail, getAniListDetail } from '@/lib/actions/bangumi'
import BangumiDetailVariants from '@/components/bangumi/detail/BangumiDetailVariants'

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ source: string; id: string }>
}) {
  const { source, id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId) || (source !== 'bgm' && source !== 'al')) {
    notFound()
  }

  let detail
  try {
    detail = source === 'bgm'
      ? await getBangumiDetail(numId)
      : await getAniListDetail(numId)
  } catch {
    notFound()
  }

  return (
    <div className="relative z-10 pb-12">
      <BangumiDetailVariants detail={detail} />
    </div>
  )
}
