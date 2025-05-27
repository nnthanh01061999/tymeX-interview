import { getValidatedParams } from "@/app/[locale]/util"

describe("getValidatedParams function", () => {
  it("filters out empty values", () => {
    const inputData = {
      name: "test",
      description: "",
      price: 0,
      tags: []
    }

    const result = getValidatedParams(inputData)

    expect(result).toEqual({
      name: "test",
      price: 0
    })
    expect(result).not.toHaveProperty("description")
    expect(result).not.toHaveProperty("tags")
  })

  it("transforms array values to range parameters", () => {
    const inputData = {
      name: "test",
      price: [10, 50]
    }

    const result = getValidatedParams(inputData)

    expect(result).toEqual({
      name: "test",
      price_gte: 10,
      price_lte: 50
    })
    expect(result).not.toHaveProperty("price")
  })

  it("handles empty arrays correctly", () => {
    const inputData = {
      name: "test",
      price: [],
      range: [0, 0]
    }

    const result = getValidatedParams(inputData)

    expect(result).toHaveProperty("name", "test")
    expect(result).not.toHaveProperty("price")

    if (result.hasOwnProperty("range_gte")) {
      expect(result).toEqual({
        name: "test",
        range_gte: 0,
        range_lte: 0
      })
    } else {
      expect(result).toEqual({
        name: "test"
      })
    }
  })

  it("handles category value correctly", () => {
    const inputData = {
      name: "test",
      category: "all"
    }

    const result = getValidatedParams(inputData)

    expect(result).toEqual({
      name: "test",
      category: undefined
    })
  })

  it("keeps non-'all' category value", () => {
    const inputData = {
      name: "test",
      category: "electronics"
    }

    const result = getValidatedParams(inputData)

    expect(result).toEqual({
      name: "test",
      category: "electronics"
    })
  })

  it("handles arrays with falsy but valid values", () => {
    const inputData = {
      name: "test",
      price: [0, 100]
    }

    const result = getValidatedParams(inputData)

    expect(result).toEqual({
      name: "test",
      price_gte: 0,
      price_lte: 100
    })
  })

  it("filters out arrays with all falsy values", () => {
    const inputData = {
      name: "test",

      sizes: ["", null, undefined, false, 0]
    }

    const result = getValidatedParams(inputData)

    expect(result).toEqual({
      name: "test"
    })
  })

  it("returns an empty object for empty input", () => {
    const inputData = {}

    const result = getValidatedParams(inputData)

    expect(result).toEqual({})
  })
})
