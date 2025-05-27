import ErrorIndicator from "@/components/indicators/empty"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("ErrorIndicator Component", () => {
  it("renders with default texts from translations", () => {
    render(<ErrorIndicator />)

    expect(screen.getByText("title")).toBeInTheDocument()
    expect(screen.getByText("description")).toBeInTheDocument()
  })

  it("renders with custom title and description", () => {
    render(
      <ErrorIndicator
        title="Custom Empty Title"
        description="Custom empty description"
      />
    )

    expect(screen.getByText("Custom Empty Title")).toBeInTheDocument()
    expect(screen.getByText("Custom empty description")).toBeInTheDocument()
  })

  it("does not render action button when no handler is provided", () => {
    render(<ErrorIndicator />)

    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("renders action button with default label when handler is provided", () => {
    const handleAction = jest.fn()
    render(<ErrorIndicator onAction={handleAction} />)

    const button = screen.getByRole("button", { name: "actionLabel" })
    expect(button).toBeInTheDocument()
  })

  it("renders action button with custom label", () => {
    const handleAction = jest.fn()
    render(<ErrorIndicator onAction={handleAction} actionLabel="Try Again" />)

    const button = screen.getByRole("button", { name: "Try Again" })
    expect(button).toBeInTheDocument()
  })

  it("calls the action handler when button is clicked", async () => {
    const handleAction = jest.fn()
    const user = userEvent.setup()

    render(<ErrorIndicator onAction={handleAction} />)

    const button = screen.getByRole("button")
    await user.click(button)

    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it("applies custom className", () => {
    const { container } = render(<ErrorIndicator className="custom-class" />)

    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass("custom-class")
  })
})
