import MarketplaceItem from "@/app/[locale]/_components/product-card"
import * as api from "@/lib/api"
import { MarketplaceItem as MarketplaceItemType } from "@/types"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

// Mock the API module
jest.mock("@/lib/api", () => ({
  toggleFavorite: jest.fn().mockResolvedValue({ success: true })
}))

describe("MarketplaceItem", () => {
  const mockItem: MarketplaceItemType = {
    id: "test-1",
    name: "Test Item",
    tier: "Legendary",
    price: 1.5,
    category: "Hat",
    theme: "Fantasy",
    imageUrl: "/test.jpg",
    isFavorite: false
  }

  const mockOnFavoriteToggle = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the item correctly", () => {
    render(
      <MarketplaceItem
        item={mockItem}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    )

    expect(screen.getByText("Test Item")).toBeInTheDocument()
    expect(screen.getByText("Legendary")).toBeInTheDocument()
    expect(screen.getByText("1.50 ETH")).toBeInTheDocument()
  })

  it("renders favorite button in the correct state", () => {
    render(
      <MarketplaceItem
        item={mockItem}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    )

    const favoriteButton = screen.getByRole("button", {
      name: /add to favorites/i
    })
    expect(favoriteButton).toBeInTheDocument()

    // Test with a favorited item
    const favoriteItem = { ...mockItem, isFavorite: true }
    render(
      <MarketplaceItem
        item={favoriteItem}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    )

    const unfavoriteButton = screen.getByRole("button", {
      name: /remove from favorites/i
    })
    expect(unfavoriteButton).toBeInTheDocument()
  })

  it("toggles favorite status when clicking the heart button", async () => {
    render(
      <MarketplaceItem
        item={mockItem}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    )

    const favoriteButton = screen.getByRole("button", {
      name: /add to favorites/i
    })

    // Click the favorite button
    fireEvent.click(favoriteButton)

    // Check that the API was called with the correct item ID
    expect(api.toggleFavorite).toHaveBeenCalledWith("test-1")

    // Check that the callback was called with the correct arguments
    await waitFor(() => {
      expect(mockOnFavoriteToggle).toHaveBeenCalledWith("test-1", true)
    })
  })

  it("handles the loading state while toggling favorite", async () => {
    // Mock a delayed API response
    jest
      .spyOn(api, "toggleFavorite")
      .mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 100)
          )
      )

    render(
      <MarketplaceItem
        item={mockItem}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    )

    const favoriteButton = screen.getByRole("button", {
      name: /add to favorites/i
    })

    // Click the favorite button
    fireEvent.click(favoriteButton)

    // The button should be disabled during the API call
    expect(favoriteButton).toBeDisabled()

    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockOnFavoriteToggle).toHaveBeenCalledWith("test-1", true)
      expect(favoriteButton).not.toBeDisabled()
    })
  })
})
