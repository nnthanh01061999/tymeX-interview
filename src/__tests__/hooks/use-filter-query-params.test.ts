import useFilterQueryParams from "@/hooks/use-filter-query-params"
import { renderHook } from "@testing-library/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { act } from "react"

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}))

describe("useFilterQueryParams", () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn()
  }

  const createMockSearchParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value)
    })
    return {
      toString: () => searchParams.toString(),
      get: (key: string) => searchParams.get(key),
      getAll: (key: string) => searchParams.getAll(key)
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(usePathname as jest.Mock).mockReturnValue("/test-path")
    ;(useSearchParams as jest.Mock).mockReturnValue(createMockSearchParams({}))
  })

  it("should return empty params when search params are empty", () => {
    const { result } = renderHook(() => useFilterQueryParams())

    expect(result.current.params).toEqual({})
  })

  it("should parse search params correctly", () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(
      createMockSearchParams({ category: "books", price: "10" })
    )

    const { result } = renderHook(() => useFilterQueryParams())

    expect(result.current.params).toEqual({ category: "books", price: "10" })
  })

  it("should set params with router.replace by default", () => {
    const { result } = renderHook(() => useFilterQueryParams())

    act(() => {
      result.current.setParams({
        data: { category: "books", price: "10" }
      })
    })

    expect(mockRouter.replace).toHaveBeenCalledWith(
      "/test-path?category=books&price=10",
      { scroll: true }
    )
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it("should set params with router.push when replace is false", () => {
    const { result } = renderHook(() =>
      useFilterQueryParams({ replace: false })
    )

    act(() => {
      result.current.setParams({
        data: { category: "books", price: "10" }
      })
    })

    expect(mockRouter.push).toHaveBeenCalledWith(
      "/test-path?category=books&price=10",
      { scroll: true }
    )
    expect(mockRouter.replace).not.toHaveBeenCalled()
  })

  it("should override pathname when provided", () => {
    const { result } = renderHook(() => useFilterQueryParams())

    act(() => {
      result.current.setParams({
        data: { category: "books" },
        pathname: "/new-path"
      })
    })

    expect(mockRouter.replace).toHaveBeenCalledWith(
      "/new-path?category=books",
      { scroll: true }
    )
  })

  it("should control scroll behavior with scrollTop option", () => {
    const { result } = renderHook(() =>
      useFilterQueryParams({ scrollTop: false })
    )

    act(() => {
      result.current.setParams({
        data: { category: "books" }
      })
    })

    expect(mockRouter.replace).toHaveBeenCalledWith(
      "/test-path?category=books",
      { scroll: false }
    )
  })

  it("should reset existing params when reset is true", () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(
      createMockSearchParams({ existing: "param" })
    )

    const { result } = renderHook(() => useFilterQueryParams())

    act(() => {
      result.current.setParams({
        data: { category: "books" },
        reset: true
      })
    })

    expect(mockRouter.replace).toHaveBeenCalledWith(
      "/test-path?category=books",
      { scroll: true }
    )
  })

  it("should merge with existing params when reset is false", () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(
      createMockSearchParams({ existing: "param" })
    )

    const { result } = renderHook(() => useFilterQueryParams())

    act(() => {
      result.current.setParams({
        data: { category: "books" }
      })
    })

    expect(mockRouter.replace).toHaveBeenCalledWith(
      "/test-path?existing=param&category=books",
      { scroll: true }
    )
  })
})
