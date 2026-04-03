# 番剧搜索与展示 - 设计文档

## 概述

为记账应用新增番剧聚合管理模块的第一版：搜索番剧并以卡片形式展示结果。这是后续收藏管理、追番日历等功能的基础。

## 范围

**第一版包含:**
- 番剧关键词搜索
- 搜索结果卡片展示（网格/列表视图可切换）
- Bangumi API 主数据源 + AniList API 补充数据
- 导航栏新增"番剧"菜单组

**第一版不包含:**
- 收藏/追番状态管理
- 追番日历
- Supabase 数据表（后续迭代时添加）
- 漫画/小说搜索

## 架构

### 数据流

```
用户输入关键词
  → debounce 300ms
  → 调用 Server Action: searchBangumi(keyword)
    → Bangumi API: POST /v0/search/subjects (filter type: [2] anime)
    → AniList API: POST https://graphql.anilist.co (search by keyword, type: ANIME)
    → 合并结果：Bangumi 为主，AniList 补充英文标题和评分
  → 返回统一格式数据
  → 客户端渲染卡片列表
```

### API 代理层

使用 Next.js Server Actions 作为代理层，不使用 API Route。原因：
- 与项目现有模式一致（`lib/actions/transactions.ts` 已使用 server actions）
- 无需额外路由配置
- 类型安全

### 文件结构

```
lib/
  actions/
    bangumi.ts              # Server Actions: searchBangumi()
  types.ts                  # 新增 BangumiItem 等类型 (追加到现有文件)

app/
  dashboard/
    (padded)/
      bangumi/
        page.tsx            # 番剧搜索主页面 (client component)

components/
  bangumi/
    SearchBar.tsx           # 搜索输入框 + debounce
    AnimeCard.tsx           # 单个番剧卡片（支持网格和列表两种渲染模式）
    AnimeGrid.tsx           # 搜索结果容器（管理视图切换 + 渲染卡片列表）
    ViewToggle.tsx          # 网格/列表视图切换按钮
```

## 数据类型

```typescript
// 统一的番剧数据格式
interface AnimeItem {
  id: number                    // Bangumi subject ID
  name: string                  // 日文原名
  nameCn: string                // 中文名
  nameEn: string | null         // 英文名 (来自 AniList)
  summary: string               // 简介
  airDate: string               // 放送日期
  episodeCount: number          // 总集数
  coverImage: string            // 封面图 URL
  ratingBangumi: number | null  // Bangumi 评分
  ratingAniList: number | null  // AniList 评分 (百分制转十分制)
  type: number                  // Bangumi subject type (2=anime)
  tags: string[]                // 标签
  status: 'airing' | 'finished' | 'upcoming' // 放送状态
}

// 搜索结果
interface AnimeSearchResult {
  items: AnimeItem[]
  total: number
  hasMore: boolean
}
```

## API 对接

### Bangumi API

- **端点:** `https://api.bgm.tv/v0/search/subjects`
- **方法:** POST
- **请求体:**
  ```json
  {
    "keyword": "搜索词",
    "sort": "match",
    "filter": { "type": [2] }
  }
  ```
- **查询参数:** `limit=24&offset=0`
- **响应字段:** id, name, name_cn, summary, air_date, images.large, rating, rank, eps_count
- **无需认证:** 公开 API，无需 API Key

### AniList API

- **端点:** `https://graphql.anilist.co`
- **方法:** POST
- **GraphQL 查询:**
  ```graphql
  query ($search: String!, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(search: $search, type: ANIME) {
        id
        title { romaji english native }
        coverImage { large }
        averageScore
        episodes
        status
        genres
      }
    }
  }
  ```
- **无需认证:** 公开 API，有速率限制（90 req/min）

### 数据合并策略

1. 以 Bangumi 搜索结果为主列表
2. 用相同关键词查询 AniList，获取英文标题和 AniList 评分
3. 通过日文名（name）模糊匹配关联两个数据源
4. AniList 评分为百分制，转换为十分制后展示（除以 10）
5. 若 AniList 无匹配，对应字段留 null

## UI 设计

### 导航

- Sidebar 新增"番剧"菜单组，图标使用 `Tv2`（Lucide）
- 菜单项：`搜索` → `/dashboard/bangumi`
- MobileNav 新增"番剧"tab

### 搜索页面布局

```
┌──────────────────────────────────────┐
│  🔍 搜索番剧...          [☷] [☰]   │  ← 搜索栏 + 视图切换
├──────────────────────────────────────┤
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐  │  ← 网格视图
│  │ 封面 │ │ 封面 │ │ 封面 │ │封面│  │
│  │      │ │      │ │      │ │    │  │
│  │──────│ │──────│ │──────│ │────│  │
│  │ 标题 │ │ 标题 │ │ 标题 │ │标题│  │
│  │ ⭐   │ │ ⭐   │ │ ⭐   │ │ ⭐ │  │
│  └──────┘ └──────┘ └──────┘ └────┘  │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐  │
│  │ ...  │ │ ...  │ │ ...  │ │ .. │  │
│  └──────┘ └──────┘ └──────┘ └────┘  │
│                                      │
│          [ 加载更多 ]                │
└──────────────────────────────────────┘
```

### 卡片设计

**网格模式:**
- 响应式网格：mobile 2列, sm 3列, md 4列, lg 5列
- 封面图 aspect-ratio 2:3（标准海报比例）
- 卡片信息：中文名、日文名（小字）、Bangumi评分、集数
- hover 效果：轻微上浮 + 阴影

**列表模式:**
- 左侧封面缩略图（60x80px）+ 右侧详细信息
- 信息包含：中文名、日文名、简介（截断）、评分、集数、状态、标签

### 交互

- 搜索输入 debounce 300ms
- 搜索中显示 skeleton loading
- 空状态：提示"输入关键词搜索番剧"
- 无结果：提示"未找到相关番剧"
- 错误状态：toast 提示错误信息
- "加载更多"按钮实现分页（每页 24 条）
- 视图切换状态保存在组件 state 中

## 状态管理

使用 React useState 管理组件本地状态，不引入 Zustand store（搜索页面状态无需跨页面共享）：

```typescript
// 页面组件状态
const [keyword, setKeyword] = useState('')
const [results, setResults] = useState<AnimeItem[]>([])
const [isLoading, setIsLoading] = useState(false)
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
const [offset, setOffset] = useState(0)
const [total, setTotal] = useState(0)
```

## 错误处理

- API 调用失败：toast 提示"搜索失败，请稍后重试"
- AniList 补充数据失败：静默处理，仅展示 Bangumi 数据
- 网络超时：Server Action 设 10s 超时
- 空关键词：前端拦截，不发请求

## 测试策略

- 手动测试 API 对接和搜索功能
- 验证两个 API 数据合并正确性
- 测试网格/列表视图切换
- 测试分页加载更多
- 测试错误状态展示
