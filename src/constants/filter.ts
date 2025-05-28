import { Option } from "@/types/common"
import { TCategory, TProductParams, TTheme, TTier } from "@/types/model/product"
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

export const STICKY_IDS = {
  FILTER_SHEET: "filter-sheet"
}

export const SORT_OPTIONS = [
  {
    value: "price-asc",
    label: "Price: Low to High",
    params: {
      _sort: "price",
      _order: "asc"
    }
  },
  {
    value: "price_desc",
    label: "Price: High to Low",
    params: {
      _sort: "price",
      _order: "desc"
    }
  },
  {
    value: "name-asc",
    label: "Name: A to Z",
    params: {
      _sort: "title",
      _order: "asc"
    }
  },
  {
    value: "name-desc",
    label: "Name: Z to A",
    params: {
      _sort: "title",
      _order: "desc"
    }
  },
  {
    value: "created-at-asc",
    label: "Created At: Oldest",
    params: {
      _sort: "createdAt",
      _order: "asc"
    }
  },
  {
    value: "created-at-desc",
    label: "Created At: Newest",
    params: {
      _sort: "createdAt",
      _order: "desc"
    }
  }
] satisfies (Option<string, string> & { params: TProductParams })[]

export const SORT_OPTIONS_MAP = convertArrayToObject(SORT_OPTIONS)
