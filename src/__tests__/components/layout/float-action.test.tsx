import FloatAction from "@/components/layout/float-action"
import { render } from "@testing-library/react"

jest.mock("@/components/theme/theme-toggle", () => ({
  ThemeToggle: () => <div data-testid="mock-theme-toggle">ThemeToggle</div>
}))

jest.mock("@/components/locale/locale-switch", () => ({
  LocaleSwitch: () => <div data-testid="mock-locale-switch">LocaleSwitch</div>
}))

jest.mock("@/components/layout/scroll-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-scroll-to-top">ScrollToTop</div>
}))

describe("FloatAction Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<FloatAction />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders with the correct fixed positioning classes", () => {
    const { container } = render(<FloatAction />)
    const divElement = container.firstChild as HTMLElement

    expect(divElement).toHaveClass("fixed")
    expect(divElement).toHaveClass("z-50")
    expect(divElement).toHaveClass("bottom-4")
    expect(divElement).toHaveClass("right-4")
    expect(divElement).toHaveClass("grid")
    expect(divElement).toHaveClass("gap-2")
  })

  it("renders all child components", () => {
    const { getByTestId } = render(<FloatAction />)

    expect(getByTestId("mock-theme-toggle")).toBeInTheDocument()
    expect(getByTestId("mock-locale-switch")).toBeInTheDocument()
    expect(getByTestId("mock-scroll-to-top")).toBeInTheDocument()
  })

  it("renders child components in the correct order", () => {
    const { container } = render(<FloatAction />)
    const childElements = container.firstChild?.childNodes

    expect(childElements?.[0]).toHaveAttribute(
      "data-testid",
      "mock-theme-toggle"
    )
    expect(childElements?.[1]).toHaveAttribute(
      "data-testid",
      "mock-locale-switch"
    )
    expect(childElements?.[2]).toHaveAttribute(
      "data-testid",
      "mock-scroll-to-top"
    )
  })
})
