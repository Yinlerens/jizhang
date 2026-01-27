# Jizhang (记账应用) 项目开发文档

## 1. 项目简介

本项目是一个基于 Next.js 16 构建的个人记账（Bookkeeping）应用程序。旨在提供简洁、高效的个人财务管理功能。项目集成了 Supabase 作为后端服务（数据库与认证），并使用了现代化的前端技术栈进行开发。

## 2. 技术栈

### 核心框架
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Icons**: [Lucide React](https://lucide.dev/)

### 后端与数据
- **BaaS (Backend as a Service)**: [Supabase](https://supabase.com/) (PostgreSQL Database, Auth, Realtime)
- **Supabase Client**: `@supabase/ssr`, `@supabase/supabase-js`

### 数据可视化与工具
- **Charts**: [Recharts](https://recharts.org/) (用于报表分析)
- **Date Util**: `date-fns` (日期处理)
- **Excel Export**: `xlsx` (数据导出)

### 监控与分析
- **Error Tracking**: [Sentry](https://sentry.io/)
- **Analytics**: [PostHog](https://posthog.com/), Vercel Analytics, Vercel Speed Insights

## 3. 目录结构

```
jizhang/
├── app/                    # Next.js App Router 路由与页面
│   ├── auth/               # 认证相关路由 (如 callback)
│   ├── dashboard/          # 主应用界面 (受保护路由)
│   ├── login/              # 登录页
│   ├── register/           # 注册页
│   ├── layout.tsx          # 全局布局
│   └── page.tsx            # 首页 (重定向逻辑)
├── components/             # UI 组件
│   ├── dashboard/          # 仪表盘专用组件
│   ├── providers/          # React Context Providers (如 PostHog)
│   ├── Sidebar.tsx         # 侧边栏导航
│   └── MobileNav.tsx       # 移动端导航
├── lib/                    # 核心逻辑与工具函数
│   ├── actions/            # Server Actions (数据变更逻辑)
│   │   └── transactions.ts # 交易记录相关操作
│   ├── supabase/           # Supabase 客户端初始化
│   │   ├── client.ts       # Browser Client
│   │   ├── server.ts       # Server Client (Cookie handling)
│   │   └── middleware.ts   # Middleware logic
│   ├── tracking.ts         # 埋点/追踪工具
│   └── export.ts           # 导出功能
├── public/                 # 静态资源
├── types/                  # TypeScript 类型定义
├── instrumentation.ts      # 监控初始化 (Sentry 等)
└── middleware.ts           # Next.js 中间件 (未在根目录直接显示，通常位于 root 或 src 下，用于路由保护)
```

> 注意：`docs/` 目录包含 Supabase 官方文档的副本，用于参考，非项目核心代码。

## 4. 环境配置与启动

### 前置要求
- Node.js (推荐 v20+ LTS)
- pnpm (本项目使用 `pnpm-lock.yaml`)

### 1. 安装依赖

```bash
pnpm install
```

### 2. 环境变量配置

请确保项目根目录下存在 `.env.local` 文件，并配置以下 Supabase 核心环境变量（具体值请参考 Supabase 项目设置）：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

如果有监控需求，还需要配置 Sentry 和 PostHog 的相关变量。

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 即可预览。

## 5. 核心功能模块

### 5.1 用户认证 (Authentication)
采用 Supabase Auth。
- **流程**: 用户访问首页 -> `app/page.tsx` 检查 Session。
    - 无 Session -> 重定向至 `/login`。
    - 有 Session -> 重定向至 `/dashboard`。
- **中间件**: `lib/supabase/middleware.ts` 负责在 Edge Runtime 刷新 Session 并保护路由。

### 5.2 记账功能 (Transactions)
主要逻辑位于 `dashboard` 模块。
- **数据获取**: 通过 Server Components 在服务端直接获取数据。
- **数据变更**: 使用 Server Actions (`lib/actions/transactions.ts`) 进行增删改查，确保类型安全和后端验证。
- **展示**: 列表展示与 Recharts 图表统计。

### 5.3 数据导出
支持将记账记录导出为 Excel 文件，使用 `xlsx` 库实现，逻辑位于 `lib/export.ts`。

## 6. 开发规范

- **类型安全**: 严格遵守 TypeScript 类型定义，尽量避免 `any`。
- **组件拆分**: 页面级组件放在 `app/` 下，通用或功能性组件放在 `components/` 下。
- **样式**: 使用 Tailwind CSS Utility Classes。
- **Linting**: 提交代码前请确保通过 ESLint 检查 (`pnpm lint`)。
