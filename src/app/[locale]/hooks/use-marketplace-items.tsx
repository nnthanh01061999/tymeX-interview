import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/filter"
import useInfiniteQueryApi from "@/hooks/use-infinite-query-api"
import { usePagination } from "@/hooks/use-pagination"
import { IProduct, TProductParams } from "@/types/model/product"
import { useParams } from "next/navigation"

const useMarketplaceItems = () => {
  const { _limit, _page, ...params } = useParams<TProductParams>()
  const { pagination } = usePagination({
    _page: _page ? Number(_page) : DEFAULT_PAGE,
    _limit: _limit ? Number(_limit) : DEFAULT_LIMIT
  })

  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQueryApi<IProduct[]>("products/list", {
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
    loading: isPending,
    error: isError,
    refetch,
    fetchNextPage,
    hasNextPage
  }
}

export default useMarketplaceItems
