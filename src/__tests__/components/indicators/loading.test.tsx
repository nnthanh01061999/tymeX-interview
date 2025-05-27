import Loading from "@/components/indicators/loading"
import { act, render, screen } from "@testing-library/react"

describe("Loading Component", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders without crashing", () => {
    render(<Loading loading={true} />)
    const loadingEl = screen.getByTestId("loading-spinner")
    expect(loadingEl).toBeInTheDocument()
  })

  it("is visible when loading prop is true", () => {
    render(<Loading loading={true} />)
    const loadingOverlay = screen.getByTestId("loading-overlay")
    expect(loadingOverlay).toHaveClass("opacity-100")
    expect(loadingOverlay).toHaveClass("pointer-events-auto")
    expect(loadingOverlay).toHaveClass("z-50")
  })

  it("is not visible when loading prop is false", () => {
    render(<Loading loading={false} />)

    const loadingOverlay = screen.getByTestId("loading-overlay")
    expect(loadingOverlay).toHaveClass("opacity-0")
    expect(loadingOverlay).toHaveClass("pointer-events-none")
    expect(loadingOverlay).toHaveClass("z-[-1]")
  })

  it("fades out with animation when loading changes from true to false", () => {
    const { rerender } = render(<Loading loading={true} />)

    const loadingOverlay = screen.getByTestId("loading-overlay")
    expect(loadingOverlay).toHaveClass("opacity-100")

    act(() => {
      rerender(<Loading loading={false} />)
    })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(loadingOverlay).toHaveClass("opacity-0")
    expect(loadingOverlay).toHaveClass("pointer-events-none")
  })

  it("shows spinner animation", () => {
    render(<Loading loading={true} />)
    const spinner = screen.getByTestId("loading-spinner")
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass("animate-spin")
  })

  it("has semi-transparent background overlay", () => {
    render(<Loading loading={true} />)
    const overlay = screen.getByTestId("loading-overlay")
    expect(overlay).toHaveClass("bg-background/50")
  })

  it("has proper transition classes", () => {
    render(<Loading loading={true} />)
    const overlay = screen.getByTestId("loading-overlay")
    expect(overlay).toHaveClass("transition-opacity")
    expect(overlay).toHaveClass("duration-300")
  })
})
