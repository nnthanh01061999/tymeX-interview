import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useThemeStore } from "@/stores/store/theme"
import { render, screen } from "@testing-library/react"

jest.mock("@/stores/store/theme", () => {
  const mockSetTheme = jest.fn()
  const useThemeStoreMock = jest.fn(() => ({
    theme: "light",
    setTheme: mockSetTheme
  }))

  return {
    useThemeStore: useThemeStoreMock,
    Theme: jest.requireActual("@/stores/store/theme").Theme
  }
})

jest.mock("react", () => {
  const originalReact = jest.requireActual("react")
  return {
    ...originalReact,
    useState: jest.fn((initialValue: any) => {
      if (initialValue === false && !process.env.FORCE_MOUNTED) {
        return [false, jest.fn()]
      }
      return originalReact.useState(initialValue)
    })
  }
})

describe("ThemeToggle Component", () => {
  let mockThemeStore: jest.Mock
  let mockSetTheme: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockSetTheme = jest.fn()
    delete process.env.FORCE_MOUNTED

    mockThemeStore = useThemeStore as unknown as jest.Mock
    mockThemeStore.mockImplementation(() => ({
      theme: "light",
      setTheme: mockSetTheme
    }))
  })

  it("renders a placeholder when not mounted", () => {
    render(<ThemeToggle />)

    const srText = screen.getByText("Toggle theme")
    expect(srText).toHaveClass("sr-only")

    const button = document.querySelector("button")
    expect(button).toBeTruthy()
    expect(button?.innerHTML).not.toContain("lucide-sun")
    expect(button?.innerHTML).not.toContain("lucide-moon")
    expect(button?.innerHTML).not.toContain("lucide-monitor")
  })

  it("renders the correct icon for light theme when mounted", () => {
    process.env.FORCE_MOUNTED = "true"
    const useState = jest.requireMock("react").useState
    useState.mockImplementation((init: any) => {
      if (init === false) return [true, jest.fn()]
      return jest.requireActual("react").useState(init)
    })

    mockThemeStore.mockImplementation(() => ({
      theme: "light",
      setTheme: mockSetTheme
    }))

    render(<ThemeToggle />)

    const sunIcon = document.querySelector(".lucide-sun")
    expect(sunIcon).toBeInTheDocument()
  })

  it("renders the correct icon for dark theme when mounted", () => {
    process.env.FORCE_MOUNTED = "true"
    const useState = jest.requireMock("react").useState
    useState.mockImplementation((init: any) => {
      if (init === false) return [true, jest.fn()]
      return jest.requireActual("react").useState(init)
    })

    mockThemeStore.mockImplementation(() => ({
      theme: "dark",
      setTheme: mockSetTheme
    }))

    render(<ThemeToggle />)

    const moonIcon = document.querySelector(".lucide-moon")
    expect(moonIcon).toBeInTheDocument()
  })

  it("renders the correct icon for system theme when mounted", () => {
    process.env.FORCE_MOUNTED = "true"
    const useState = jest.requireMock("react").useState
    useState.mockImplementation((init: any) => {
      if (init === false) return [true, jest.fn()]
      return jest.requireActual("react").useState(init)
    })

    mockThemeStore.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme
    }))

    render(<ThemeToggle />)

    const monitorIcon = document.querySelector(".lucide-monitor")
    expect(monitorIcon).toBeInTheDocument()
  })

  afterAll(() => {
    jest.restoreAllMocks()
    delete process.env.FORCE_MOUNTED
  })
})
