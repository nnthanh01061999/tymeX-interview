import getQueryString from "@/util/query-params"

describe("getQueryString", () => {
  it("should convert data to a query string", () => {
    const searchParams = new URLSearchParams()
    const data = { category: "books", price: 10 }

    const result = getQueryString({ searchParams, data })

    expect(result).toBe("category=books&price=10")
  })

  it("should merge with existing search params when keepPrevious is true", () => {
    const searchParams = new URLSearchParams("existing=param")
    const data = { category: "books" }

    const result = getQueryString({ searchParams, data })

    expect(result).toBe("existing=param&category=books")
  })

  it("should replace existing search params when keepPrevious is false", () => {
    const searchParams = new URLSearchParams("existing=param")
    const data = { category: "books" }

    const result = getQueryString({ searchParams, data, keepPrevious: false })

    expect(result).toBe("category=books")
  })

  it("should handle array values correctly", () => {
    const searchParams = new URLSearchParams()
    const data = { tags: ["fiction", "fantasy"] }

    const result = getQueryString({ searchParams, data })

    expect(result).toBe("tags[]=fiction&tags[]=fantasy")
  })

  it("should handle nested objects correctly", () => {
    const searchParams = new URLSearchParams()
    const data = { filter: { min: 10, max: 100 } }

    const result = getQueryString({ searchParams, data })

    expect(result).toBe("filter[min]=10&filter[max]=100")
  })

  it("should apply custom stringify options", () => {
    const searchParams = new URLSearchParams()
    const data = { tags: ["fiction", "fantasy"] }

    const result = getQueryString({
      searchParams,
      data,
      qsStringifyOptions: { arrayFormat: "indices" }
    })

    expect(result).toBe("tags[0]=fiction&tags[1]=fantasy")
  })

  it("should handle empty data", () => {
    const searchParams = new URLSearchParams("existing=param")
    const data = {}

    const result = getQueryString({ searchParams, data })

    expect(result).toBe("existing=param")
  })
})
