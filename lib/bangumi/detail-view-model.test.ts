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
      tertiary: '',
    })
  })

  it('shows nameEn as tertiary when it differs from secondary', () => {
    expect(getDisplayTitles({ ...detail, name: 'ぼっち・ざ・ろっく！', nameEn: 'Bocchi the Rock!' })).toEqual({
      primary: '孤独摇滚！',
      secondary: 'ぼっち・ざ・ろっく！',
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
