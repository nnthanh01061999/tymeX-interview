import { Option } from "@/types"
import { convertArrayToObject, formatNumber } from "@/util/format"

describe("formatNumber", () => {
  it("should format a number with default formatting", () => {
    expect(formatNumber(1000)).toBe("1,000")
    expect(formatNumber(1234567)).toBe("1,234,567")
    expect(formatNumber(1234.567)).toBe("1,234.567")
  })

  it("should return fallback value for 0 or falsy values", () => {
    expect(formatNumber(0)).toBe("")
    expect(formatNumber(0, "N/A")).toBe("N/A")
    expect(formatNumber(null as any, "N/A")).toBe("N/A")
    expect(formatNumber(undefined as any, "N/A")).toBe("N/A")
  })

  it("should format number with custom format options", () => {
    const currencyOptions: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "USD"
    }

    expect(formatNumber(1000, "", currencyOptions)).toBe("$1,000.00")

    const percentOptions: Intl.NumberFormatOptions = {
      style: "percent",
      minimumFractionDigits: 2
    }

    expect(formatNumber(0.1234, "", percentOptions)).toBe("12.34%")
  })
})

describe("convertArrayToObject", () => {
  it("should convert an array of options to an object keyed by value", () => {
    const options: Option<string, string>[] = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" }
    ]

    const result = convertArrayToObject(options)

    expect(result).toEqual({
      apple: { value: "apple", label: "Apple" },
      banana: { value: "banana", label: "Banana" },
      orange: { value: "orange", label: "Orange" }
    })
  })

  it("should handle an empty array", () => {
    const options: Option<string, string>[] = []

    const result = convertArrayToObject(options)

    expect(result).toEqual({})
  })

  it("should handle array with duplicate values by using the last one", () => {
    const options: Option<string, string>[] = [
      { value: "apple", label: "Red Apple" },
      { value: "apple", label: "Green Apple" }
    ]

    const result = convertArrayToObject(options)

    expect(result).toEqual({
      apple: { value: "apple", label: "Green Apple" }
    })
  })
})
