// 动态生成基于HSL的彩虹色谱颜色
export function generateColors(count: number): string[] {
    const colors: string[] = []
    for (let i = 0; i < count; i++) {
        // 使用黄金角度分布来获得视觉上均匀分布的颜色
        const hue = (i * 137.508) % 360
        colors.push(`hsl(${hue}, 70%, 55%)`)
    }
    return colors
}

// 预定义的高饱和度彩色调色板
export const CHART_COLORS = [
    '#6366f1', // Indigo
    '#ec4899', // Pink
    '#14b8a6', // Teal
    '#f59e0b', // Amber
    '#8b5cf6', // Violet
    '#10b981', // Emerald
    '#f43f5e', // Rose
    '#06b6d4', // Cyan
    '#84cc16', // Lime
    '#a855f7', // Purple
    '#22c55e', // Green
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#eab308', // Yellow
    '#0ea5e9', // Sky
]

// 根据索引获取颜色，支持无限循环
export function getChartColor(index: number): string {
    return CHART_COLORS[index % CHART_COLORS.length]
}
