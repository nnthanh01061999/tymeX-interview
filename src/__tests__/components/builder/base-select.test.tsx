import BaseSelect from "@/components/builder/base-select"
import { Option } from "@/types"
import { fireEvent, render, screen } from "@testing-library/react"

// Mock the ButtonClear component
jest.mock("@/components/ui/button-clear", () => ({
  __esModule: true,
  default: (props: any) => (
    <button
      data-testid="mock-button-clear"
      onClick={props.onClick}
      className={props.className}>
      Clear
    </button>
  )
}))

// Mock the Select components
jest.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange, value }: any) => (
    <div
      data-testid="mock-select"
      data-value={value}
      onClick={() => onValueChange?.("newValue")}>
      {children}
    </div>
  ),
  SelectContent: ({ children }: any) => (
    <div data-testid="mock-select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: any) => (
    <div data-testid="mock-select-item" data-value={value}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: any) => (
    <div data-testid="mock-select-trigger">{children}</div>
  ),
  SelectValue: ({ placeholder }: any) => (
    <div data-testid="mock-select-value" data-placeholder={placeholder}>
      SelectValue
    </div>
  )
}))

describe("BaseSelect Component", () => {
  const mockOptions: Option<string, React.ReactNode>[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ]

  it("renders without crashing", () => {
    const { container } = render(
      <BaseSelect options={mockOptions} placeholder="Select an option" />
    )
    expect(container).toBeInTheDocument()
  })

  it("renders with the correct placeholder", () => {
    render(<BaseSelect options={mockOptions} placeholder="Select an option" />)

    const selectValue = screen.getByTestId("mock-select-value")
    expect(selectValue).toHaveAttribute("data-placeholder", "Select an option")
  })

  it("renders all options correctly", () => {
    render(<BaseSelect options={mockOptions} placeholder="Select an option" />)

    const selectItems = screen.getAllByTestId("mock-select-item")
    expect(selectItems).toHaveLength(3)

    expect(selectItems[0]).toHaveAttribute("data-value", "option1")
    expect(selectItems[0]).toHaveTextContent("Option 1")

    expect(selectItems[1]).toHaveAttribute("data-value", "option2")
    expect(selectItems[1]).toHaveTextContent("Option 2")

    expect(selectItems[2]).toHaveAttribute("data-value", "option3")
    expect(selectItems[2]).toHaveTextContent("Option 3")
  })

  it("shows clear button when there is a selected value", () => {
    render(
      <BaseSelect
        options={mockOptions}
        value="option1"
        onValueChange={jest.fn()}
      />
    )

    const clearButton = screen.getByTestId("mock-button-clear")
    expect(clearButton).toBeInTheDocument()
  })

  it("does not show clear button when there is no value", () => {
    render(
      <BaseSelect options={mockOptions} value="" onValueChange={jest.fn()} />
    )

    expect(screen.queryByTestId("mock-button-clear")).not.toBeInTheDocument()
  })

  it("does not show clear button when allowClear is false", () => {
    render(
      <BaseSelect
        options={mockOptions}
        value="option1"
        allowClear={false}
        onValueChange={jest.fn()}
      />
    )

    expect(screen.queryByTestId("mock-button-clear")).not.toBeInTheDocument()
  })

  it("calls onValueChange with empty string when clear button is clicked", () => {
    const onValueChangeMock = jest.fn()

    render(
      <BaseSelect
        options={mockOptions}
        value="option1"
        onValueChange={onValueChangeMock}
      />
    )

    const clearButton = screen.getByTestId("mock-button-clear")
    fireEvent.click(clearButton)

    expect(onValueChangeMock).toHaveBeenCalledWith("")
  })
})
