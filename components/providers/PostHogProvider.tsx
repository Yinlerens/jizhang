"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 初始化PostHog
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ph",
        ui_host: "https://us.posthog.com",
        person_profiles: "identified_only",
        autocapture: true, // 是否自动捕获页面点击等事件
        capture_pageview: true, // 是否自动捕获页面浏览
        capture_pageleave: true, // 是否捕获页面离开事件
        session_recording: {
          maskAllInputs: false, // 禁用所有输入的默认遮罩
        },
        // 初始化完成后的回调
        loaded: (ph) => {
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
