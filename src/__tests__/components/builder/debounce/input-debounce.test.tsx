import InputDebounce from "@/components/builder/debounce/input-debounce"
import { act, fireEvent, render, screen } from "@testing-library/react"

// Mock timer and debounce functions
jest.useFakeTimers()

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

describe("InputDebounce Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<InputDebounce />)
    expect(container).toBeInTheDocument()
  })

  it("displays the initial value correctly", () => {
    render(<InputDebounce value="initial value" />)

    const input = screen.getByTestId("mock-input")
    expect(input).toHaveValue("initial value")
  })

  it("updates internal value immediately on change", () => {
    render(<InputDebounce value="" onChange={jest.fn()} />)

    const input = screen.getByTestId("mock-input")
    fireEvent.change(input, { target: { value: "new value" } })

    expect(input).toHaveValue("new value")
  })

  it("calls onChange after debounce time", () => {
    const onChangeMock = jest.fn()
    render(
      <InputDebounce value="" onChange={onChangeMock} debounceTime={300} />
    )

    const input = screen.getByTestId("mock-input")
    fireEvent.change(input, { target: { value: "new value" } })

    // onChange should not be called immediately
    expect(onChangeMock).not.toHaveBeenCalled()

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // onChange should be called after debounce time
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock.mock.calls[0][0].target.value).toBe("new value")
  })

  it("uses default debounce time of 300ms when not specified", () => {
    const onChangeMock = jest.fn()
    render(<InputDebounce value="" onChange={onChangeMock} />)

    const input = screen.getByTestId("mock-input")
    fireEvent.change(input, { target: { value: "new value" } })

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

  it("updates internal value when prop value changes", () => {
    const { rerender } = render(<InputDebounce value="initial value" />)

    let input = screen.getByTestId("mock-input")
    expect(input).toHaveValue("initial value")

    // Update the prop value
    rerender(<InputDebounce value="updated value" />)

    input = screen.getByTestId("mock-input")
    expect(input).toHaveValue("updated value")
  })

  it("passes all props to the Input component", () => {
    render(
      <InputDebounce
        value="test"
        placeholder="Enter text"
        disabled
        className="custom-class"
        data-custom="custom-attribute"
      />
    )

    const input = screen.getByTestId("mock-input")
    expect(input).toHaveValue("test")
    expect(input).toHaveAttribute("placeholder", "Enter text")
    expect(input).toHaveAttribute("disabled")
    expect(input).toHaveAttribute("class", "custom-class")
    expect(input).toHaveAttribute("data-custom", "custom-attribute")
  })
})
