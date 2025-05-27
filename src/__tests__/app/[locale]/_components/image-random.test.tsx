import ImageRandom from "@/app/[locale]/_components/image-random"
import { render } from "@testing-library/react"

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const modifiedProps = { ...props }
    if (props.fill === true) {
      modifiedProps.fill = "true"
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="Image" {...modifiedProps} data-testid="mock-image" />
  }
}))

describe("ImageRandom Component", () => {
  const originalRandom = Math.random
  beforeEach(() => {
    Math.random = jest.fn().mockReturnValue(0.5)
  })

  afterEach(() => {
    Math.random = originalRandom
  })

  it("renders without crashing", () => {
    const { container } = render(<ImageRandom />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("applies custom className when provided", () => {
    const customClass = "custom-image-class"
    const { container } = render(<ImageRandom className={customClass} />)

    const divElement = container.firstChild as HTMLElement
    expect(divElement).toHaveClass(customClass)
    expect(divElement).toHaveClass("relative")
    expect(divElement).toHaveClass("size-full")
    expect(divElement).toHaveClass("overflow-hidden")
  })

  it("renders an image with random number in src when no index is provided", () => {
    const { getByTestId } = render(<ImageRandom />)

    const imageElement = getByTestId("mock-image")
    expect(imageElement).toHaveAttribute(
      "src",
      "https://picsum.photos/600/800?random=50"
    )
    expect(imageElement).toHaveAttribute("alt", "Image 50")
  })

  it("renders an image with provided index in src when index is provided", () => {
    const index = 42
    const { getByTestId } = render(<ImageRandom index={index} />)

    const imageElement = getByTestId("mock-image")
    expect(imageElement).toHaveAttribute(
      "src",
      `https://picsum.photos/600/800?random=${index}`
    )
  })

  it("sets correct image properties", () => {
    const { getByTestId } = render(<ImageRandom />)

    const imageElement = getByTestId("mock-image")
    expect(imageElement).toHaveAttribute("fill", "true")
    expect(imageElement).toHaveAttribute(
      "sizes",
      "(max-width: 768px) 100vw, (max-width: 1024px) 20vw, 20vw"
    )
    expect(imageElement).toHaveClass("object-cover")
  })
})
