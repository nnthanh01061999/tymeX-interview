import { sendRequest } from "@/helpers/fetch/send-request"
import useQueryApi from "@/hooks/query/use-query-api"
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
    },
    "products/detail": {
      url: "/api/products/:id",
      options: {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    }
  }
}))

describe("useQueryApi", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should fetch data successfully", async () => {
    const mockResponse = {
      success: true,
      responseData: { products: [{ id: 1, name: "Product 1" }] },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useQueryApi("products/list"), {
      wrapper: createQueryClientWrapper()
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(sendRequest).toHaveBeenCalledWith({
      method: "GET",
      throwError: true,
      url: "/api/products",
      headers: { "Content-Type": "application/json" },
      params: undefined,
      payload: undefined
    })

    expect(result.current.data).toEqual({
      products: [{ id: 1, name: "Product 1" }]
    })
  })

  it("should handle path variables correctly", async () => {
    const mockResponse = {
      success: true,
      responseData: { id: 1, name: "Product 1" },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () => useQueryApi("products/detail", { pathVariables: { id: "1" } }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/api/products/1"
      })
    )

    expect(result.current.data).toEqual({ id: 1, name: "Product 1" })
  })

  it("should pass query parameters correctly", async () => {
    const mockResponse = {
      success: true,
      responseData: { products: [{ id: 1, name: "Product 1" }] },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () => useQueryApi("products/list", { params: { limit: 10, page: 1 } }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { limit: 10, page: 1 }
      })
    )
  })

  it("should call onSuccess callback with data", async () => {
    const mockResponse = {
      success: true,
      responseData: { products: [{ id: 1, name: "Product 1" }] },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const onSuccessMock = jest.fn()

    renderHook(
      () => useQueryApi("products/list", { onSuccess: onSuccessMock }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    await waitFor(() => expect(onSuccessMock).toHaveBeenCalledTimes(1))
    expect(onSuccessMock).toHaveBeenCalledWith({
      products: [{ id: 1, name: "Product 1" }]
    })
  })

  it("should handle errors with custom error handler", async () => {
    const mockError = new Error("Network error")
    ;(sendRequest as jest.Mock).mockRejectedValue(mockError)

    const onErrorMock = jest.fn()

    const { result } = renderHook(
      () => useQueryApi("products/list", { onError: onErrorMock }),
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

    const { result } = renderHook(() => useQueryApi("products/list"), {
      wrapper: createQueryClientWrapper()
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(toast).toHaveBeenCalledWith({
      title: "Error",
      description: "Network error",
      variant: "destructive"
    })
  })
})
