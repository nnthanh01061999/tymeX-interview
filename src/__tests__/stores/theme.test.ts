import { baseThemeStoreBase, useThemeStore } from "@/stores/store/theme"
import { act, renderHook } from "@testing-library/react"

describe("Theme Store", () => {
  beforeEach(() => {
    localStorage.clear()

    act(() => {
      baseThemeStoreBase.setState({ theme: "light" })
    })
  })

  it("should initialize with the default theme", () => {
    const { result } = renderHook(() => useThemeStore.use.theme())
    expect(result.current).toBe("light")
  })

  it("should update the theme", () => {
    const { result: themeResult } = renderHook(() => useThemeStore.use.theme())
    const { result: setThemeResult } = renderHook(() =>
      useThemeStore.use.setTheme()
    )

    expect(themeResult.current).toBe("light")

    act(() => {
      setThemeResult.current("dark")
    })

    expect(themeResult.current).toBe("dark")
  })

  it("should persist the theme in localStorage", () => {
    const { result: setThemeResult } = renderHook(() =>
      useThemeStore.use.setTheme()
    )

    act(() => {
      setThemeResult.current("system")
    })

    const storedState = JSON.parse(
      localStorage.getItem("theme-storage") || "{}"
    )

    expect(storedState.state.theme).toBe("system")
  })

  it("should load the persisted theme from localStorage", () => {
    localStorage.setItem(
      "theme-storage",
      JSON.stringify({
        state: { theme: "dark" },
        version: 0
      })
    )

    act(() => {
      baseThemeStoreBase.setState({ theme: "dark" })
    })

    const { result } = renderHook(() => useThemeStore.use.theme())
    expect(result.current).toBe("dark")
  })
})
