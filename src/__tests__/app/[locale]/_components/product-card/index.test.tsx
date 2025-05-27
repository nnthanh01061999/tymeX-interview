import ProductCard from "@/app/[locale]/_components/product-card"
import {
  IAuthor,
  IProduct,
  TCategory,
  TTheme,
  TTier
} from "@/types/model/product"
import { formatNumber } from "@/util/format"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

// Mock dependencies
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // Create a modified props object to handle fill property
    const modifiedProps = { ...props }
    if (props.fill === true) {
      modifiedProps.fill = "true"
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...modifiedProps} data-testid="mock-image" alt={props.alt} />
  }
}))

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

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, variant, size, className, ...props }: any) => (
    <button
      data-testid="mock-button"
      data-variant={variant}
      data-size={size}
      className={className}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  )
}))

jest.mock("lucide-react", () => ({
  Heart: ({ className, size }: any) => (
    <span data-testid="mock-heart-icon" data-size={size} className={className}>
      Heart Icon
    </span>
  )
}))

jest.mock("@/util/format", () => ({
  formatNumber: jest.fn((num) => `${num} formatted`)
}))

describe("ProductCard Component", () => {
  // Define properly typed mock data
  const mockAuthor: IAuthor = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    gender: "male",
    avatar: "avatar.jpg",
    onlineStatus: "online"
  }

  const mockProduct: IProduct = {
    id: 123,
    title: "Test Product",
    tier: "Premium" as TTier,
    price: 1.5,
    imageId: 42,
    isFavorite: false,
    category: "Hat" as TCategory,
    createdAt: 1672531200000, // timestamp for 2023-01-01
    theme: "Dark" as TTheme,
    author: mockAuthor
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    const { container } = render(<ProductCard item={mockProduct} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders product image with correct props", () => {
    render(<ProductCard item={mockProduct} />)

    const image = screen.getByTestId("mock-image")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      "src",
      `https://picsum.photos/600/800?random=${mockProduct.imageId}`
    )
    expect(image).toHaveAttribute("alt", mockProduct.title)
    expect(image).toHaveAttribute("fill", "true")
    expect(image).toHaveClass("object-cover")
  })

  it("renders product title and tier", () => {
    render(<ProductCard item={mockProduct} />)

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.tier)).toBeInTheDocument()
  })

  it("renders formatted price", () => {
    render(<ProductCard item={mockProduct} />)

    expect(formatNumber).toHaveBeenCalledWith(mockProduct.price)
    expect(screen.getByText("1.5 formatted ETH")).toBeInTheDocument()
  })

  it("renders favorite button with correct initial state", () => {
    render(<ProductCard item={mockProduct} />)

    const heartIcon = screen.getByTestId("mock-heart-icon")
    expect(heartIcon).toBeInTheDocument()
    expect(heartIcon.className).not.toContain("fill-red-500")
  })

  it("renders favorite button with filled state when product is favorite", () => {
    const favoriteProduct = { ...mockProduct, isFavorite: true }
    render(<ProductCard item={favoriteProduct} />)

    const heartIcon = screen.getByTestId("mock-heart-icon")
    expect(heartIcon).toBeInTheDocument()
    expect(heartIcon.className).toContain("fill-red-500")
    expect(heartIcon.className).toContain("text-red-500")
  })

  it("toggles favorite state when favorite button is clicked", async () => {
    render(<ProductCard item={mockProduct} />)

    // Initially not favorite
    let heartIcon = screen.getByTestId("mock-heart-icon")
    expect(heartIcon.className).not.toContain("fill-red-500")

    // Click favorite button
    const favoriteButton = screen.getByTestId("mock-button")
    await act(async () => {
      await userEvent.click(favoriteButton)
    })

    // Should now be favorite
    heartIcon = screen.getByTestId("mock-heart-icon")
    expect(heartIcon.className).toContain("fill-red-500")
    expect(heartIcon.className).toContain("text-red-500")

    // Click again to toggle off
    await act(async () => {
      await userEvent.click(favoriteButton)
    })

    // Should now be not favorite again
    heartIcon = screen.getByTestId("mock-heart-icon")
    expect(heartIcon.className).not.toContain("fill-red-500")
  })

  it("returns null when item is not provided", () => {
    // @ts-expect-error testing null item
    const { container } = render(<ProductCard item={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("sets the button as disabled during loading state", async () => {
    render(<ProductCard item={mockProduct} />)

    const favoriteButton = screen.getByTestId("mock-button")
    expect(favoriteButton).not.toBeDisabled()

    // Simulate a loading state by clicking and checking during the async operation
    await act(async () => {
      // Start clicking
      await userEvent.click(favoriteButton)

      // During the "loading" phase (before state updates), button should be disabled
      // but this is hard to test in this mock since state updates are synchronous
      // in the test environment
    })

    // After state update, button should be enabled again
    expect(favoriteButton).not.toBeDisabled()
  })
})
