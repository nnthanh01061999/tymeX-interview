import {
  CATEGORY_OPTIONS_MAP,
  SORT_OPTIONS_MAP,
  THEME_OPTIONS_MAP,
  TIER_OPTIONS_MAP
} from "@/constants/filter"
import { TProductParams } from "@/types"

export const getValidatedParams = (data: Record<string, any>) => {
  return Object.entries(data)
    .filter(([, value]) =>
      Array.isArray(value) ? value.filter(Boolean).length > 0 : value !== ""
    )
    .reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          return {
            ...acc,
            [`${key}_gte`]: value[0],
            [`${key}_lte`]: value[1]
          }
        }
        if (key === "category") {
          return { ...acc, category: value === "all" ? undefined : value }
        }
        return { ...acc, [key]: value }
      },
      {} as Record<string, string | number>
    )
}

export const getSearchProductParams = (
  params: TProductParams
): TProductParams => {
  const { theme, tier, category, sort, ...rest } = params

  const sortOption = sort ? SORT_OPTIONS_MAP[sort].params : undefined

  return {
    ...rest,
    tier: tier ? TIER_OPTIONS_MAP[tier]?.label : undefined,
    theme: theme ? THEME_OPTIONS_MAP[theme]?.label : undefined,
    category:
      category && category !== "all"
        ? CATEGORY_OPTIONS_MAP[category]?.label
        : undefined,
    _sort: sortOption ? sortOption?._sort : undefined,
    _order: sortOption ? sortOption?._order : undefined
  }
}
