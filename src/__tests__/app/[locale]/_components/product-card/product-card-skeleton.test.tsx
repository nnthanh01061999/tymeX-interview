import ProductCardSkeleton from "@/app/[locale]/_components/product-card/product-card-skeleton"
import { render, screen } from "@testing-library/react"

// Mock dependencies
jest.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: any) => (
    <div data-testid="mock-card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div data-testid="mock-card-content" className={className}>
      {children}
    </div>
  ),
  CardFooter: ({ children, className }: any) => (
    <div data-testid="mock-card-footer" className={className}>
      {children}
    </div>
  )
}))

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: any) => (
    <div data-testid="mock-skeleton" className={className}>
      Skeleton
    </div>
  )
}))

describe("ProductCardSkeleton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    const { container } = render(<ProductCardSkeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders Card with correct layout classes", () => {
    render(<ProductCardSkeleton />)

    const card = screen.getByTestId("mock-card")
    expect(card).toBeInTheDocument()
    expect(card.className).toContain("h-full")
    expect(card.className).toContain("flex")
    expect(card.className).toContain("flex-col")
    expect(card.className).toContain("overflow-hidden")
  })

  it("renders image placeholder skeleton with correct dimensions", () => {
    render(<ProductCardSkeleton />)

    const skeletons = screen.getAllByTestId("mock-skeleton")
    const imageSkeleton = skeletons[0]

    expect(imageSkeleton).toBeInTheDocument()
    expect(imageSkeleton).toHaveClass("h-48")
    expect(imageSkeleton).toHaveClass("w-full")
  })

  it("renders title and category skeleton placeholders", () => {
    render(<ProductCardSkeleton />)

    const content = screen.getByTestId("mock-card-content")
    expect(content).toBeInTheDocument()
    expect(content.className).toContain("grow")

    const skeletons = screen.getAllByTestId("mock-skeleton")
    const titleSkeleton = skeletons[1]
    const categorySkeleton = skeletons[2]

    // Title skeleton
    expect(titleSkeleton).toHaveClass("h-6")
    expect(titleSkeleton).toHaveClass("w-16")

    // Category skeleton
    expect(categorySkeleton).toHaveClass("h-5")
    expect(categorySkeleton).toHaveClass("w-32")
  })

  it("renders price skeleton placeholder in footer", () => {
    render(<ProductCardSkeleton />)

    const footer = screen.getByTestId("mock-card-footer")
    expect(footer).toBeInTheDocument()

    const skeletons = screen.getAllByTestId("mock-skeleton")
    const priceSkeleton = skeletons[skeletons.length - 1]

    expect(priceSkeleton).toHaveClass("h-5")
    expect(priceSkeleton).toHaveClass("w-20")
  })

  it("renders exactly three skeleton placeholders", () => {
    render(<ProductCardSkeleton />)

    const skeletons = screen.getAllByTestId("mock-skeleton")
    expect(skeletons).toHaveLength(4)
  })
})
