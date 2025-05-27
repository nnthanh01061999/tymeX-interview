import ClientProvider from "@/components/contexts/ClientProvider"
import { render, screen } from "@testing-library/react"

jest.mock("@/components/theme/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  )
}))

jest.mock("@/lib/react-query", () => ({
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-client-provider">{children}</div>
  )
}))

describe("ClientProvider", () => {
  it("renders ThemeProvider and QueryClientProvider with children", () => {
    render(
      <ClientProvider>
        <div data-testid="test-child">Test Content</div>
      </ClientProvider>
    )

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument()
    expect(screen.getByTestId("query-client-provider")).toBeInTheDocument()

    expect(screen.getByTestId("test-child")).toBeInTheDocument()
    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("properly nests providers in the correct order", () => {
    render(
      <ClientProvider>
        <div>Nested Content</div>
      </ClientProvider>
    )

    const themeProvider = screen.getByTestId("theme-provider")
    const queryClientProvider = screen.getByTestId("query-client-provider")

    expect(themeProvider).toContainElement(queryClientProvider)
    expect(queryClientProvider).toHaveTextContent("Nested Content")
  })
})
