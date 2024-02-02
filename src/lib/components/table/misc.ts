import type { IAscSortFn } from './types'

export function downloadData (data: string, fileName: string): void {
    const blob = new Blob([data])
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    a.remove()
}

export const defaultAscSortFn: IAscSortFn = (valueA, valueB) => {
    return valueA < valueB ? -1 : 1
}
