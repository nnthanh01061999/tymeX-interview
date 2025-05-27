import NumberMaskDebounce from "@/components/builder/debounce/number-mask-debounce"
import { act, fireEvent, render, screen } from "@testing-library/react"

// Mock timer and debounce functions
jest.useFakeTimers()

// Mock react-number-format
jest.mock("react-number-format", () => ({
  NumericFormat: (props: any) => {
    const { customInput: CustomInput, onValueChange, value, ...rest } = props
    return (
      <CustomInput
        data-testid="mock-numeric-format"
        value={value}
        onChange={(e: any) => {
          // Simulate the behavior of NumericFormat by calling onValueChange
          if (onValueChange) {
            onValueChange({
              value: e.target.value,
              floatValue: parseFloat(e.target.value.replace(/,/g, "")),
              formattedValue: e.target.value
            })
          }
        }}
        {...rest}
      />
    )
  }
}))

// Mock the Input component
jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => (
    <input
      data-testid="mock-input"
      {...props}
      onChange={(e: any) => props.onChange?.(e)}
    />
  )
}))

// Mock the ButtonClear component
jest.mock("@/components/ui/button-clear", () => ({
  __esModule: true,
  default: (props: any) => (
    <button data-testid="mock-button-clear" onClick={props.onClick}>
      Clear
    </button>
  )
}))

// Mock the debounce utility
jest.mock("@/util/lodash", () => ({
  debounce: (fn: (...args: any[]) => void, delay: number) => {
    return (...args: any[]) => {
      setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}))

describe("NumberMaskDebounce Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<NumberMaskDebounce onChange={jest.fn()} />)
    expect(container).toBeInTheDocument()
  })

  it("displays the initial value correctly", () => {
    render(<NumberMaskDebounce value={1234.56} onChange={jest.fn()} />)

    const input = screen.getByTestId("mock-numeric-format")
    expect(input).toHaveValue("1234.56")
  })

  it("calls onChange with parsed number after debounce time", () => {
    const onChangeMock = jest.fn()
    render(<NumberMaskDebounce onChange={onChangeMock} debounceTime={300} />)

    const input = screen.getByTestId("mock-numeric-format")
    fireEvent.change(input, { target: { value: "1234.56" } })

    // onChange should not be called immediately
    expect(onChangeMock).not.toHaveBeenCalled()

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // onChange should be called after debounce time with the parsed float value
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith(1234.56)
  })

  it("uses default debounce time of 300ms when not specified", () => {
    const onChangeMock = jest.fn()
    render(<NumberMaskDebounce onChange={onChangeMock} />)

    const input = screen.getByTestId("mock-numeric-format")
    fireEvent.change(input, { target: { value: "1234.56" } })

    // onChange should not be called before default debounce time
    act(() => {
      jest.advanceTimersByTime(299)
    })
    expect(onChangeMock).not.toHaveBeenCalled()

    // onChange should be called after default debounce time
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(onChangeMock).toHaveBeenCalled()
  })

  it("shows clear button when allowClear is true and value exists", () => {
    render(
      <NumberMaskDebounce
        value={1234.56}
        onChange={jest.fn()}
        allowClear={true}
      />
    )

    const clearButton = screen.getByTestId("mock-button-clear")
    expect(clearButton).toBeInTheDocument()
  })

  it("does not show clear button when there is no value", () => {
    render(<NumberMaskDebounce onChange={jest.fn()} allowClear={true} />)

    expect(screen.queryByTestId("mock-button-clear")).not.toBeInTheDocument()
  })

  it("does not show clear button when allowClear is false", () => {
    render(
      <NumberMaskDebounce
        value={1234.56}
        onChange={jest.fn()}
        allowClear={false}
      />
    )

    expect(screen.queryByTestId("mock-button-clear")).not.toBeInTheDocument()
  })

  it("calls onChange with undefined when clear button is clicked", () => {
    const onChangeMock = jest.fn()

    render(
      <NumberMaskDebounce
        value={1234.56}
        onChange={onChangeMock}
        allowClear={true}
      />
    )

    const clearButton = screen.getByTestId("mock-button-clear")
    fireEvent.click(clearButton)

    expect(onChangeMock).toHaveBeenCalledWith(undefined)
  })

  it("passes additional props to NumericFormat", () => {
    render(
      <NumberMaskDebounce
        onChange={jest.fn()}
        value={1234.56}
        decimalScale={2}
        prefix="$"
        className="custom-class"
        placeholder="Enter amount"
      />
    )

    const input = screen.getByTestId("mock-numeric-format")
    expect(input).toHaveAttribute("class", "custom-class")
    expect(input).toHaveAttribute("placeholder", "Enter amount")
  })
})
