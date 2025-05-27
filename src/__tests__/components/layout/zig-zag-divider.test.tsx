import ZigZagDivider from "@/components/layout/zig-zag-divider"
import { render } from "@testing-library/react"

describe("ZigZagDivider Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<ZigZagDivider />)
    const svgElement = container.querySelector("svg")
    expect(svgElement).toBeInTheDocument()
  })

  it("applies the default classes", () => {
    const { container } = render(<ZigZagDivider />)
    const divElement = container.firstChild as HTMLElement

    expect(divElement).toHaveClass("relative")
    expect(divElement).toHaveClass("w-full")
    expect(divElement).toHaveClass("overflow-hidden")
    expect(divElement).toHaveClass("leading-none")
  })

  it("applies custom className when provided", () => {
    const customClass = "custom-divider-class"
    const { container } = render(<ZigZagDivider className={customClass} />)

    const divElement = container.firstChild as HTMLElement
    expect(divElement).toHaveClass(customClass)
  })

  it("contains an SVG element with the correct dimensions", () => {
    const { container } = render(<ZigZagDivider />)

    const svgElement = container.querySelector("svg")
    expect(svgElement).toHaveAttribute("viewBox", "0 0 1440 100")
    expect(svgElement).toHaveClass("w-full")
    expect(svgElement).toHaveClass("h-[100px]")
  })

  it("contains a path element with the correct attributes", () => {
    const { container } = render(<ZigZagDivider />)

    const pathElement = container.querySelector("path")
    expect(pathElement).toBeInTheDocument()
    expect(pathElement).toHaveAttribute("fill", "currentColor")
    expect(pathElement).toHaveClass("text-muted")
  })
})
