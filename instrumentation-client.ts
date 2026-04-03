// 此文件配置 Sentry 在浏览器端（客户端）的初始化
// 此处的配置将在用户加载页面时使用
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ad76849b912e9e9d018d340d2c95d3e9@o4510560369115136.ingest.us.sentry.io/4510560373374976",

  // 会话回放已迁移到 PostHog 统一处理，避免双重录制增加成本
  // 不再使用 replayIntegration()

  // 智能采样：按事务类型动态控制采样率，平衡成本与可观测性
  tracesSampler: ({ name, attributes }) => {
    // 健康检查 / 监控端点 — 不需要追踪
    if (name?.includes('/monitoring') || name?.includes('/ingest')) {
      return 0;
    }
    // API 路由和服务端操作 — 较高采样率，关注后端性能
    if (name?.includes('/api/') || attributes?.['sentry.op'] === 'http.server') {
      return 0.3;
    }
    // 默认采样率
    return 0.2;
  },

  enableLogs: true,
  sendDefaultPii: true,
});

/**
 * 路由切换开始时的回调：捕获客户端路由导航事件
 * Next.js App Router 在路由切换时会自动调用此函数
 * 用于追踪页面导航性能
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
