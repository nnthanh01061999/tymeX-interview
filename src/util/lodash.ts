export function debounce<F extends (...args: any[]) => void>(
  func?: F,
  wait?: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout
  return function (...args: Parameters<F>) {
    if (!func || wait == null) return
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function isEmpty(value?: any): boolean {
  if (value == null) return true
  if (Array.isArray(value) || typeof value === "string")
    return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}
