import HorizontalScrollButton from "@/app/[locale]/_components/category-toggle/horizontal-scroll-button"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, className, onClick, ...props }: any) => (
    <button
      data-testid="mock-button"
      className={className}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  )
}))

jest.mock("lucide-react", () => ({
  ChevronLeftIcon: () => <span data-testid="chevron-left-icon">Left Icon</span>,
  ChevronRightIcon: () => (
    <span data-testid="chevron-right-icon">Right Icon</span>
  )
}))

describe("HorizontalScrollButton Component", () => {
  const createMockRef = () => {
    const mockScrollTo = jest.fn()
    const mockRef = {
      current: {
        scrollTo: mockScrollTo
      }
    }
    return { mockRef, mockScrollTo }
  }

  it("renders left button correctly", () => {
    const { mockRef } = createMockRef()
    render(
      <HorizontalScrollButton
        containerRef={mockRef as any}
        direction="left"
        show={true}
      />
    )

    const button = screen.getByTestId("mock-button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("justify-start")
    expect(button).toHaveClass("-left-px")
    expect(screen.getByTestId("chevron-left-icon")).toBeInTheDocument()
  })

  it("renders right button correctly", () => {
    const { mockRef } = createMockRef()
    render(
      <HorizontalScrollButton
        containerRef={mockRef as any}
        direction="right"
        show={true}
      />
    )

    const button = screen.getByTestId("mock-button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("justify-end")
    expect(button).toHaveClass("-right-px")
    expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument()
  })

  it("doesn't render when show is false", () => {
    const { mockRef } = createMockRef()
    const { container } = render(
      <HorizontalScrollButton
        containerRef={mockRef as any}
        direction="left"
        show={false}
      />
    )

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument()
  })

  it("scrolls to the left when left button is clicked", async () => {
    const { mockRef, mockScrollTo } = createMockRef()
    render(
      <HorizontalScrollButton
        containerRef={mockRef as any}
        direction="left"
        show={true}
      />
    )

    const button = screen.getByTestId("mock-button")
    await act(async () => {
      await userEvent.click(button)
    })

    expect(mockScrollTo).toHaveBeenCalledWith({
      left: 0,
      behavior: "smooth"
    })
  })

  it("scrolls to the right when right button is clicked", async () => {
    const { mockRef, mockScrollTo } = createMockRef()
    render(
      <HorizontalScrollButton
        containerRef={mockRef as any}
        direction="right"
        show={true}
      />
    )

    const button = screen.getByTestId("mock-button")
    await act(async () => {
      await userEvent.click(button)
    })

    expect(mockScrollTo).toHaveBeenCalledWith({
      left: 1000,
      behavior: "smooth"
    })
  })

  it("applies custom className when provided", () => {
    const { mockRef } = createMockRef()
    const customClass = "custom-button-class"
    render(
      <HorizontalScrollButton
        containerRef={mockRef as any}
        direction="left"
        show={true}
        className={customClass}
      />
    )

    const button = screen.getByTestId("mock-button")
    expect(button).toHaveClass(customClass)
  })
})
