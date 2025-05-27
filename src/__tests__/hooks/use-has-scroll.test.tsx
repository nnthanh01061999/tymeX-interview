import useHasScroll from "@/hooks/use-has-scroll"
import { act, render, renderHook, screen } from "@testing-library/react"

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

describe("useHasScroll", () => {
  const originalAddEventListener = window.addEventListener
  const originalRemoveEventListener = window.removeEventListener

  beforeEach(() => {
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterEach(() => {
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
    jest.clearAllMocks()
  })

  it("should initialize with no scroll", () => {
    const { result } = renderHook(() => useHasScroll())

    expect(result.current.hasScrollLeft).toBe(false)
    expect(result.current.hasScrollRight).toBe(false)
  })

  it("should detect scroll to the right", () => {
    const TestComponent = () => {
      const { ref, hasScrollLeft, hasScrollRight } = useHasScroll()
      return (
        <div>
          <div ref={ref} data-testid="scroll-container">
            Scroll Container
          </div>
          <div data-testid="scroll-left">
            {hasScrollLeft ? "Has Left Scroll" : "No Left Scroll"}
          </div>
          <div data-testid="scroll-right">
            {hasScrollRight ? "Has Right Scroll" : "No Right Scroll"}
          </div>
        </div>
      )
    }

    render(<TestComponent />)
    const container = screen.getByTestId("scroll-container")

    Object.defineProperty(container, "scrollLeft", { value: 0 })
    Object.defineProperty(container, "clientWidth", { value: 100 })
    Object.defineProperty(container, "scrollWidth", { value: 200 })

    act(() => {
      const scrollEvent = new Event("scroll")
      container.dispatchEvent(scrollEvent)
    })

    expect(screen.getByTestId("scroll-left").textContent).toBe("No Left Scroll")
    expect(screen.getByTestId("scroll-right").textContent).toBe(
      "Has Right Scroll"
    )
  })

  it("should detect scroll to the left", () => {
    const TestComponent = () => {
      const { ref, hasScrollLeft, hasScrollRight } = useHasScroll()
      return (
        <div>
          <div ref={ref} data-testid="scroll-container">
            Scroll Container
          </div>
          <div data-testid="scroll-left">
            {hasScrollLeft ? "Has Left Scroll" : "No Left Scroll"}
          </div>
          <div data-testid="scroll-right">
            {hasScrollRight ? "Has Right Scroll" : "No Right Scroll"}
          </div>
        </div>
      )
    }

    render(<TestComponent />)
    const container = screen.getByTestId("scroll-container")

    Object.defineProperty(container, "scrollLeft", { value: 50 })
    Object.defineProperty(container, "clientWidth", { value: 100 })
    Object.defineProperty(container, "scrollWidth", { value: 200 })

    act(() => {
      const scrollEvent = new Event("scroll")
      container.dispatchEvent(scrollEvent)
    })

    expect(screen.getByTestId("scroll-left").textContent).toBe(
      "Has Left Scroll"
    )
    expect(screen.getByTestId("scroll-right").textContent).toBe(
      "Has Right Scroll"
    )
  })

  it("should detect when scroll is at the end", () => {
    const TestComponent = () => {
      const { ref, hasScrollLeft, hasScrollRight } = useHasScroll()
      return (
        <div>
          <div ref={ref} data-testid="scroll-container">
            Scroll Container
          </div>
          <div data-testid="scroll-left">
            {hasScrollLeft ? "Has Left Scroll" : "No Left Scroll"}
          </div>
          <div data-testid="scroll-right">
            {hasScrollRight ? "Has Right Scroll" : "No Right Scroll"}
          </div>
        </div>
      )
    }

    render(<TestComponent />)
    const container = screen.getByTestId("scroll-container")

    Object.defineProperty(container, "scrollLeft", { value: 95 })
    Object.defineProperty(container, "clientWidth", { value: 100 })
    Object.defineProperty(container, "scrollWidth", { value: 200 })

    act(() => {
      const scrollEvent = new Event("scroll")
      container.dispatchEvent(scrollEvent)
    })

    expect(screen.getByTestId("scroll-left").textContent).toBe(
      "Has Left Scroll"
    )
    expect(screen.getByTestId("scroll-right").textContent).toBe(
      "Has Right Scroll"
    )
  })

  it("should handle window resize", () => {
    const TestComponent = () => {
      const { ref, hasScrollLeft, hasScrollRight } = useHasScroll()
      return (
        <div>
          <div ref={ref} data-testid="scroll-container">
            Scroll Container
          </div>
          <div data-testid="scroll-left">
            {hasScrollLeft ? "Has Left Scroll" : "No Left Scroll"}
          </div>
          <div data-testid="scroll-right">
            {hasScrollRight ? "Has Right Scroll" : "No Right Scroll"}
          </div>
        </div>
      )
    }

    render(<TestComponent />)

    expect(window.addEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    )
  })
})
