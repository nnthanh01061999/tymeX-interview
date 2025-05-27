import ScrollToTop from "@/components/layout/scroll-to-top"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const scrollToMock = jest.fn()
window.scrollTo = scrollToMock

describe("ScrollToTop Component", () => {
  beforeEach(() => {
    scrollToMock.mockClear()

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0
    })
  })

  it("renders without crashing", () => {
    render(<ScrollToTop />)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("is hidden when page is scrolled less than threshold", () => {
    render(<ScrollToTop />)
    const button = screen.getByRole("button")

    expect(button).toHaveClass("opacity-0")
    expect(button).toHaveClass("h-0")
    expect(button).toHaveClass("w-0")
  })

  it("becomes visible when page is scrolled beyond threshold", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 400
    })

    render(<ScrollToTop />)

    fireEvent.scroll(window)

    const button = screen.getByRole("button")
    expect(button).not.toHaveClass("opacity-0")
  })

  it("scrolls to top when clicked", async () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 400
    })

    const user = userEvent.setup()
    render(<ScrollToTop />)

    fireEvent.scroll(window)

    const button = screen.getByRole("button")

    await user.click(button)

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    })
  })

  it("applies custom scrollProps when provided", async () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 400
    })

    const customScrollProps = {
      behavior: "auto" as ScrollBehavior
    }

    const user = userEvent.setup()
    render(<ScrollToTop scrollProps={customScrollProps} />)

    fireEvent.scroll(window)

    const button = screen.getByRole("button")
    await user.click(button)

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "auto"
    })
  })

  it("applies custom className when provided", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 400
    })

    render(<ScrollToTop className="custom-class" />)

    fireEvent.scroll(window)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })

  it("removes scroll event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener")

    const { unmount } = render(<ScrollToTop />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    )

    removeEventListenerSpy.mockRestore()
  })
})
