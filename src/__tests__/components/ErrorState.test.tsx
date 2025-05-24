import ErrorState from "@/app/[locale]/_components/ErrorState"
import { fireEvent, render, screen } from "@testing-library/react"

describe("ErrorState", () => {
  it("renders with default props", () => {
    render(<ErrorState />)

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(
      screen.getByText(
        "An error occurred while fetching data. Please try again."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Try again")).toBeInTheDocument()
  })

  it("renders with custom props", () => {
    const customProps = {
      title: "Custom Error",
      description: "Custom Error Description",
      actionLabel: "Custom Retry"
    }

    render(<ErrorState {...customProps} />)

    expect(screen.getByText("Custom Error")).toBeInTheDocument()
    expect(screen.getByText("Custom Error Description")).toBeInTheDocument()
    expect(screen.getByText("Custom Retry")).toBeInTheDocument()
  })

  it("calls onRetry when button is clicked", () => {
    const mockOnRetry = jest.fn()

    render(<ErrorState onRetry={mockOnRetry} />)

    const button = screen.getByText("Try again")
    fireEvent.click(button)

    expect(mockOnRetry).toHaveBeenCalledTimes(1)
  })

  it("does not render button when onRetry is not provided", () => {
    render(<ErrorState onRetry={undefined} />)

    const button = screen.queryByText("Try again")
    expect(button).not.toBeInTheDocument()
  })
})
