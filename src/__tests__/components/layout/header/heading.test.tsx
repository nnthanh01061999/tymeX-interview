import Heading from "@/app/[locale]/_components/layout/header/heading"
import { render } from "@testing-library/react"

describe("Heading", () => {
  it("should render the heading component", () => {
    const { getByText } = render(<Heading />)
    expect(getByText("new")).toBeInTheDocument()
    expect(getByText("arrival")).toBeInTheDocument()
  })
})
