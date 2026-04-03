// 此文件配置 Sentry 在服务端的初始化
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ad76849b912e9e9d018d340d2c95d3e9@o4510560369115136.ingest.us.sentry.io/4510560373374976",

  // 服务端采样：生产环境 20%，平衡可观测性与成本
  tracesSampleRate: 0.2,

  enableLogs: true,
  sendDefaultPii: true,
});
