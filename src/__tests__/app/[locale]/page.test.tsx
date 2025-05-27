import Home from "@/app/[locale]/page"
import { render } from "@testing-library/react"

jest.mock("@/app/[locale]/_components/layout/header", () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div data-testid="mock-header" className={className}>
      Header Component
    </div>
  )
}))

jest.mock("@/app/[locale]/_components/layout/content", () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div data-testid="mock-content" className={className}>
      Content Component
    </div>
  )
}))

jest.mock("@/components/layout/footer", () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <div data-testid="mock-footer" className={className}>
      Footer Component
    </div>
  )
}))

jest.mock("@/components/layout/zig-zag-divider", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-zig-zag-divider">ZigZag Divider</div>
}))

jest.mock("@/components/ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <div data-testid="mock-separator" className={className}>
      Separator
    </div>
  )
}))

describe("Home Page Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders with the correct main structure", () => {
    const { container } = render(<Home />)
    const mainElement = container.firstChild as HTMLElement

    expect(mainElement.tagName).toBe("MAIN")
    expect(mainElement).toHaveClass("flex")
    expect(mainElement).toHaveClass("min-h-screen")
    expect(mainElement).toHaveClass("flex-col")
    expect(mainElement).toHaveClass("bg-background")
  })

  it("renders all child components", () => {
    const { getByTestId } = render(<Home />)

    expect(getByTestId("mock-header")).toBeInTheDocument()
    expect(getByTestId("mock-separator")).toBeInTheDocument()
    expect(getByTestId("mock-content")).toBeInTheDocument()
    expect(getByTestId("mock-zig-zag-divider")).toBeInTheDocument()
    expect(getByTestId("mock-footer")).toBeInTheDocument()
  })

  it("applies correct container classes to components", () => {
    const { getByTestId } = render(<Home />)

    const header = getByTestId("mock-header")
    expect(header.className).toContain("container")
    expect(header.className).toContain("mx-auto")

    const content = getByTestId("mock-content")
    expect(content.className).toContain("container")
    expect(content.className).toContain("mx-auto")

    const footer = getByTestId("mock-footer")
    expect(footer.className).toContain("container")
    expect(footer.className).toContain("mx-auto")
  })

  it("applies opacity class to separator", () => {
    const { getByTestId } = render(<Home />)

    const separator = getByTestId("mock-separator")
    expect(separator.className).toContain("opacity-70")
  })
})
