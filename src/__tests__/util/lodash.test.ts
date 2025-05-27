import { cleanObject, debounce, isEmpty } from "@/util/lodash"

describe("debounce", () => {
  jest.useFakeTimers()

  it("should debounce function calls", () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it("should pass arguments to the debounced function", () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn("arg1", "arg2")

    jest.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2")
  })

  it("should cancel previous timer when called again", () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()

    jest.advanceTimersByTime(50)

    debouncedFn()

    jest.advanceTimersByTime(50)

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(50)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it("should handle edge cases", () => {
    const debouncedFn1 = debounce(undefined, 100)
    expect(() => debouncedFn1()).not.toThrow()

    const mockFn = jest.fn()
    const debouncedFn2 = debounce(mockFn, undefined)
    debouncedFn2()
    expect(mockFn).not.toHaveBeenCalled()
  })
})

describe("isEmpty", () => {
  it("should return true for null and undefined", () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it("should return true for empty strings and arrays", () => {
    expect(isEmpty("")).toBe(true)
    expect(isEmpty([])).toBe(true)
  })

  it("should return false for non-empty strings and arrays", () => {
    expect(isEmpty("text")).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  it("should return true for empty objects", () => {
    expect(isEmpty({})).toBe(true)
  })

  it("should return false for non-empty objects", () => {
    expect(isEmpty({ key: "value" })).toBe(false)
  })

  it("should return false for dates, maps, and sets", () => {
    expect(isEmpty(new Date())).toBe(false)
    expect(isEmpty(new Map())).toBe(false)
    expect(isEmpty(new Set())).toBe(false)
  })

  it("should handle nested objects correctly", () => {
    expect(isEmpty({ outer: { inner: {} } })).toBe(true)
    expect(isEmpty({ outer: { inner: { value: 1 } } })).toBe(false)
  })
})

describe("cleanObject", () => {
  it("should remove empty values from objects", () => {
    const obj = {
      name: "John",
      age: 30,
      address: "",
      phone: null,
      email: undefined,
      tags: []
    }

    const cleaned = cleanObject({ ...obj })

    expect(cleaned).toEqual({
      name: "John",
      age: 30
    })
  })

  it("should handle nested objects", () => {
    const obj = {
      user: {
        name: "John",
        settings: {
          theme: "",
          notifications: null
        }
      }
    }

    const cleaned = cleanObject({ ...obj })

    expect(cleaned).toEqual({
      user: {
        name: "John"
      }
    })
  })

  it("should handle arrays", () => {
    const obj = {
      items: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "" },
        { id: 3, value: null }
      ]
    }

    const cleaned = cleanObject({ ...obj })

    expect(cleaned).toEqual({
      items: [{ id: 1, name: "Item 1" }, { id: 2 }, { id: 3 }]
    })
  })

  it("should preserve Date objects", () => {
    const date = new Date()
    const obj = {
      created: date,
      updated: null
    }

    const cleaned = cleanObject({ ...obj })

    expect(cleaned).toEqual({
      created: date
    })
  })
})
