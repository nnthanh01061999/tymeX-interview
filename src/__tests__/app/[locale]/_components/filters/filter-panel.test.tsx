import { useFilterForm } from "@/app/[locale]/_components/filters/filter-form-context"
import FilterPanel from "@/app/[locale]/_components/filters/filter-panel"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

jest.mock("@/app/[locale]/_components/filters/filter-form-context", () => ({
  useFilterForm: jest.fn(() => ({
    form: {
      getValues: jest.fn(() => ({}))
    },
    handleReset: jest.fn()
  }))
}))

jest.mock("@/components/form/form-input-debounce", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-form-input" data-name={props.name}>
      Input for {props.label}
    </div>
  )
}))

jest.mock("@/components/form/form-select", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-form-select" data-name={props.name}>
      Select for {props.label}
    </div>
  )
}))

jest.mock("@/components/form/form-range", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-form-range" data-name={props.name}>
      Range for {props.label}
    </div>
  )
}))

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button
      data-testid="mock-button"
      data-variant={props.variant}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  )
}))

jest.mock("@/constants", () => ({
  TIER_OPTIONS: [
    { label: "Basic", value: "basic" },
    { label: "Premium", value: "premium" }
  ],
  THEME_OPTIONS: [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" }
  ],
  SORT_OPTIONS: [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" }
  ]
}))

describe("FilterPanel Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    const { container } = render(<FilterPanel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders all form inputs", () => {
    render(<FilterPanel />)

    expect(screen.getByTestId("mock-form-input")).toBeInTheDocument()
    expect(screen.getByTestId("mock-form-range")).toBeInTheDocument()
    expect(screen.getAllByTestId("mock-form-select").length).toBe(3)
  })

  it("renders form inputs with correct names", () => {
    render(<FilterPanel />)

    expect(screen.getByTestId("mock-form-input")).toHaveAttribute(
      "data-name",
      "q"
    )
    expect(screen.getByTestId("mock-form-range")).toHaveAttribute(
      "data-name",
      "price"
    )

    const selects = screen.getAllByTestId("mock-form-select")
    expect(selects[0]).toHaveAttribute("data-name", "tier")
    expect(selects[1]).toHaveAttribute("data-name", "theme")
    expect(selects[2]).toHaveAttribute("data-name", "sort")
  })

  it("renders reset button", () => {
    render(<FilterPanel />)

    const resetButton = screen.getByText("reset")
    expect(resetButton).toBeInTheDocument()
    expect(resetButton).toHaveAttribute("data-variant", "outline")
  })

  it("calls handleReset when reset button is clicked", async () => {
    const mockHandleReset = jest.fn()

    const mockUseFilterForm = useFilterForm as jest.Mock
    mockUseFilterForm.mockReturnValue({
      form: { getValues: jest.fn() },
      handleReset: mockHandleReset
    })

    render(<FilterPanel />)

    const resetButton = screen.getByText("reset")
    await act(async () => {
      await userEvent.click(resetButton)
    })

    expect(mockHandleReset).toHaveBeenCalled()
  })

  it("renders apply button when onApply is provided", () => {
    const mockOnApply = jest.fn()
    render(<FilterPanel onApply={mockOnApply} />)

    const applyButton = screen.getByText("apply")
    expect(applyButton).toBeInTheDocument()
  })

  it("doesn't render apply button when onApply is not provided", () => {
    render(<FilterPanel />)

    const applyButton = screen.queryByText("apply")
    expect(applyButton).not.toBeInTheDocument()
  })

  it("calls onApply when apply button is clicked", async () => {
    const mockOnApply = jest.fn()
    render(<FilterPanel onApply={mockOnApply} />)

    const applyButton = screen.getByText("apply")
    await act(async () => {
      await userEvent.click(applyButton)
    })

    expect(mockOnApply).toHaveBeenCalled()
  })

  it("prevents default form submission", async () => {
    const { container } = render(<FilterPanel />)

    const form = container.querySelector("form")
    expect(form).toBeInTheDocument()

    await act(async () => {
      form?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      )
    })

    expect(container.firstChild).toBeInTheDocument()
  })
})
