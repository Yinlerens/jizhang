'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import PostHogPageView from './PostHogPageView'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: '/ingest',
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

      // 页面追踪：关闭自动 pageview（由 PostHogPageView 组件手动处理 SPA 路由）
      capture_pageview: false,
      capture_pageleave: true,

      // 会话回放：由 PostHog 统一处理（已移除 Sentry replayIntegration 避免冲突）
      session_recording: {
        maskAllInputs: true,          // 遮蔽所有输入框（保护密码、金额等敏感数据）
        maskTextSelector: '[data-mask]', // 自定义遮蔽选择器
      },
    })

    // 注册 PostHog ↔ Sentry 桥接集成
    posthog.sentryIntegration({
      organization: 'cc-3g',
      projectId: 4510560373374976,
      severityAllowList: ['error', 'fatal'],
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}
