import Content from "@/app/[locale]/_components/layout/content"
import { render } from "@testing-library/react"

jest.mock("@/app/[locale]/_components/filters/filter-form-context", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-filter-form">{children}</div>
  )
}))

jest.mock("@/app/[locale]/_components/filters/filter-panel", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-filter-panel">Filter Panel</div>
}))

jest.mock("@/app/[locale]/_components/filters/filter-sheet", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-filter-sheet">Filter Sheet</div>
}))

jest.mock("@/app/[locale]/_components/search-result", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search-result">Search Result</div>
}))

describe("Content Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Content />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders with the correct structure", () => {
    const { getByTestId } = render(<Content />)

    expect(getByTestId("mock-filter-form")).toBeInTheDocument()

    const sectionElement = getByTestId("mock-filter-form")
      .firstChild as HTMLElement
    expect(sectionElement.tagName).toBe("SECTION")
    expect(sectionElement).toHaveClass("relative")
  })

  it("applies custom className when provided", () => {
    const customClass = "custom-content-class"
    const { getByTestId } = render(<Content className={customClass} />)

    const sectionElement = getByTestId("mock-filter-form")
      .firstChild as HTMLElement
    expect(sectionElement).toHaveClass(customClass)
  })

  it("renders all child components", () => {
    const { getByTestId } = render(<Content />)

    expect(getByTestId("mock-filter-sheet")).toBeInTheDocument()
    expect(getByTestId("mock-filter-panel")).toBeInTheDocument()
    expect(getByTestId("mock-search-result")).toBeInTheDocument()
  })

  it("has filter sheet only visible on mobile", () => {
    const { container } = render(<Content />)

    const mobileFilterContainer = container.querySelector(".flex.md\\:hidden")
    expect(mobileFilterContainer).toBeInTheDocument()
    expect(
      mobileFilterContainer?.contains(
        document.querySelector('[data-testid="mock-filter-sheet"]')
      )
    ).toBe(true)
  })

  it("has filter panel only visible on desktop", () => {
    const { container } = render(<Content />)

    const desktopFilterContainer = container.querySelector(".hidden.md\\:block")
    expect(desktopFilterContainer).toBeInTheDocument()
    expect(
      desktopFilterContainer?.contains(
        document.querySelector('[data-testid="mock-filter-panel"]')
      )
    ).toBe(true)
  })

  it("has the correct grid layout structure", () => {
    const { container } = render(<Content />)

    const gridDiv = container.querySelector(".grid")
    expect(gridDiv).toBeInTheDocument()
    expect(gridDiv).toHaveClass("grid-cols-1")
    expect(gridDiv).toHaveClass("md:grid-cols-4")
    expect(gridDiv).toHaveClass("gap-8")
  })
})
