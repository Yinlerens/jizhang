'use client'

import * as Sentry from '@sentry/nextjs'
import { usePostHog } from 'posthog-js/react'

export default function SettingsPage() {
  const posthog = usePostHog()

  const testSentry = () => {
    Sentry.captureException(new Error('测试 Sentry 错误上报 — 请在 Sentry 后台确认收到'))
  }

  const testPostHog = () => {
    posthog.capture('test_event', { source: 'settings_page', timestamp: new Date().toISOString() })
    alert('PostHog test_event 已发送，请在 PostHog 后台确认')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">设置</h1>
        <p className="text-zinc-500 dark:text-zinc-400">系统配置与诊断工具</p>
      </div>

      {/* TODO: 测试完成后删除此区块 */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-amber-800 dark:text-amber-200">诊断测试（临时）</h2>
        <div className="flex gap-3">
          <button
            onClick={testSentry}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            测试 Sentry 错误上报
          </button>
          <button
            onClick={testPostHog}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            测试 PostHog 事件
          </button>
        </div>
        <p className="text-xs text-amber-600 dark:text-amber-400">
          点击按钮后，分别前往 Sentry 后台和 PostHog 后台确认是否收到数据。验证完毕后请删除此区块。
        </p>
      </div>
    </div>
  )
}
