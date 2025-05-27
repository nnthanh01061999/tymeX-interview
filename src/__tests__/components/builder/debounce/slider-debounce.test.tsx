import SliderDebounce from "@/components/builder/debounce/slider-debounce"
import { act, fireEvent, render, screen } from "@testing-library/react"

// Mock timer and debounce functions
jest.useFakeTimers()

// Mock the Slider component
jest.mock("@/components/ui/slider", () => ({
  Slider: (props: any) => {
    const { onValueChange, value, ...rest } = props
    return (
      <div
        data-testid="mock-slider"
        data-value={JSON.stringify(value)}
        onClick={() => onValueChange?.([50, 75])}
        {...rest}>
        <input
          type="range"
          data-testid="slider-input"
          value={Array.isArray(value) ? value[0] : 0}
          onChange={(e) => {
            const newValue = [...(Array.isArray(value) ? value : [0, 100])]
            newValue[0] = parseInt(e.target.value)
            onValueChange?.(newValue)
          }}
        />
      </div>
    )
  }
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

describe("SliderDebounce Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<SliderDebounce value={[0, 100]} />)
    expect(container).toBeInTheDocument()
  })

  it("displays the initial value correctly", () => {
    render(<SliderDebounce value={[25, 75]} />)

    const slider = screen.getByTestId("mock-slider")
    expect(slider).toHaveAttribute("data-value", JSON.stringify([25, 75]))
  })

  it("updates internal value immediately on change", () => {
    render(<SliderDebounce value={[0, 100]} onValueChange={jest.fn()} />)

    const slider = screen.getByTestId("mock-slider")
    fireEvent.click(slider) // This will trigger onValueChange with [50, 75]

    expect(slider).toHaveAttribute("data-value", JSON.stringify([50, 75]))
  })

  it("calls onValueChange after debounce time", () => {
    const onValueChangeMock = jest.fn()
    render(
      <SliderDebounce
        value={[0, 100]}
        onValueChange={onValueChangeMock}
        debounceTime={300}
      />
    )

    const slider = screen.getByTestId("mock-slider")
    fireEvent.click(slider) // This will trigger onValueChange with [50, 75]

    // onValueChange should not be called immediately
    expect(onValueChangeMock).not.toHaveBeenCalled()

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // onValueChange should be called after debounce time
    expect(onValueChangeMock).toHaveBeenCalledTimes(1)
    expect(onValueChangeMock).toHaveBeenCalledWith([50, 75])
  })

  it("uses default debounce time of 300ms when not specified", () => {
    const onValueChangeMock = jest.fn()
    render(
      <SliderDebounce value={[0, 100]} onValueChange={onValueChangeMock} />
    )

    const slider = screen.getByTestId("mock-slider")
    fireEvent.click(slider) // This will trigger onValueChange with [50, 75]

    // onValueChange should not be called before default debounce time
    act(() => {
      jest.advanceTimersByTime(299)
    })
    expect(onValueChangeMock).not.toHaveBeenCalled()

    // onValueChange should be called after default debounce time
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(onValueChangeMock).toHaveBeenCalled()
  })

  it("updates internal value when prop value changes", () => {
    const { rerender } = render(<SliderDebounce value={[0, 100]} />)

    let slider = screen.getByTestId("mock-slider")
    expect(slider).toHaveAttribute("data-value", JSON.stringify([0, 100]))

    // Update the prop value
    rerender(<SliderDebounce value={[25, 75]} />)

    slider = screen.getByTestId("mock-slider")
    expect(slider).toHaveAttribute("data-value", JSON.stringify([25, 75]))
  })

  it("passes additional props to the Slider component", () => {
    render(
      <SliderDebounce
        value={[0, 100]}
        min={0}
        max={200}
        step={10}
        className="custom-class"
        disabled
      />
    )

    const slider = screen.getByTestId("mock-slider")
    expect(slider).toHaveAttribute("class", "custom-class")
    expect(slider).toHaveAttribute("min", "0")
    expect(slider).toHaveAttribute("max", "200")
    expect(slider).toHaveAttribute("step", "10")
    expect(slider).toHaveAttribute("disabled")
  })
})
