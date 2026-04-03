'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import * as Sentry from '@sentry/nextjs'

interface IdentifyUserProps {
  userId: string
  email: string
}

/**
 * 客户端组件：统一识别用户身份
 * 同时将用户信息同步到 PostHog 和 Sentry，确保两者使用一致的用户标识
 */
export default function IdentifyUser({ userId, email }: IdentifyUserProps) {
  const posthog = usePostHog()

  useEffect(() => {
    if (!userId) return

    // PostHog 用户识别
    posthog.identify(userId, { email })

    // Sentry 用户识别 — 错误报告中可关联到具体用户
    Sentry.setUser({ id: userId, email })
  }, [posthog, userId, email])

  return null
}
