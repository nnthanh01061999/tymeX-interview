import FilterPanel from "@/app/[locale]/_components/filter-panel"
import { Category } from "@/types"
import { fireEvent, render, screen } from "@testing-library/react"

// Use a simpler set of categories for testing
const mockCategories: Category[] = ["All", "Hat", "Shoes"]
const mockOnFilterChange = jest.fn()

describe("FilterPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the search input and category buttons", () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    // Check for search input
    const searchInput = screen.getByPlaceholderText("Search")
    expect(searchInput).toBeInTheDocument()

    // Check for category buttons
    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it("calls onFilterChange when search value changes", () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    const searchInput = screen.getByPlaceholderText("Search")
    fireEvent.change(searchInput, { target: { value: "test query" } })

    // Check that onFilterChange was called with the correct search value
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "test query"
      })
    )
  })

  it("calls onFilterChange when a category is selected", () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    const hatButton = screen.getByText("Hat")
    fireEvent.click(hatButton)

    // Check that onFilterChange was called with the correct category
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        category: "Hat"
      })
    )
  })

  it("renders the Reset Filter button", () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    const resetButton = screen.getByText("Reset Filter")
    expect(resetButton).toBeInTheDocument()
  })

  it("resets filters when reset button is clicked", () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    // First set a filter
    const hatButton = screen.getByText("Hat")
    fireEvent.click(hatButton)
    mockOnFilterChange.mockClear()

    // Click reset
    const resetButton = screen.getByText("Reset Filter")
    fireEvent.click(resetButton)

    // Check that onFilterChange was called with reset values
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "",
        priceRange: expect.any(Array)
      })
    )
  })
})
