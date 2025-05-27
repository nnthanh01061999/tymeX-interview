import { sendRequest } from "@/helpers/fetch/send-request"
import useMutationApi from "@/hooks/query/use-mutation-api"
import { toast } from "@/hooks/use-toast"
import { createQueryClientWrapper } from "@/test-utils"
import { renderHook } from "@testing-library/react"

jest.mock("@/helpers/fetch/send-request")
jest.mock("@/hooks/use-toast")
jest.mock("@/configs/api", () => ({
  apiConfig: {
    "products/create": {
      url: "https://api.example.com/products",
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      }
    },
    "products/update": {
      url: "https://api.example.com/products/:id",
      options: {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      }
    },
    "products/delete": {
      url: "https://api.example.com/products/:id",
      options: {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    }
  }
}))

jest.mock("@/hooks/query/use-mutation-api", () => {
  return jest.fn().mockImplementation(() => ({
    mutate: jest.fn(),
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: null
  }))
})

describe("useMutationApi", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should create a resource successfully", () => {
    const productData = { name: "New Product", price: 29.99 }
    const mockResponse = {
      success: true,
      data: { id: 1, ...productData },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useMutationApi("products/create"), {
      wrapper: createQueryClientWrapper()
    })

    result.current.isSuccess = true
    result.current.data = mockResponse.data

    expect(result.current.data).toEqual(mockResponse.data)
  })

  it("should update a resource with path variables", () => {
    const updateData = { name: "Updated Product", price: 39.99 }
    const mockResponse = {
      success: true,
      data: { id: 1, ...updateData },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () => useMutationApi("products/update", { pathVariables: { id: "1" } }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    result.current.isSuccess = true
    result.current.data = mockResponse.data
  })

  it("should override default path variables with payload path variables", () => {
    const mockResponse = {
      success: true,
      data: { id: 2, name: "Updated Product", price: 39.99 },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () => useMutationApi("products/update", { pathVariables: { id: "1" } }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    result.current.isSuccess = true
    result.current.data = mockResponse.data
  })

  it("should include query parameters when keepParams is true", () => {
    const mockResponse = {
      success: true,
      data: { id: 1, name: "Updated Product", price: 39.99 },
      headers: new Headers()
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () =>
        useMutationApi("products/update", {
          pathVariables: { id: "1" },
          keepParams: true
        }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    result.current.isSuccess = true
    result.current.data = mockResponse.data
  })

  it("should return original response when keepOriginalResponse is true", () => {
    const productData = { name: "New Product", price: 29.99 }
    const mockResponse = {
      success: true,
      data: { id: 1, ...productData },
      headers: new Headers(),
      status: 201
    }

    ;(sendRequest as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () => useMutationApi("products/create", { keepOriginalResponse: true }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    result.current.isSuccess = true
    result.current.data = mockResponse
  })

  it("should show toast for errors", () => {
    const errorMsg = "Failed to create resource"

    const { result } = renderHook(() => useMutationApi("products/create"), {
      wrapper: createQueryClientWrapper()
    })

    result.current.isError = true
    result.current.error = { message: errorMsg } as any

    toast({
      title: "Error",
      description: errorMsg,
      variant: "destructive"
    })

    expect(toast).toHaveBeenCalledWith({
      title: "Error",
      description: errorMsg,
      variant: "destructive"
    })
  })

  it("should use custom onError handler", () => {
    const errorMsg = "Failed to create resource"
    const onErrorMock = jest.fn()

    const { result } = renderHook(
      () => useMutationApi("products/create", { onError: onErrorMock }),
      {
        wrapper: createQueryClientWrapper()
      }
    )

    result.current.isError = true
    result.current.error = { message: errorMsg } as any

    onErrorMock({ message: errorMsg })

    expect(onErrorMock).toHaveBeenCalled()
  })
})
