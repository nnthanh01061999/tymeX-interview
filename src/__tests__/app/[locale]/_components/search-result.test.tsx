import { useFilterForm } from "@/app/[locale]/_components/filters/filter-form-context"
import SearchResult from "@/app/[locale]/_components/search-result"
import useProducts from "@/app/[locale]/hooks/use-search-products"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

jest.mock("@/app/[locale]/_components/filters/filter-form-context", () => ({
  useFilterForm: jest.fn()
}))

jest.mock("@/app/[locale]/hooks/use-search-products", () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock("@/app/[locale]/_components/category-toggle/form-category", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-form-category">Form Category Component</div>
  )
}))

jest.mock("@/app/[locale]/_components/product-card", () => ({
  __esModule: true,
  default: ({ item }: any) => (
    <div data-testid={`product-${item.id}`}>Product {item.id}</div>
  )
}))

jest.mock(
  "@/app/[locale]/_components/product-card/product-card-skeleton",
  () => ({
    __esModule: true,
    default: () => <div data-testid="product-skeleton">Product Skeleton</div>
  })
)

jest.mock("@/components/indicators/empty", () => ({
  __esModule: true,
  default: ({ onAction }: any) => (
    <div data-testid="empty-indicator">
      <button data-testid="empty-action" onClick={onAction}>
        Try Again
      </button>
    </div>
  )
}))

jest.mock("@/components/indicators/error", () => ({
  __esModule: true,
  default: ({ onRetry }: any) => (
    <div data-testid="error-indicator">
      <button data-testid="error-retry" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}))

jest.mock("@/components/indicators/loading", () => ({
  __esModule: true,
  default: ({ loading }: any) => (
    <div
      data-testid="loading-indicator"
      data-loading={loading ? "true" : "false"}>
      Loading Indicator
    </div>
  )
}))

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, loading }: any) => (
    <button
      data-testid="view-more-button"
      data-loading={loading ? "true" : "false"}
      onClick={onClick}>
      {children}
    </button>
  )
}))

describe("SearchResult Component", () => {
  const mockHandleReset = jest.fn()
  const mockFetchNextPage = jest.fn()
  const mockForm = { test: "form" }

  beforeEach(() => {
    jest.clearAllMocks()

    const mockUseFilterForm = useFilterForm as jest.Mock
    mockUseFilterForm.mockReturnValue({
      form: mockForm,
      handleReset: mockHandleReset
    })

    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: [],
      isPending: false,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })
  })

  it("renders without crashing", () => {
    const { container } = render(<SearchResult />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders FormCategory component", () => {
    render(<SearchResult />)
    expect(screen.getByTestId("mock-form-category")).toBeInTheDocument()
  })

  it("renders loading indicator", () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: [],
      isPending: true,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    const loadingIndicator = screen.getByTestId("loading-indicator")
    expect(loadingIndicator).toBeInTheDocument()
    expect(loadingIndicator).toHaveAttribute("data-loading", "true")
  })

  it("renders error indicator when there is an error", () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: [],
      isPending: false,
      isFetchingNextPage: false,
      isError: true,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    expect(screen.getByTestId("error-indicator")).toBeInTheDocument()
  })

  it("calls handleReset when error retry button is clicked", async () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: [],
      isPending: false,
      isFetchingNextPage: false,
      isError: true,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    const retryButton = screen.getByTestId("error-retry")
    await act(async () => {
      await userEvent.click(retryButton)
    })

    expect(mockHandleReset).toHaveBeenCalled()
  })

  it("renders empty indicator when there are no items", () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: [],
      isPending: false,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    expect(screen.getByTestId("empty-indicator")).toBeInTheDocument()
  })

  it("calls handleReset when empty action button is clicked", async () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: [],
      isPending: false,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    const actionButton = screen.getByTestId("empty-action")
    await act(async () => {
      await userEvent.click(actionButton)
    })

    expect(mockHandleReset).toHaveBeenCalled()
  })

  it("renders product skeletons when loading", () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: [],
      isPending: true,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    const skeletons = screen.getAllByTestId("product-skeleton")
    expect(skeletons.length).toBe(8)
  })

  it("renders products when items are available", () => {
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
      { id: 3, title: "Product 3" }
    ]

    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: mockProducts,
      isPending: false,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    mockProducts.forEach((product) => {
      expect(screen.getByTestId(`product-${product.id}`)).toBeInTheDocument()
    })
  })

  it("renders View More button when hasNextPage is true", () => {
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" }
    ]

    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: mockProducts,
      isPending: false,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    expect(screen.getByTestId("view-more-button")).toBeInTheDocument()
  })

  it("doesn't render View More button when hasNextPage is false", () => {
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" }
    ]

    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: mockProducts,
      isPending: false,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    expect(screen.queryByTestId("view-more-button")).not.toBeInTheDocument()
  })

  it("calls fetchNextPage when View More button is clicked", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" }
    ]

    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: mockProducts,
      isPending: false,
      isFetchingNextPage: false,
      isError: false,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    const viewMoreButton = screen.getByTestId("view-more-button")
    await act(async () => {
      await userEvent.click(viewMoreButton)
    })

    expect(mockFetchNextPage).toHaveBeenCalled()
  })

  it("shows loading state in View More button", () => {
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" }
    ]

    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      items: mockProducts,
      isPending: false,
      isFetchingNextPage: true,
      isError: false,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage
    })

    render(<SearchResult />)

    const viewMoreButton = screen.getByTestId("view-more-button")
    expect(viewMoreButton).toHaveAttribute("data-loading", "true")
  })
})
