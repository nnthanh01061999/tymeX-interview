import { getSearchProductParams } from "@/app/[locale]/util"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/filter"
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
    isPending,
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
      ...getSearchProductParams(params)
    },
    placeholderData: keepPreviousData
  })

  const hasNextPage = useMemo(() => {
    if (!data?.pages) return false
    return data.pages?.[data.pages.length - 1]?.length >= DEFAULT_LIMIT
  }, [data?.pages])

  return {
    items: data?.pages.flatMap((page) => page) ?? [],
    isFetching: isFetching && !isError,
    isPending,
    isFetchingNextPage,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}

export default useSearchProducts
