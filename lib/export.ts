import * as XLSX from 'xlsx'
import { format } from 'date-fns'

export interface ExportColumn<T> {
    header: string
    key: keyof T
    formatter?: (value: T[keyof T], row: T) => string | number
}

export interface ExportOptions {
    filename?: string
    sheetName?: string
}

/**
 * 通用 Excel 导出工具函数
 * @param data 要导出的数据数组
 * @param columns 列配置
 * @param options 导出选项
 */
export function exportToExcel<T extends object>(
    data: T[],
    columns: ExportColumn<T>[],
    options: ExportOptions = {}
): void {
    const {
        filename = `导出数据_${format(new Date(), 'yyyyMMdd_HHmmss')}`,
        sheetName = 'Sheet1'
    } = options

    // 转换数据格式
    const exportData = data.map(row => {
        const newRow: Record<string, string | number> = {}
        columns.forEach(col => {
            const value = row[col.key]
            newRow[col.header] = col.formatter
                ? col.formatter(value, row)
                : (value as string | number) ?? ''
        })
        return newRow
    })

    // 创建工作簿和工作表
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    // 自动设置列宽
    worksheet['!cols'] = columns.map(col => ({
        wch: Math.max(col.header.length * 2, 12)
    }))

    // 下载文件
    XLSX.writeFile(workbook, `${filename}.xlsx`)
}

/**
 * 快速导出简单数据（自动推断列）
 */
export function quickExport<T extends object>(
    data: T[],
    filename?: string
): void {
    if (data.length === 0) return

    const keys = Object.keys(data[0]) as (keyof T)[]
    const columns: ExportColumn<T>[] = keys.map(key => ({
        header: String(key),
        key
    }))

    exportToExcel(data, columns, { filename })
}
