import getQueryString, { GetQueryString } from "@/util/query-params"
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter
} from "next/navigation"
import { useCallback } from "react"

export type FilterQuery = {
  data: Record<string, unknown>
  pathname?: string
  scrollTop?: boolean
  searchParams?: URLSearchParams | ReadonlyURLSearchParams
} & Omit<GetQueryString, "data" | "searchParams">

type UseFilterQueryParamsOptions = {
  replace?: boolean
  scrollTop?: boolean
  getQuery?: typeof getQueryString
}

export default function useFilterQueryParams(
  options?: UseFilterQueryParamsOptions
) {
  const {
    replace = true,
    scrollTop = true,
    getQuery = getQueryString
  } = options || {}
  const router = useRouter()
  const currentPathname = usePathname()

  const updateQuery = useCallback(
    ({
      data,
      pathname,
      scrollTop: localScrollTop,
      searchParams
    }: FilterQuery) => {
      const method = replace ? router.replace : router.push
      const targetPath = pathname || currentPathname
      const queryString = getQuery({
        data,
        searchParams: searchParams || new URLSearchParams()
      })
      method(`${targetPath}?${queryString}`, {
        scroll: localScrollTop ?? scrollTop ?? true
      })
    },
    [replace, router.replace, router.push, currentPathname, getQuery, scrollTop]
  )

  return updateQuery
}
