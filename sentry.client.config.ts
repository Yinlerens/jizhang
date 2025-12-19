// 此文件配置 Sentry 在浏览器端的初始化
// 此处的配置将在浏览器加载应用时使用
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Sentry 项目的 DSN（数据源名称），用于标识错误发送到哪个项目
  dsn: "https://ad76849b912e9e9d018d340d2c95d3e9@o4510560369115136.ingest.us.sentry.io/4510560373374976",

  // 性能追踪采样率：1.0 表示 100% 的页面加载都会被追踪
  // 生产环境建议调低此值（如 0.1）以减少数据量和成本
  tracesSampleRate: 1.0,

  // 会话回放采样率：普通会话录制 10%
  replaysSessionSampleRate: 0.1,

  // 错误会话回放采样率：发生错误时 100% 录制（确保能回放错误现场）
  replaysOnErrorSampleRate: 1.0,

  // 环境标识：区分开发/生产环境的错误
  environment: process.env.NODE_ENV,

  // 调试模式：开发环境下打印 Sentry 调试日志
  debug: process.env.NODE_ENV === 'development',

  // 集成配置
  integrations: [
    // 会话回放集成：录制用户操作视频，便于重现错误
    Sentry.replayIntegration({
      // 是否遮盖所有文本（隐私保护），false 表示不遮盖
      maskAllText: false,
      // 是否屏蔽所有媒体（图片/视频），false 表示不屏蔽
      blockAllMedia: false,
      networkDetailAllowUrls: [window.location.origin]
    }),
  ],
});
