import { notFound } from 'next/navigation'
import { getBangumiDetail, getAniListDetail } from '@/lib/actions/bangumi'
import DetailHero from '@/components/bangumi/DetailHero'
import CharacterList from '@/components/bangumi/CharacterList'
import StaffList from '@/components/bangumi/StaffList'
import RelatedList from '@/components/bangumi/RelatedList'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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
    <div className="space-y-8 pb-8">
      <Link
        href="/dashboard/bangumi"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition"
      >
        <ArrowLeft size={16} />
        返回搜索
      </Link>

      <DetailHero detail={detail} />
      <CharacterList characters={detail.characters} />
      <StaffList staff={detail.staff} />
      <RelatedList related={detail.related} />
    </div>
  )
}
