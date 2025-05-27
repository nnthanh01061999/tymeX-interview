import { sendRequest } from "@/helpers/fetch/send-request"
import { HttpStatusCode } from "@/helpers/fetch/util"

global.fetch = jest.fn()

const mockReplace = jest.fn()
Object.defineProperty(window, "location", {
  value: {
    replace: mockReplace
  }
})

describe("sendRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should make a successful request", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: "test data" }),
      headers: new Headers()
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await sendRequest({
      url: "/api/test",
      method: "GET"
    })

    expect(global.fetch).toHaveBeenCalledWith("/api/test", {
      method: "GET",
      headers: {}
    })
    expect(result).toEqual({
      success: true,
      responseData: { data: "test data" },
      headers: expect.any(Headers)
    })
  })

  it("should handle error responses", async () => {
    const mockErrorResponse = {
      ok: false,
      status: HttpStatusCode.BAD_REQUEST,
      json: jest.fn().mockResolvedValue({ message: "Bad request" }),
      headers: new Headers()
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse)

    await expect(
      sendRequest({
        url: "/api/test",
        method: "POST",
        payload: { foo: "bar" },
        throwError: true
      })
    ).rejects.toThrow()

    expect(global.fetch).toHaveBeenCalledWith("/api/test", {
      method: "POST",
      headers: {},
      body: { foo: "bar" }
    })
  })
})
