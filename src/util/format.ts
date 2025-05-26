import { Option } from "@/types"

export const formatNumber = (
  num: number,
  fallback = "",
  options?: Intl.NumberFormatOptions
): string => {
  if (!num) return fallback
  const formatter = new Intl.NumberFormat("en-EN", options)
  return formatter.format(num)
}

export const convertArrayToObject = <T extends Option<string, string>>(
  arr: T[]
): Record<string, T> => {
  return arr.reduce(
    (acc, item) => {
      acc[item.value] = item
      return acc
    },
    {} as Record<string, T>
  )
}
