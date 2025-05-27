import BaseImage from "@/components/ui/base-image"
import { fireEvent, render, screen } from "@testing-library/react"

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="mock-image" {...props} data-testid="mock-image" />
  }
}))

describe("BaseImage Component", () => {
  it("renders an image correctly", () => {
    render(
      <BaseImage
        src="/test-image.jpg"
        alt="Test image"
        width={200}
        height={200}
        data-testid="test-image"
      />
    )

    const image = screen.getByTestId("mock-image")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", "/test-image.jpg")
    expect(image).toHaveAttribute("alt", "Test image")
  })

  it("shows fallback image when main image fails to load", () => {
    render(
      <BaseImage
        src="/test-image.jpg"
        fallbackSrc="/fallback-image.jpg"
        alt="Test image"
        width={200}
        height={200}
      />
    )

    const image = screen.getByTestId("mock-image")
    fireEvent.error(image)

    expect(image).toHaveAttribute("src", "/fallback-image.jpg")
  })

  it("shows fallback element when image fails and no fallbackSrc is provided", () => {
    const fallbackElement = (
      <div data-testid="fallback-element">Fallback content</div>
    )

    render(
      <BaseImage
        src="/test-image.jpg"
        alt="Test image"
        fallbackElement={fallbackElement}
        width={200}
        height={200}
      />
    )

    const image = screen.getByTestId("mock-image")
    fireEvent.error(image)

    expect(screen.queryByTestId("mock-image")).not.toBeInTheDocument()
    expect(screen.getByTestId("fallback-element")).toBeInTheDocument()
    expect(screen.getByText("Fallback content")).toBeInTheDocument()
  })

  it("calls onImageError callback when image fails to load", () => {
    const onImageErrorMock = jest.fn()

    render(
      <BaseImage
        src="/test-image.jpg"
        alt="Test image"
        width={200}
        height={200}
        onImageError={onImageErrorMock}
      />
    )

    const image = screen.getByTestId("mock-image")
    fireEvent.error(image)

    expect(onImageErrorMock).toHaveBeenCalledTimes(1)
  })

  it("applies custom class names correctly", () => {
    render(
      <BaseImage
        src="/test-image.jpg"
        alt="Test image"
        width={200}
        height={200}
        className="custom-image-class"
        containerClassName="custom-container-class"
      />
    )

    const container = screen.getByTestId("mock-image").parentElement
    const image = screen.getByTestId("mock-image")

    expect(container).toHaveClass("custom-container-class")
    expect(image).toHaveClass("custom-image-class")
  })
})
