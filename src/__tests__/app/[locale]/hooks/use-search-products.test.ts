import useSearchProducts from "@/app/[locale]/hooks/use-search-products"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/filter"
import useInfiniteQueryApi from "@/hooks/query/use-infinite-query-api"
import { renderHook } from "@testing-library/react"
import { useSearchParams } from "next/navigation"

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn()
}))

jest.mock("@/hooks/query/use-infinite-query-api", () => ({
  __esModule: true,
  default: jest.fn()
}))

describe("useSearchProducts Hook", () => {
  const mockSearchParams = new Map([
    ["category", "hat"],
    ["theme", "dark"],
    ["tier", "premium"],
    ["_page", "2"],
    ["_limit", "10"]
  ])

  const mockUseSearchParams = useSearchParams as jest.Mock

  const mockUseInfiniteQueryApi = useInfiniteQueryApi as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseSearchParams.mockReturnValue({
      entries: () => mockSearchParams.entries(),
      forEach: (callback: (value: string, key: string) => void) => {
        mockSearchParams.forEach((value, key) => callback(value, key))
      },
      get: (key: string) => mockSearchParams.get(key),
      has: (key: string) => mockSearchParams.has(key),
      keys: () => mockSearchParams.keys(),
      values: () => mockSearchParams.values(),
      toString: () => ""
    })

    Object.fromEntries = jest.fn().mockReturnValue({
      category: "hat",
      theme: "dark",
      tier: "premium",
      _page: "2",
      _limit: "10"
    })

    mockUseInfiniteQueryApi.mockReturnValue({
      data: {
        pages: [
          [
            { id: 1, title: "Product 1" },
            { id: 2, title: "Product 2" }
          ],
          [
            { id: 3, title: "Product 3" },
            { id: 4, title: "Product 4" }
          ]
        ]
      },
      isPending: false,
      isFetching: false,
      isFetchingNextPage: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn()
    })
  })

  it("should call useInfiniteQueryApi with correct parameters", () => {
    renderHook(() => useSearchProducts())

    expect(mockUseInfiniteQueryApi).toHaveBeenCalledWith("products/list", {
      initialPageParam: {
        _page: 2,
        _limit: 10
      },
      getNextPageParam: expect.any(Function),
      params: {
        category: "Hat",
        theme: "Dark",
        tier: "Premium"
      },
      placeholderData: expect.any(Function)
    })
  })

  it("should use default page and limit when not provided in URL", () => {
    Object.fromEntries = jest.fn().mockReturnValue({
      category: "hat"
    })

    renderHook(() => useSearchProducts())

    expect(mockUseInfiniteQueryApi).toHaveBeenCalledWith(
      "products/list",
      expect.objectContaining({
        initialPageParam: {
          _page: DEFAULT_PAGE,
          _limit: DEFAULT_LIMIT
        }
      })
    )
  })

  it("should handle category=all correctly", () => {
    Object.fromEntries = jest.fn().mockReturnValue({
      category: "all",
      theme: "dark"
    })

    renderHook(() => useSearchProducts())

    expect(mockUseInfiniteQueryApi).toHaveBeenCalledWith(
      "products/list",
      expect.objectContaining({
        params: {
          category: undefined,
          theme: "Dark"
        }
      })
    )
  })

  it("should handle undefined filters correctly", () => {
    Object.fromEntries = jest.fn().mockReturnValue({})

    renderHook(() => useSearchProducts())

    expect(mockUseInfiniteQueryApi).toHaveBeenCalledWith(
      "products/list",
      expect.objectContaining({
        params: {}
      })
    )
  })

  it("should compute hasNextPage correctly when there are more items", () => {
    const mockData = {
      pages: [
        Array(DEFAULT_LIMIT)
          .fill(null)
          .map((_, i) => ({ id: i + 1, title: `Product ${i + 1}` }))
      ]
    }

    mockUseInfiniteQueryApi.mockReturnValue({
      data: mockData,
      isPending: false,
      isFetching: false,
      isFetchingNextPage: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn()
    })

    const { result } = renderHook(() => useSearchProducts())

    expect(result.current.hasNextPage).toBe(true)
  })

  it("should compute hasNextPage correctly when there are no more items", () => {
    const mockData = {
      pages: [
        Array(DEFAULT_LIMIT - 1)
          .fill(null)
          .map((_, i) => ({ id: i + 1, title: `Product ${i + 1}` }))
      ]
    }

    mockUseInfiniteQueryApi.mockReturnValue({
      data: mockData,
      isPending: false,
      isFetching: false,
      isFetchingNextPage: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn()
    })

    const { result } = renderHook(() => useSearchProducts())

    expect(result.current.hasNextPage).toBe(false)
  })

  it("should return flattened array of products", () => {
    const mockProducts = [
      [
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" }
      ],
      [
        { id: 3, title: "Product 3" },
        { id: 4, title: "Product 4" }
      ]
    ]

    mockUseInfiniteQueryApi.mockReturnValue({
      data: { pages: mockProducts },
      isPending: false,
      isFetching: false,
      isFetchingNextPage: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn()
    })

    const { result } = renderHook(() => useSearchProducts())

    expect(result.current.items).toEqual([
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
      { id: 3, title: "Product 3" },
      { id: 4, title: "Product 4" }
    ])
  })

  it("should handle null data gracefully", () => {
    mockUseInfiniteQueryApi.mockReturnValue({
      data: null,
      isPending: false,
      isFetching: false,
      isFetchingNextPage: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn()
    })

    const { result } = renderHook(() => useSearchProducts())

    expect(result.current.items).toEqual([])
    expect(result.current.hasNextPage).toBe(false)
  })

  it("should return correct loading states", () => {
    mockUseInfiniteQueryApi.mockReturnValue({
      data: { pages: [] },
      isPending: true,
      isFetching: true,
      isFetchingNextPage: true,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn()
    })

    const { result } = renderHook(() => useSearchProducts())

    expect(result.current.isPending).toBe(true)
    expect(result.current.isFetching).toBe(true)
    expect(result.current.isFetchingNextPage).toBe(true)
  })

  it("should handle error state correctly", () => {
    mockUseInfiniteQueryApi.mockReturnValue({
      data: null,
      isPending: false,
      isFetching: true,
      isFetchingNextPage: false,
      isError: true,
      refetch: jest.fn(),
      fetchNextPage: jest.fn()
    })

    const { result } = renderHook(() => useSearchProducts())

    expect(result.current.isError).toBe(true)
    expect(result.current.isFetching).toBe(false)
  })

  it("should return the refetch and fetchNextPage functions", () => {
    const mockRefetch = jest.fn()
    const mockFetchNextPage = jest.fn()

    mockUseInfiniteQueryApi.mockReturnValue({
      data: { pages: [] },
      isPending: false,
      isFetching: false,
      isFetchingNextPage: false,
      isError: false,
      refetch: mockRefetch,
      fetchNextPage: mockFetchNextPage
    })

    const { result } = renderHook(() => useSearchProducts())

    expect(result.current.refetch).toBe(mockRefetch)
    expect(result.current.fetchNextPage).toBe(mockFetchNextPage)
  })

  it("should test the getNextPageParam logic", () => {
    renderHook(() => useSearchProducts())

    const getNextPageParam =
      mockUseInfiniteQueryApi.mock.calls[0][1].getNextPageParam

    const result = getNextPageParam(null, [[], [], []])

    expect(result).toEqual({
      _page: 4,
      _limit: DEFAULT_LIMIT
    })
  })
})
