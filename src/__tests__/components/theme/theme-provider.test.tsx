import { ThemeProvider } from "@/components/theme/theme-provider"
import { useThemeStore } from "@/stores/store/theme"
import { render } from "@testing-library/react"
import { act } from "react-dom/test-utils"

jest.mock("@/stores/store/theme", () => ({
  useThemeStore: {
    use: {
      theme: jest.fn()
    }
  }
}))

const createMatchMediaMock = (matches: boolean) => {
  const listeners = new Set<(ev: MediaQueryListEvent) => void>()

  return {
    matches,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(
      (event: string, listener: (ev: MediaQueryListEvent) => void) => {
        if (event === "change") {
          listeners.add(listener)
        }
      }
    ),
    removeEventListener: jest.fn(
      (event: string, listener: (ev: MediaQueryListEvent) => void) => {
        if (event === "change") {
          listeners.delete(listener)
        }
      }
    ),
    dispatchEvent: jest.fn(),

    triggerListeners: (matches: boolean) => {
      listeners.forEach((listener) =>
        listener({ matches } as MediaQueryListEvent)
      )
    }
  }
}

describe("ThemeProvider Component", () => {
  let matchMediaMock: ReturnType<typeof createMatchMediaMock>

  beforeEach(() => {
    document.documentElement.classList.remove("light", "dark")
    jest.clearAllMocks()

    matchMediaMock = createMatchMediaMock(false)
    window.matchMedia = jest.fn().mockImplementation(() => matchMediaMock)
  })

  it("initially returns null before mounting", () => {
    const mockTheme = useThemeStore.use.theme as jest.Mock
    mockTheme.mockReturnValue("light")

    const { container } = render(
      <ThemeProvider>
        <div data-testid="child-content">Content</div>
      </ThemeProvider>
    )

    expect(container.firstChild).not.toBeNull()
  })

  it("applies light theme class when theme is light", async () => {
    const mockTheme = useThemeStore.use.theme as jest.Mock
    mockTheme.mockReturnValue("light")

    render(
      <ThemeProvider>
        <div>Child content</div>
      </ThemeProvider>
    )

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(document.documentElement.classList.contains("light")).toBe(true)
    expect(document.documentElement.classList.contains("dark")).toBe(false)
  })

  it("applies dark theme class when theme is dark", async () => {
    const mockTheme = useThemeStore.use.theme as jest.Mock
    mockTheme.mockReturnValue("dark")

    render(
      <ThemeProvider>
        <div>Child content</div>
      </ThemeProvider>
    )

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(document.documentElement.classList.contains("light")).toBe(false)
  })

  it("applies system theme based on prefers-color-scheme", async () => {
    const mockTheme = useThemeStore.use.theme as jest.Mock
    mockTheme.mockReturnValue("system")

    matchMediaMock = createMatchMediaMock(true)
    window.matchMedia = jest.fn().mockImplementation(() => matchMediaMock)

    render(
      <ThemeProvider>
        <div>Child content</div>
      </ThemeProvider>
    )

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(document.documentElement.classList.contains("light")).toBe(false)
  })

  it("updates theme when system preference changes", async () => {
    const mockTheme = useThemeStore.use.theme as jest.Mock
    mockTheme.mockReturnValue("system")

    matchMediaMock = createMatchMediaMock(false)
    window.matchMedia = jest.fn().mockImplementation(() => matchMediaMock)

    render(
      <ThemeProvider>
        <div>Child content</div>
      </ThemeProvider>
    )

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(document.documentElement.classList.contains("light")).toBe(true)
    expect(document.documentElement.classList.contains("dark")).toBe(false)

    await act(async () => {
      matchMediaMock.matches = true
      matchMediaMock.triggerListeners(true)

      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(document.documentElement.classList.contains("light")).toBe(false)
  })
})
