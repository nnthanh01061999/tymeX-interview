import Featured from "@/app/[locale]/_components/layout/header/featured"
import { render } from "@testing-library/react"

jest.mock("@/app/[locale]/_components/image-random", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-image-random">image-random</div>
}))

describe("featured", () => {
  it("should render the featured component", () => {
    const { getAllByTestId } = render(<Featured />)
    expect(getAllByTestId("mock-image-random")).toHaveLength(4)
  })
})
