import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/filter"
import useInfiniteQueryApi from "@/hooks/use-infinite-query-api"
import { usePagination } from "@/hooks/use-pagination"
import { IProduct } from "@/types/model/product"
import { useSearchParams } from "next/navigation"

const useSearchProducts = () => {
  const searchParams = useSearchParams()
  const { _limit, _page, ...params } = Object.fromEntries(searchParams)
  const { pagination } = usePagination({
    _page: _page ? Number(_page) : DEFAULT_PAGE,
    _limit: _limit ? Number(_limit) : DEFAULT_LIMIT
  })

  const {
    data,
    isFetching,
    isFetchingNextPage,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQueryApi<IProduct[]>("products/list", {
    initialPageParam: pagination,
    getNextPageParam: (_, pages) => {
      return {
        _page: pages.length + 1,
        _limit: DEFAULT_LIMIT
      }
    },
    params: {
      ...params
    }
  })

  return {
    items: data?.pages.flatMap((page) => page) ?? [],
    loading: isFetching,
    isLoadingMore: isFetchingNextPage,
    error: isError,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}

export default useSearchProducts
