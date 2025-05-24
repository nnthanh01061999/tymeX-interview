import MarketplaceItemSkeleton from "@/app/[locale]/_components/product-card/product-card-placeholder"
import { render } from "@testing-library/react"

describe("MarketplaceItemSkeleton", () => {
  it("renders skeleton elements", () => {
    const { container } = render(<MarketplaceItemSkeleton />)

    // Check that the skeleton elements are rendered
    const skeletonElements = container.querySelectorAll(".h-48, .h-4, .h-5")
    expect(skeletonElements.length).toBeGreaterThan(0)

    // Should render at least 3 skeleton elements (image, title, price)
    expect(skeletonElements.length).toBeGreaterThanOrEqual(3)
  })
})
