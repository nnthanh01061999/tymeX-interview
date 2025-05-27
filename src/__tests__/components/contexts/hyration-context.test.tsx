import HydrationProvider, {
  HydrationContext
} from "@/components/contexts/HydrationContext"
import { render, screen } from "@testing-library/react"
import { useContext } from "react"

describe("HydrationProvider", () => {
  it("should provide the userAgent value to children", () => {
    const TestConsumer = () => {
      const { userAgent } = useContext(HydrationContext)
      return <div data-testid="user-agent">{userAgent}</div>
    }

    render(
      <HydrationProvider userAgent="Mozilla/5.0 Test">
        <TestConsumer />
      </HydrationProvider>
    )

    expect(screen.getByTestId("user-agent").textContent).toBe(
      "Mozilla/5.0 Test"
    )
  })

  it("should render its children correctly", () => {
    render(
      <HydrationProvider userAgent="Test Agent">
        <div data-testid="child">Child Content</div>
      </HydrationProvider>
    )

    expect(screen.getByTestId("child")).toBeInTheDocument()
    expect(screen.getByTestId("child").textContent).toBe("Child Content")
  })

  it("should provide an empty string as default context value", () => {
    const TestDefaultConsumer = () => {
      const context = useContext(HydrationContext)
      return <div data-testid="default-value">{context.userAgent}</div>
    }

    render(<TestDefaultConsumer />)

    expect(screen.getByTestId("default-value").textContent).toBe("")
  })
})
