import EmptyState from "@/app/[locale]/_components/EmptyState"
import { fireEvent, render, screen } from "@testing-library/react"

describe("EmptyState", () => {
  it("renders with default props", () => {
    render(<EmptyState />)

    expect(screen.getByText("No items found")).toBeInTheDocument()
    expect(
      screen.getByText("Try adjusting your search or filter criteria.")
    ).toBeInTheDocument()
    expect(screen.getByText("Reset filters")).toBeInTheDocument()
  })

  it("renders with custom props", () => {
    const customProps = {
      title: "Custom Title",
      description: "Custom Description",
      actionLabel: "Custom Action"
    }

    render(<EmptyState {...customProps} />)

    expect(screen.getByText("Custom Title")).toBeInTheDocument()
    expect(screen.getByText("Custom Description")).toBeInTheDocument()
    expect(screen.getByText("Custom Action")).toBeInTheDocument()
  })

  it("calls onAction when button is clicked", () => {
    const mockOnAction = jest.fn()

    render(<EmptyState onAction={mockOnAction} />)

    const button = screen.getByText("Reset filters")
    fireEvent.click(button)

    expect(mockOnAction).toHaveBeenCalledTimes(1)
  })

  it("does not render button when onAction is not provided", () => {
    render(<EmptyState onAction={undefined} />)

    const button = screen.queryByText("Reset filters")
    expect(button).not.toBeInTheDocument()
  })
})
