import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // 启用 React 编译器（React 19 新特性）
  reactCompiler: true,

  // URL 重写规则：将 PostHog 请求代理到自己的服务器，绕过广告拦截器
  async rewrites() {
    return [
      {
        source: '/ph/static/:path*',  // 匹配 /ph/static/* 的请求
        destination: 'https://us-assets.i.posthog.com/static/:path*',  // 转发到 PostHog 静态资源
      },
      {
        source: '/ph/:path*',  // 匹配 /ph/* 的请求
        destination: 'https://us.i.posthog.com/:path*',  // 转发到 PostHog API
      },
    ]
  },

  // 跳过尾部斜杠重定向（避免与 PostHog 代理冲突）
  skipTrailingSlashRedirect: true,
};

export default withSentryConfig(nextConfig, {
  // ============================================
  // Sentry Webpack 插件配置
  // 完整选项：https://www.npmjs.com/package/@sentry/webpack-plugin#options
  // ============================================

  // Sentry 组织 slug（从 Sentry 后台获取）
  org: "cc-3g",

  // Sentry 项目 slug（从 Sentry 后台获取）
  project: "jizhang",

  // 静默模式：仅在 CI 环境中打印 source map 上传日志
  silent: !process.env.CI,

  // ============================================
  // Sentry Next.js SDK 配置
  // 完整选项：https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  // ============================================

  // 上传更多 source maps 以获得更清晰的堆栈跟踪（会增加构建时间）
  widenClientFileUpload: true,

  // 隧道路由：将浏览器的 Sentry 请求通过 Next.js 服务器转发，绕过广告拦截器
  // 注意：这会增加服务器负载和托管费用
  // 注意：确保此路由不会与 Next.js 中间件冲突，否则客户端错误上报会失败
  tunnelRoute: "/monitoring",

  // Webpack 相关配置
  webpack: {
    // 启用 Vercel Cron 任务自动监控（目前不支持 App Router 路由处理程序）
    // 详情：https://docs.sentry.io/product/crons/
    // Vercel Cron：https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking 配置：减少打包体积
    treeshake: {
      // 自动移除 Sentry 日志语句，减少打包体积
      removeDebugLogging: true,
    },
  },
});
