# 番剧详情页重新设计

## 概述

重新设计番剧详情页，从当前的简朴布局升级为 Emby 经典风格的沉浸式详情页。主要改造 4 个区域：Hero Banner、简介、角色卡片、制作人员。关联作品保持现有设计。

## 设计决策

| 区域 | 当前实现 | 新设计 |
|------|---------|--------|
| Hero Banner | 矮 Banner (最高320px) + 海报叠加 | 全宽高 Banner + 左到右渐变遮罩，信息左对齐 |
| 简介 | 独立区块，6 行 clamp，无展开交互 | 独立区块，4 行 clamp，展开/收起按钮 |
| 角色 | 圆形头像 80px，横向滚动 | 竖版人物卡 (110x150)，立绘 + 底部渐变文字 |
| Staff | 4 列网格，圆形小头像 40px | 2 列紧凑网格，圆形头像 + 名字/职位高亮 |
| 关联作品 | 竖版海报横向滚动 | 不变 |

## 详细规格

### 1. Hero Banner (DetailHero)

**布局**：
- Banner 高度：`h-[50vh]` (移动端 `h-72`)，至少 360px
- 背景图：`bannerImage` 优先，回退 `coverImage`，`bg-cover bg-center`
- 渐变遮罩：**从左到右**，`linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.15) 70%, transparent 100%)`，叠加底部渐变 `linear-gradient(transparent 60%, rgba(0,0,0,0.8) 100%)`
- 返回按钮：绝对定位在 Banner 左上角内部

**海报**：
- 尺寸：`w-32 sm:w-36 md:w-40`，`aspect-[2/3]`
- 样式：`rounded-xl`，`shadow-2xl`，细边框 `border-2 border-white/10`
- 定位：Banner 底部，与信息区左对齐

**信息区**（海报右侧）：
- 中文名：`text-2xl sm:text-3xl md:text-4xl font-extrabold text-white`
- 副标题（罗马音/英文）：`text-sm text-white/45`
- Meta 行：评分（金色星 + 分数 + 评价人数）、年份、集数、状态徽章
- 状态徽章颜色：放送中 green-400，已完结 zinc-300，未放送 blue-400，背景半透明
- Tags：圆角药丸，`bg-white/6 border border-white/8 text-white/55`

**深浅模式处理**：
- Hero 区域强制使用暗色方案（Banner 区域始终暗色渐变），不受全局主题切换影响
- 这样做是因为 Banner 图是彩色背景，浅色文字在渐变遮罩上可读性最好

### 2. 简介区块

- 独立于 Hero 的区块，标题 "简介"
- 文本：`text-sm leading-relaxed whitespace-pre-line`
- 默认 4 行 clamp (`line-clamp-4`)
- 点击 "展开全文 ▾" / "收起 ▴" 切换全文显示
- 需要 `'use client'` 处理 useState 展开状态

### 3. 角色卡片 (CharacterList)

**卡片规格**：
- 宽度：`w-[110px]`，高度：`h-[150px]`
- 圆角：`rounded-lg`
- 图片：`object-cover` 填满整个卡片
- 底部渐变叠加：`linear-gradient(transparent, rgba(0,0,0,0.9))`
- 角色名：`text-[11px] font-semibold text-white`
- CV 信息：`text-[9px] text-white/50`

**容器**：
- 横向滚动：`flex gap-3 overflow-x-auto pb-4`
- 标题：`text-base font-semibold` + "角色"

**无图片回退**：背景色 `bg-zinc-800`，居中显示角色名首字

### 4. 制作人员 (StaffList)

**布局**：
- 2 列网格：`grid grid-cols-2 gap-2`
- 响应式：`sm:grid-cols-2 md:grid-cols-3`

**卡片规格**：
- 背景：`bg-white/[0.04] dark:bg-white/[0.04]`（浅色模式下 `bg-zinc-100`）
- 圆角：`rounded-xl`
- 内边距：`p-2.5 sm:p-3`
- 头像：`w-10 h-10 rounded-full`
- 名字：`text-xs font-semibold`
- 职位：`text-[9px] text-amber-500`（金色高亮）

**无头像回退**：显示名字首字

### 5. 关联作品 (RelatedList)

保持现有实现不变。

## 涉及文件

| 文件 | 操作 |
|------|------|
| `components/bangumi/DetailHero.tsx` | 重写 |
| `components/bangumi/CharacterList.tsx` | 重写 |
| `components/bangumi/StaffList.tsx` | 重写 |
| `app/dashboard/(padded)/bangumi/[source]/[id]/page.tsx` | 小改（返回按钮移入 Hero） |

不涉及类型定义变更，不涉及 API 变更，不涉及 RelatedList 变更。

## 注意事项

- Hero 区域的返回按钮移入 Banner 内部（绝对定位左上角），从页面级移除
- 简介区块需要从服务端组件改为客户端组件（展开/收起交互需要 useState）或提取为独立的客户端子组件
- 保持 dark mode 兼容性：Hero 区域强制暗色，其余区域跟随系统主题
- 所有图片保持 `loading="lazy"`
