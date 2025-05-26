import { Option } from "@/types/common"
import { TCategory, TTheme, TTier } from "@/types/model/product"
import { convertArrayToObject } from "@/util/format"

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 20

export const SORT_ASC = "asc"
export const SORT_DESC = "desc"

export const TIER_OPTIONS: Option<string, TTier>[] = [
  { label: "Basic", value: "basic" },
  { label: "Premium", value: "premium" },
  { label: "Deluxe", value: "deluxe" }
]

export const TIER_OPTIONS_MAP = convertArrayToObject(TIER_OPTIONS)

export const THEME_OPTIONS: Option<string, TTheme>[] = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "Colorful", value: "colorful" },
  { label: "Halloween", value: "halloween" }
]

export const THEME_OPTIONS_MAP = convertArrayToObject(THEME_OPTIONS)

export const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "upper-body", label: "Upper Body" },
  { value: "lower-body", label: "Lower Body" },
  { value: "hat", label: "Hat" },
  { value: "shoes", label: "Shoes" },
  { value: "accessory", label: "Accessory" },
  { value: "basic", label: "Basic" },
  { value: "premium", label: "Premium" },
  { value: "deluxe", label: "Deluxe" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "colorful", label: "Colorful" },
  { value: "halloween", label: "Halloween" }
] satisfies Option<string, TCategory | string>[]

export const CATEGORY_OPTIONS_MAP = convertArrayToObject(CATEGORY_OPTIONS)
