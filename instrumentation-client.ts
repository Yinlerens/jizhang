// 此文件配置 Sentry 在浏览器端（客户端）的初始化
// 此处的配置将在用户加载页面时使用
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Sentry 项目的 DSN（数据源名称），用于标识错误发送到哪个项目
  dsn: "https://ad76849b912e9e9d018d340d2c95d3e9@o4510560369115136.ingest.us.sentry.io/4510560373374976",

  // 集成配置：添加可选的功能集成
  integrations: [
    // 会话回放集成：录制用户操作视频，便于重现错误
    Sentry.replayIntegration(),
  ],

  // 性能追踪采样率：1 表示 100% 的页面加载都会被追踪
  // 生产环境建议调低此值（如 0.1）以减少数据量和成本
  tracesSampleRate: 1,

  // 启用日志发送到 Sentry
  enableLogs: true,

  // 会话回放采样率：10% 的普通会话会被录制
  // 开发环境可设为 1.0（100%），生产环境建议保持低采样率
  replaysSessionSampleRate: 0.1,

  // 错误会话回放采样率：发生错误时 100% 录制
  // 确保能回放错误发生时的用户操作
  replaysOnErrorSampleRate: 1.0,

  // 启用发送用户 PII（个人身份信息），如 IP 地址、用户代理等
  // 文档：https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

/**
 * 路由切换开始时的回调：捕获客户端路由导航事件
 * Next.js App Router 在路由切换时会自动调用此函数
 * 用于追踪页面导航性能
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
