import { render, screen } from "@testing-library/react";
import Home from "@/app/[locale]/page";

// Mock the components that our Home component depends on
jest.mock("@/components/MarketplaceItem", () => ({
  __esModule: true,
  default: ({ item }: { item: any }) => (
    <div data-testid="marketplace-item">{item.name}</div>
  ),
}));

jest.mock("@/components/FilterPanel", () => ({
  __esModule: true,
  default: ({
    onFilterChange,
    categories,
  }: {
    onFilterChange: any;
    categories: string[];
  }) => (
    <div data-testid="filter-panel">
      {categories.map((category) => (
        <span key={category} data-testid="category">
          {category}
        </span>
      ))}
    </div>
  ),
}));

jest.mock("@/components/MarketplaceItemSkeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="marketplace-item-skeleton"></div>,
}));

jest.mock("@/components/EmptyState", () => ({
  __esModule: true,
  default: ({ onAction }: { onAction: any }) => (
    <div data-testid="empty-state">
      <button onClick={onAction}>Reset</button>
    </div>
  ),
}));

jest.mock("@/components/ErrorState", () => ({
  __esModule: true,
  default: ({ onRetry }: { onRetry: any }) => (
    <div data-testid="error-state">
      <button onClick={onRetry}>Retry</button>
    </div>
  ),
}));

// Mock the API function
jest.mock("@/lib/api", () => ({
  fetchMarketplaceItems: jest.fn().mockResolvedValue({
    items: [
      { id: "1", name: "Item 1", tier: "Common", price: 1.0, category: "Hat" },
      { id: "2", name: "Item 2", tier: "Rare", price: 2.0, category: "Shoes" },
    ],
    total: 2,
    hasMore: false,
  }),
}));

describe("Home Page", () => {
  it("renders the hero section", () => {
    render(<Home />);

    // Test hero section content
    expect(screen.getByText("NEW")).toBeInTheDocument();
    expect(screen.getByText("ARRIVAL")).toBeInTheDocument();
    expect(screen.getByText("THE DJ")).toBeInTheDocument();
  });

  it("renders the filter panel with categories", () => {
    render(<Home />);

    // Test filter panel
    expect(screen.getByTestId("filter-panel")).toBeInTheDocument();
    const categories = screen.getAllByTestId("category");
    expect(categories.length).toBeGreaterThan(0);
  });

  it("renders the newsletter section", () => {
    render(<Home />);

    // Test newsletter section
    expect(screen.getByText("NEWSLETTER")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subscribe" })
    ).toBeInTheDocument();
  });

  it("renders the footer with navigation links", () => {
    render(<Home />);

    // Test footer section
    expect(screen.getByText("NAVIGATION")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Whitepaper")).toBeInTheDocument();
    expect(screen.getByText("Marketplace")).toBeInTheDocument();

    expect(screen.getByText("CONTACT US")).toBeInTheDocument();
    expect(screen.getByText("Discord")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
  });
});
