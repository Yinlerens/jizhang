// 此文件配置 Sentry 在 Edge 运行时的初始化（中间件、Edge 路由等）
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ad76849b912e9e9d018d340d2c95d3e9@o4510560369115136.ingest.us.sentry.io/4510560373374976",

  // Edge 采样：生产环境 20%
  tracesSampleRate: 0.2,

  enableLogs: true,
  sendDefaultPii: true,
});
