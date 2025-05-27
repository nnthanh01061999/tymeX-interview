import Hero from "@/app/[locale]/_components/layout/header/hero"
import { render } from "@testing-library/react"

jest.mock("@/app/[locale]/_components/image-random", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-image-random">image-random</div>
}))

describe("Hero", () => {
  it("should render the hero component", () => {
    const { getByTestId, getByText } = render(<Hero />)
    expect(getByTestId("mock-image-random")).toBeInTheDocument()
    expect(getByText("THE DJ")).toBeInTheDocument()
  })
})
