import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants"
import { useCallback, useState } from "react"

export interface IPaginationFilter {
  [key: string]: number
}

export interface IPaginationStates {
  _page: number
  _limit: number
}

const defaultPagination: IPaginationStates = {
  _page: DEFAULT_PAGE,
  _limit: DEFAULT_LIMIT
}

export const usePagination = ({
  _page = DEFAULT_PAGE,
  _limit = DEFAULT_LIMIT
}: Partial<IPaginationStates>) => {
  const [pagination, setPagination] = useState<IPaginationStates>({
    _page: _page ? Number(_page) : defaultPagination._page,
    _limit: _limit ? Number(_limit) : defaultPagination._limit
  })

  const onResetPagination = () => {
    setPagination((prev) => ({
      ...prev,
      ...defaultPagination
    }))
  }

  const onChangeFirstPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: DEFAULT_PAGE
    }))
  }, [])

  const onChange = (page: number, limit?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      limit: limit ?? prev._limit
    }))
  }

  const getNextPage = (total: number) => {
    if (total > pagination._page * pagination._limit) {
      return pagination._page + 1
    }
    return null
  }

  const onChangeNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      _page: prev._page + 1
    }))
  }

  return {
    pagination,
    setPagination,
    getNextPage,
    onChange,
    onChangeNextPage,
    onChangeFirstPage,
    onResetPagination
  }
}
