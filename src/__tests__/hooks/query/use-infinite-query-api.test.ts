import { sendRequest } from "@/helpers/fetch/send-request"
import useInfiniteQueryApi from "@/hooks/query/use-infinite-query-api"
import { toast } from "@/hooks/use-toast"
import { createQueryClientWrapper } from "@/test-utils"
import { renderHook, waitFor } from "@testing-library/react"

jest.mock("@/helpers/fetch/send-request")
jest.mock("@/hooks/use-toast")
jest.mock("@/configs/api", () => ({
  apiConfig: {
    "products/list": {
      url: "/api/products",
      options: {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    }
  }
}))

jest.mock("@/hooks/query/use-infinite-query-api", () => {
  const original = jest.requireActual("@/hooks/query/use-infinite-query-api")
  return {
    __esModule: true,
    default: jest.fn().mockImplementation((apiKey, options) => {
      return original.default(apiKey, options)
    })
  }
})

describe("useInfiniteQueryApi", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should fetch the first page of data successfully", async () => {
    const mockResponse = {
      success: true,
      responseData: {
        data: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" }
        ],
        meta: { totalCount: 6, currentPage: 1, lastPage: 3 }
      },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () =>
        useInfiniteQueryApi("products/list", {
          initialPageParam: { _page: 1, _limit: 2 },
          getNextPageParam: () => undefined
        }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/products",
        params: expect.objectContaining({
          _page: 1,
          _limit: 2
        })
      })
    )

    expect(result.current.data?.pages).toHaveLength(1)
    expect(result.current.data?.pages[0]).toEqual(mockResponse.responseData)
  })

  it("should fetch the next page when fetchNextPage is called", async () => {
    const firstPageResponse = {
      success: true,
      responseData: {
        data: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" }
        ],
        meta: { totalCount: 6, currentPage: 1, lastPage: 3 }
      },
      headers: new Headers()
    }

    const secondPageResponse = {
      success: true,
      responseData: {
        data: [
          { id: 3, name: "Product 3" },
          { id: 4, name: "Product 4" }
        ],
        meta: { totalCount: 6, currentPage: 2, lastPage: 3 }
      },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockImplementation((options) => {
      const pageParam = options.params?._page
      if (pageParam === 1) {
        return Promise.resolve(firstPageResponse)
      } else if (pageParam === 2) {
        return Promise.resolve(secondPageResponse)
      }
      return Promise.reject(new Error("Unexpected page parameter"))
    })

    const { result } = renderHook(
      () =>
        useInfiniteQueryApi("products/list", {
          initialPageParam: { _page: 1, _limit: 2 },
          getNextPageParam: (lastPage) => {
            const meta = lastPage.meta
            return meta.currentPage < meta.lastPage
              ? { _page: meta.currentPage + 1, _limit: 2 }
              : undefined
          }
        }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.pages).toHaveLength(1)
    expect(result.current.data?.pages[0]).toEqual(
      firstPageResponse.responseData
    )

    result.current.fetchNextPage()

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2))

    expect(result.current.data?.pages[1]).toEqual(
      secondPageResponse.responseData
    )

    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        params: expect.objectContaining({ _page: 2, _limit: 2 })
      })
    )
  })

  it("should support nextParamsIsData option for payload-based pagination", async () => {
    const firstPageResponse = {
      success: true,
      responseData: {
        data: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" }
        ],
        nextCursor: "cursor123"
      },
      headers: new Headers()
    }

    const secondPageResponse = {
      success: true,
      responseData: {
        data: [
          { id: 3, name: "Product 3" },
          { id: 4, name: "Product 4" }
        ],
        nextCursor: null
      },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockImplementation((options) => {
      const cursor = options.payload?.cursor
      if (!cursor) {
        return Promise.resolve(firstPageResponse)
      } else if (cursor === "cursor123") {
        return Promise.resolve(secondPageResponse)
      }
      return Promise.reject(new Error("Unexpected cursor"))
    })

    const { result } = renderHook(
      () =>
        useInfiniteQueryApi("products/list", {
          initialPageParam: {},
          nextParamsIsData: true,
          getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
              ? { cursor: lastPage.nextCursor }
              : undefined
          }
        }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    result.current.fetchNextPage()

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2))

    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({ cursor: "cursor123" })
      })
    )
  })

  it("should handle custom error handler", async () => {
    const mockError = new Error("Network error")
    ;(sendRequest as jest.Mock).mockRejectedValue(mockError)

    const onErrorMock = jest.fn()

    const { result } = renderHook(
      () =>
        useInfiniteQueryApi("products/list", {
          initialPageParam: {},
          getNextPageParam: () => undefined,
          onError: onErrorMock
        }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(onErrorMock).toHaveBeenCalledWith(mockError)
    expect(toast).not.toHaveBeenCalled()
  })

  it("should show toast for errors when no custom handler is provided", async () => {
    const mockError = new Error("Network error")
    ;(sendRequest as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(
      () =>
        useInfiniteQueryApi("products/list", {
          initialPageParam: {},
          getNextPageParam: () => undefined
        }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast).toHaveBeenCalledWith({
      title: "Error",
      description: "Network error",
      variant: "destructive"
    })
  })
})
