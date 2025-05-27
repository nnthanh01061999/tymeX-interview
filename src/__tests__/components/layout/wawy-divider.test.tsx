import WavyDivider from "@/components/layout/wavy-divider"
import { render } from "@testing-library/react"

describe("WavyDivider Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<WavyDivider />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("applies the correct CSS classes", () => {
    const { container } = render(<WavyDivider />)
    const divElement = container.firstChild as HTMLElement

    expect(divElement).toHaveClass("wavy-divider")
    expect(divElement).toHaveClass("mt-16")
  })
})
