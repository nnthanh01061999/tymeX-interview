import {
  convertResponse,
  createRequest,
  injectVariablesToPath
} from "@/helpers/fetch/util"

describe("Fetch Utilities", () => {
  describe("convertResponse", () => {
    it("should convert response to JSON", async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({ data: "test" })
      }

      const result = await convertResponse(
        mockResponse as unknown as Response,
        "json"
      )

      expect(mockResponse.json).toHaveBeenCalled()
      expect(result).toEqual({ data: "test" })
    })

    it("should convert response to text", async () => {
      const mockResponse = {
        text: jest.fn().mockResolvedValue("test text")
      }

      const result = await convertResponse(
        mockResponse as unknown as Response,
        "text"
      )

      expect(mockResponse.text).toHaveBeenCalled()
      expect(result).toBe("test text")
    })

    it("should convert response to blob", async () => {
      const mockBlob = new Blob(["test"], { type: "text/plain" })
      const mockResponse = {
        blob: jest.fn().mockResolvedValue(mockBlob)
      }

      const result = await convertResponse(
        mockResponse as unknown as Response,
        "blob"
      )

      expect(mockResponse.blob).toHaveBeenCalled()
      expect(result).toBe(mockBlob)
    })

    it("should return the response for unknown type", async () => {
      const mockResponse = {}

      const result = await convertResponse(
        mockResponse as unknown as Response,
        "unknown" as any
      )

      expect(result).toBe(mockResponse)
    })
  })

  describe("createRequest", () => {
    const mockRefreshToken = jest.fn()
    const mockGetToken = jest.fn().mockReturnValue("token123")
    const mockOnRetryFailed = jest.fn()
    const mockShouldRefreshToken = jest.fn()

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it("should create a request handler with the provided functions", () => {
      const { fetchData } = createRequest({
        refreshToken: mockRefreshToken,
        getToken: mockGetToken,
        onRetryFailed: mockOnRetryFailed,
        shouldRefreshToken: mockShouldRefreshToken
      })

      expect(typeof fetchData).toBe("function")
    })

    it("should make a request with token when authenticated", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: "success" }),
        headers: new Headers()
      })

      const { fetchData } = createRequest({
        refreshToken: mockRefreshToken,
        getToken: mockGetToken,
        onRetryFailed: mockOnRetryFailed,
        shouldRefreshToken: mockShouldRefreshToken
      })

      const result = await fetchData({
        url: "/test",
        method: "GET",
        isAuth: true
      })

      expect(global.fetch).toHaveBeenCalledWith("/test", {
        method: "GET",
        headers: { Authorization: "token123" }
      })
      expect(result.success).toBe(true)
    })

    it("should make a request without token when not authenticated", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: "success" }),
        headers: new Headers()
      })

      const { fetchData } = createRequest({
        refreshToken: mockRefreshToken,
        getToken: mockGetToken,
        onRetryFailed: mockOnRetryFailed,
        shouldRefreshToken: mockShouldRefreshToken
      })

      const result = await fetchData({
        url: "/test",
        method: "GET",
        isAuth: false
      })

      expect(global.fetch).toHaveBeenCalledWith("/test", {
        method: "GET",
        headers: {}
      })
      expect(result.success).toBe(true)
    })
  })

  describe("injectVariablesToPath", () => {
    it("should inject variables into the path", () => {
      const url = "/users/:id/posts/:postId"
      const variables = { id: "123", postId: "456" }

      const result = injectVariablesToPath(url, variables)

      expect(result).toBe("/users/123/posts/456")
    })

    it("should handle missing variables", () => {
      const url = "/users/:id/posts/:postId"
      const variables = { id: "123" }

      const result = injectVariablesToPath(url, variables)

      expect(result).toBe("/users/123/posts/:postId")
    })

    it("should handle URLs without variables", () => {
      const url = "/users/all/posts"
      const variables = { id: "123" }

      const result = injectVariablesToPath(url, variables)

      expect(result).toBe("/users/all/posts")
    })
  })
})
