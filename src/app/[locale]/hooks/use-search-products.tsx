import {
  CATEGORY_OPTIONS_MAP,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  THEME_OPTIONS_MAP,
  TIER_OPTIONS_MAP
} from "@/constants/filter"
import useInfiniteQueryApi from "@/hooks/query/use-infinite-query-api"
import { IProduct } from "@/types/model/product"
import { keepPreviousData } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

const useSearchProducts = () => {
  const searchParams = useSearchParams()
  const { _limit, _page, ...params } = Object.fromEntries(searchParams)

  const {
    data,
    isFetching,
    isFetchingNextPage,
    isError,
    refetch,
    fetchNextPage
  } = useInfiniteQueryApi<IProduct[]>("products/list", {
    initialPageParam: {
      _page: _page ? Number(_page) : DEFAULT_PAGE,
      _limit: _limit ? Number(_limit) : DEFAULT_LIMIT
    },
    getNextPageParam: (_, pages) => {
      return {
        _page: pages.length + 1,
        _limit: DEFAULT_LIMIT
      }
    },
    params: {
      ...params,
      tier: params.tier ? TIER_OPTIONS_MAP[params.tier]?.label : undefined,
      theme: params.theme ? THEME_OPTIONS_MAP[params.theme]?.label : undefined,
      category:
        params.category && params.category !== "all"
          ? CATEGORY_OPTIONS_MAP[params.category]?.label
          : undefined
    },
    placeholderData: keepPreviousData
  })

  const hasNextPage = useMemo(() => {
    if (!data?.pages) return false
    return data.pages?.[data.pages.length - 1]?.length >= DEFAULT_LIMIT
  }, [data?.pages])

  return {
    items: data?.pages.flatMap((page) => page) ?? [],
    isFetching,
    isFetchingNextPage,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}

export default useSearchProducts
