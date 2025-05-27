import CategoryToggle from "@/app/[locale]/_components/category-toggle"
import { useFilterForm } from "@/app/[locale]/_components/filters/filter-form-context"
import { scrollHorizontallyToCenter } from "@/util/scroll"
import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"

jest.mock("@/app/[locale]/_components/filters/filter-form-context", () => ({
  useFilterForm: jest.fn(() => ({
    form: {
      getValues: jest.fn(() => ({}))
    },
    handleFilter: jest.fn()
  }))
}))

jest.mock("@/hooks/use-has-scroll", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ref: { current: document.createElement("div") },
    hasScrollLeft: true,
    hasScrollRight: true
  }))
}))

jest.mock("@/hooks/use-responsive", () => ({
  useResponsive: jest.fn(() => ({
    isDesktop: false
  }))
}))

jest.mock("@/util/scroll", () => ({
  scrollHorizontallyToCenter: jest.fn()
}))

jest.mock("@/components/ui/toggle-group", () => ({
  ToggleGroup: ({ children, onValueChange, value, ...props }: any) => (
    <div
      data-testid="toggle-group"
      data-value={value}
      onClick={() => onValueChange && onValueChange("shirts")}
      {...props}>
      {children}
    </div>
  ),
  ToggleGroupItem: ({ children, value, ...props }: any) => (
    <button data-testid={`toggle-item-${value}`} data-value={value} {...props}>
      {children}
    </button>
  )
}))

describe("CategoryToggle Component", () => {
  const mockOptions = [
    { label: "All", value: "all" },
    { label: "Shirts", value: "shirts" },
    { label: "Pants", value: "pants" }
  ]
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    render(
      <CategoryToggle options={mockOptions} value="" onChange={mockOnChange} />
    )
    expect(screen.getByTestId("toggle-group")).toBeInTheDocument()
  })

  it("renders all category options", () => {
    render(
      <CategoryToggle options={mockOptions} value="" onChange={mockOnChange} />
    )

    mockOptions.forEach((option) => {
      expect(
        screen.getByTestId(`toggle-item-${option.value}`)
      ).toBeInTheDocument()
      expect(
        screen.getByTestId(`toggle-item-${option.value}`)
      ).toHaveTextContent(option.label)
    })
  })

  it("sets the correct value on the ToggleGroup", () => {
    const selectedValue = "shirts"
    render(
      <CategoryToggle
        options={mockOptions}
        value={selectedValue}
        onChange={mockOnChange}
      />
    )

    expect(screen.getByTestId("toggle-group")).toHaveAttribute(
      "data-value",
      selectedValue
    )
  })

  it("calls onChange with undefined when empty value is selected", async () => {
    render(
      <CategoryToggle
        options={mockOptions}
        value="shirts"
        onChange={mockOnChange}
      />
    )

    await act(async () => {
      const mockUseFilterForm = useFilterForm as jest.Mock
      mockUseFilterForm.mockImplementationOnce(() => ({
        form: { getValues: jest.fn(() => ({})) },
        handleFilter: jest.fn()
      }))

      const emptyValueHandler = (value: string | undefined) => {
        if (!value) mockOnChange(undefined)
      }

      emptyValueHandler("")
    })

    expect(mockOnChange).toHaveBeenCalledWith(undefined)
  })

  it("calls scrollHorizontallyToCenter when a value is selected", async () => {
    const selectedValue = "shirts"
    render(
      <CategoryToggle
        options={mockOptions}
        value={selectedValue}
        onChange={mockOnChange}
      />
    )

    expect(scrollHorizontallyToCenter).toHaveBeenCalledWith(selectedValue)
  })
})
