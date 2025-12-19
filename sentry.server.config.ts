// 此文件配置 Sentry 在服务端的初始化
// 此处的配置将在服务器处理请求时使用
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Sentry 项目的 DSN（数据源名称），用于标识错误发送到哪个项目
  dsn: "https://ad76849b912e9e9d018d340d2c95d3e9@o4510560369115136.ingest.us.sentry.io/4510560373374976",

  // 性能追踪采样率：1 表示 100% 的请求都会被追踪
  // 生产环境建议调低此值（如 0.1），或使用 tracesSampler 进行更精细的控制
  tracesSampleRate: 1,

  // 启用日志发送到 Sentry
  enableLogs: true,

  // 启用发送用户 PII（个人身份信息），如 IP 地址、用户代理等
  // 文档：https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
