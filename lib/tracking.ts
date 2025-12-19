import posthog from 'posthog-js'
import * as Sentry from '@sentry/nextjs'

/**
 * 通用埋点追踪工具
 * 同时发送到PostHog和Sentry
 */

// 追踪自定义事件
export function trackEvent(
    eventName: string,
    properties?: Record<string, unknown>
) {
    // PostHog事件追踪
    if (typeof window !== 'undefined' && posthog) {
        posthog.capture(eventName, properties)
    }

    // Sentry breadcrumb（面包屑）
    Sentry.addBreadcrumb({
        category: 'user-action',
        message: eventName,
        data: properties,
        level: 'info',
    })
}

// 识别用户（登录后调用）
export function identifyUser(
    userId: string,
    userProperties?: Record<string, unknown>
) {
    // PostHog用户识别
    if (typeof window !== 'undefined' && posthog) {
        posthog.identify(userId, userProperties)
    }

    // Sentry用户设置
    Sentry.setUser({
        id: userId,
        ...userProperties,
    })

    // 设置PostHog链接标签
    Sentry.setTag('posthog_distinct_id', userId)
}

// 用户登出时重置
export function resetUser() {
    // PostHog重置
    if (typeof window !== 'undefined' && posthog) {
        posthog.reset()
    }

    // Sentry重置用户
    Sentry.setUser(null)
}

// 追踪错误（同时发送到两个平台）
export function trackError(
    error: Error,
    context?: Record<string, unknown>
) {
    // Sentry捕获错误
    Sentry.captureException(error, {
        extra: context,
    })

    // PostHog记录错误事件
    if (typeof window !== 'undefined' && posthog) {
        posthog.capture('$error', {
            error_message: error.message,
            error_name: error.name,
            error_stack: error.stack,
            ...context,
        })
    }
}

// 设置用户属性
export function setUserProperties(properties: Record<string, unknown>) {
    if (typeof window !== 'undefined' && posthog) {
        posthog.people.set(properties)
    }
}

// 追踪页面停留时间等
export function trackPageLeave() {
    if (typeof window !== 'undefined' && posthog) {
        posthog.capture('$pageleave')
    }
}

// 获取PostHog会话链接（用于在Sentry中显示）
export function getPostHogSessionUrl(): string | null {
    if (typeof window !== 'undefined' && posthog) {
        const sessionId = posthog.get_session_id?.()
        if (sessionId) {
            return `https://app.posthog.com/replay/${sessionId}`
        }
    }
    return null
}

// 获取Sentry错误链接（需要在PostHog中使用）
export function getSentryTraceId(): string | null {
    const scope = Sentry.getCurrentScope()
    const span = scope.getSpan()
    return span?.spanContext().traceId || null
}
