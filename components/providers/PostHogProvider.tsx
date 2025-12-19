"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 初始化PostHog
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ph",
        ui_host: "https://us.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false, // 手动控制页面视图
        capture_pageleave: true,

        // 初始化完成后设置Sentry联动
        loaded: (ph) => {
          // 将PostHog实例挂载到window供Sentry访问
          (window as { posthog?: typeof posthog }).posthog = ph;

          // 设置Sentry用户关联
          const distinctId = ph.get_distinct_id();
          if (distinctId) {
            Sentry.setUser({ id: distinctId });
            Sentry.setTag("posthog_distinct_id", distinctId);
          }

          // 开发环境调试
          if (process.env.NODE_ENV === "development") {
            ph.debug();
          }
        },
      });
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

// 导出usePostHog hook供其他组件使用
export { usePostHog };
