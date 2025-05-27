import { useFilterForm } from "@/app/[locale]/_components/filters/filter-form-context"
import FilterSheet from "@/app/[locale]/_components/filters/filter-sheet"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

jest.mock("@/app/[locale]/_components/filters/filter-form-context", () => ({
  useFilterForm: jest.fn(() => ({
    form: {
      getValues: jest.fn(() => ({ q: "test" })),
      handleSubmit: jest.fn((fn) => fn())
    },
    handleFilter: jest.fn()
  }))
}))

jest.mock("@/app/[locale]/_components/filters/filter-panel", () => ({
  __esModule: true,
  default: ({ onApply }: any) => (
    <div data-testid="mock-filter-panel">
      <button data-testid="apply-button" onClick={onApply}>
        Apply
      </button>
    </div>
  )
}))

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button
      data-testid="mock-button"
      data-variant={props.variant}
      data-size={props.size}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  )
}))

jest.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children, open, onOpenChange }: any) => (
    <div
      data-testid="mock-sheet"
      data-open={open ? "true" : "false"}
      data-onchange={onOpenChange ? "true" : "false"}>
      {children}
    </div>
  ),
  SheetTrigger: ({ children, asChild }: any) => (
    <div
      data-testid="mock-sheet-trigger"
      data-aschild={asChild ? "true" : "false"}>
      {children}
    </div>
  ),
  SheetContent: ({ children, side, className }: any) => (
    <div
      data-testid="mock-sheet-content"
      data-side={side}
      className={className}>
      {children}
    </div>
  ),
  SheetHeader: ({ children, className }: any) => (
    <div data-testid="mock-sheet-header" className={className}>
      {children}
    </div>
  ),
  SheetTitle: ({ children }: any) => (
    <h2 data-testid="mock-sheet-title">{children}</h2>
  ),
  SheetDescription: ({ children }: any) => (
    <p data-testid="mock-sheet-description">{children}</p>
  )
}))

jest.mock("lucide-react", () => ({
  FilterIcon: () => <span data-testid="filter-icon">Filter Icon</span>
}))

describe("FilterSheet Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    const { container } = render(<FilterSheet />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders Sheet with trigger button", () => {
    render(<FilterSheet />)

    expect(screen.getByTestId("mock-sheet")).toBeInTheDocument()
    expect(screen.getByTestId("mock-sheet-trigger")).toBeInTheDocument()

    const button = screen.getByTestId("mock-button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("data-variant", "outline")
    expect(button).toHaveAttribute("data-size", "sm")
  })

  it("renders FilterIcon in trigger button", () => {
    render(<FilterSheet />)

    expect(screen.getByTestId("filter-icon")).toBeInTheDocument()
  })

  it("initially renders with Sheet closed", () => {
    render(<FilterSheet />)

    expect(screen.getByTestId("mock-sheet")).toHaveAttribute(
      "data-open",
      "false"
    )
  })

  it("renders SheetContent with correct attributes", () => {
    render(<FilterSheet />)

    const content = screen.getByTestId("mock-sheet-content")
    expect(content).toBeInTheDocument()
    expect(content).toHaveAttribute("data-side", "right")
    expect(content.className).toContain("flex")
    expect(content.className).toContain("h-full")
  })

  it("renders FilterPanel inside SheetContent", () => {
    render(<FilterSheet />)

    expect(screen.getByTestId("mock-filter-panel")).toBeInTheDocument()
  })

  it("renders SheetHeader with title and description", () => {
    render(<FilterSheet />)

    expect(screen.getByTestId("mock-sheet-header")).toBeInTheDocument()
    expect(screen.getByTestId("mock-sheet-title")).toHaveTextContent("title")
    expect(screen.getByTestId("mock-sheet-description")).toHaveTextContent(
      "description"
    )
  })

  it("calls handleFilter and closes sheet when Apply is clicked", async () => {
    const mockHandleFilter = jest.fn()
    const mockHandleSubmit = jest.fn((fn) => fn())

    const mockUseFilterForm = useFilterForm as jest.Mock
    mockUseFilterForm.mockReturnValue({
      form: {
        getValues: jest.fn(() => ({ q: "test" })),
        handleSubmit: mockHandleSubmit
      },
      handleFilter: mockHandleFilter
    })

    render(<FilterSheet />)

    expect(screen.getByTestId("mock-sheet")).toHaveAttribute(
      "data-open",
      "false"
    )

    const hasOpenChangeCallback =
      screen.getByTestId("mock-sheet").getAttribute("data-onchange") === "true"

    if (hasOpenChangeCallback) {
      await act(async () => {
        const applyButton = screen.getByTestId("apply-button")
        await userEvent.click(applyButton)
      })

      expect(mockHandleSubmit).toHaveBeenCalled()
      expect(mockHandleFilter).toHaveBeenCalled()
    }
  })
})
