import Header from "@/app/[locale]/_components/layout/header/index"
import { render } from "@testing-library/react"

jest.mock("@/app/[locale]/_components/layout/header/featured", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-featured">Featured Component</div>
}))

jest.mock("@/app/[locale]/_components/layout/header/heading", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-heading">Heading Component</div>
}))

jest.mock("@/app/[locale]/_components/layout/header/hero", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-hero">Hero Component</div>
}))

describe("Header Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders with the correct header element", () => {
    const { container } = render(<Header />)
    const headerElement = container.firstChild as HTMLElement

    expect(headerElement.tagName).toBe("HEADER")
    expect(headerElement).toHaveClass("overflow-hidden")
  })

  it("applies custom className when provided", () => {
    const customClass = "custom-header-class"
    const { container } = render(<Header className={customClass} />)

    const headerElement = container.firstChild as HTMLElement
    expect(headerElement).toHaveClass(customClass)
    expect(headerElement).toHaveClass("overflow-hidden")
  })

  it("renders all child components", () => {
    const { getByTestId } = render(<Header />)

    expect(getByTestId("mock-heading")).toBeInTheDocument()
    expect(getByTestId("mock-featured")).toBeInTheDocument()
    expect(getByTestId("mock-hero")).toBeInTheDocument()
  })

  it("has the correct grid layout structure", () => {
    const { container } = render(<Header />)

    const gridDiv = container.querySelector(".grid")
    expect(gridDiv).toBeInTheDocument()
    expect(gridDiv).toHaveClass("grid-cols-1")
    expect(gridDiv).toHaveClass("sm:grid-cols-[1fr_2fr]")
    expect(gridDiv).toHaveClass("md:grid-cols-[2fr_1fr]")
    expect(gridDiv).toHaveClass("gap-6")
    expect(gridDiv).toHaveClass("lg:gap-8")
  })

  it("renders heading and featured components", () => {
    const { getByTestId } = render(<Header />)

    expect(getByTestId("mock-heading")).toBeInTheDocument()
    expect(getByTestId("mock-featured")).toBeInTheDocument()
  })
})
