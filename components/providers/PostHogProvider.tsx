'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import PostHogPageView from './PostHogPageView'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

    if (!posthogKey) {
      return
    }

    posthog.init(posthogKey, {
      api_host: '/ingest',
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

      capture_pageview: false,
      capture_pageleave: true,

      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-mask]',
      },
    })

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
