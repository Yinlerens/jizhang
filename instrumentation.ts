// Next.js 仪表化文件：用于注册服务端和 Edge 运行时的 Sentry 配置
// 此文件在 Next.js 启动时自动执行，确保 Sentry 在处理请求前完成初始化
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

import * as Sentry from "@sentry/nextjs";

/**
 * 注册函数：根据运行时环境加载对应的 Sentry 配置
 * - Node.js 运行时：加载 sentry.server.config.ts（用于 API 路由、SSR 等）
 * - Edge 运行时：加载 sentry.edge.config.ts（用于中间件、Edge 函数等）
 */
export async function register() {
  // Node.js 运行时（服务端渲染、API 路由）
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  // Edge 运行时（中间件、Edge API 路由）
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

/**
 * 请求错误处理函数：捕获并上报服务端请求错误到 Sentry
 * Next.js 会在请求处理出错时自动调用此函数
 */
export const onRequestError = Sentry.captureRequestError;
