'use client'

import * as Sentry from '@sentry/nextjs'
import { usePostHog } from 'posthog-js/react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const posthog = usePostHog()

  const testSentry = () => {
    Sentry.captureException(new Error('测试 Sentry 错误上报 — 请在 Sentry 后台确认收到'))
  }

  const testPostHog = () => {
    posthog.capture('test_event', { source: 'settings_page', timestamp: new Date().toISOString() })
    toast.success('PostHog test_event 已发送')
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="anime-kicker">System Lab</div>
        <h1 className="anime-page-title mt-4">设置</h1>
        <p className="anime-page-subtitle">系统配置与诊断工具</p>
      </div>

      {/* TODO: 测试完成后删除此区块 */}
      <div className="anime-surface space-y-4 p-5">
        <h2 className="anime-panel-title text-sm">诊断测试（临时）</h2>
        <div className="flex gap-3">
          <button
            onClick={testSentry}
            className="anime-action bg-[#ff7aa8]"
          >
            测试 Sentry 错误上报
          </button>
          <button
            onClick={testPostHog}
            className="anime-action anime-action-secondary"
          >
            测试 PostHog 事件
          </button>
        </div>
        <p className="text-xs font-bold text-[#8f5b72] dark:text-cyan-100/60">
          点击按钮后，分别前往 Sentry 后台和 PostHog 后台确认是否收到数据。验证完毕后请删除此区块。
        </p>
      </div>
    </div>
  )
}
