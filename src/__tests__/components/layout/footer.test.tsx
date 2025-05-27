import Footer from "@/components/layout/footer"
import { render, screen } from "@testing-library/react"

jest.mock("@/i18n/navigation", () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  )
}))

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />)
    expect(screen.getByText("Navigation")).toBeInTheDocument()
    expect(screen.getByText("Contact Us")).toBeInTheDocument()
    expect(screen.getByText("NEWSLETTER")).toBeInTheDocument()
  })

  it("renders navigation links correctly", () => {
    render(<Footer />)

    const navLinks = ["Home", "Whitepaper", "Marketplace", "About"]
    navLinks.forEach((linkText) => {
      expect(screen.getByText(linkText)).toBeInTheDocument()
    })
  })

  it("renders contact links correctly", () => {
    render(<Footer />)

    const contactLinks = ["Facebook", "Email", "Twitter", "Instagram"]
    contactLinks.forEach((linkText) => {
      expect(screen.getByText(linkText)).toBeInTheDocument()
    })
  })

  it("renders newsletter form", () => {
    render(<Footer />)

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument()
    expect(screen.getByText("Subscribe")).toBeInTheDocument()
  })

  it("applies custom className when provided", () => {
    const customClass = "custom-footer-class"
    const { container } = render(<Footer className={customClass} />)

    const footerElement = container.firstChild as HTMLElement
    expect(footerElement).toHaveClass(customClass)
  })

  it("renders the expected number of navigation links", () => {
    render(<Footer />)

    const navSection = screen.getByText("Navigation").closest("div")
    const navLinks = navSection?.querySelectorAll("li")
    expect(navLinks?.length).toBe(4)
  })

  it("renders the expected number of contact links", () => {
    render(<Footer />)

    const contactSection = screen.getByText("Contact Us").closest("div")
    const contactLinks = contactSection?.querySelectorAll("li")
    expect(contactLinks?.length).toBe(4)
  })
})
