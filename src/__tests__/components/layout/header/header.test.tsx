import Header from "@/app/[locale]/_components/layout/header"
import { render } from "@testing-library/react"

jest.mock("@/app/[locale]/_components/layout/header/hero", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-hero">Hero</div>
}))

jest.mock("@/app/[locale]/_components/layout/header/featured", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-featured">Featured</div>
}))

jest.mock("@/app/[locale]/_components/layout/header/heading", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-heading">Heading</div>
}))

describe("Header", () => {
  it("should render the header component", () => {
    const { getByTestId } = render(<Header />)
    expect(getByTestId("mock-heading")).toBeInTheDocument()
    expect(getByTestId("mock-featured")).toBeInTheDocument()
    expect(getByTestId("mock-hero")).toBeInTheDocument()
  })
})
