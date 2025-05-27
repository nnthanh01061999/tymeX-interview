import { LocaleSwitch } from "@/components/locale/locale-switch"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("next-intl", () => ({
  useLocale: jest.fn().mockImplementation(() => "en")
}))

jest.mock("@/i18n/navigation", () => ({
  usePathname: jest.fn().mockImplementation(() => "/some-path"),
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn()
  }))
}))

jest.mock("@/i18n", () => ({
  locales: ["en", "vi"]
}))

describe("LocaleSwitch Component", () => {
  it("renders the language switcher button", () => {
    render(<LocaleSwitch />)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()

    const globe = document.querySelector(".lucide-globe")
    expect(globe).toBeInTheDocument()

    const srOnlyLabel = screen.getByText("Switch language")
    expect(srOnlyLabel).toBeInTheDocument()
    expect(srOnlyLabel).toHaveClass("sr-only")
  })

  it("shows dropdown menu with locale options when clicked", async () => {
    const user = userEvent.setup()
    render(<LocaleSwitch />)

    const button = screen.getByRole("button")
    await user.click(button)

    const englishOption = screen.getByText("English")
    const vietnameseOption = screen.getByText("Tiếng Việt")

    expect(englishOption).toBeInTheDocument()
    expect(vietnameseOption).toBeInTheDocument()
  })

  it("highlights the current locale", async () => {
    const user = userEvent.setup()
    render(<LocaleSwitch />)

    await user.click(screen.getByRole("button"))

    const englishItem = screen.getByText("English").closest('[role="menuitem"]')
    expect(englishItem).toHaveClass("bg-muted")
    expect(englishItem).toHaveClass("font-medium")

    const vietnameseItem = screen
      .getByText("Tiếng Việt")
      .closest('[role="menuitem"]')
    expect(vietnameseItem).not.toHaveClass("bg-muted")
    expect(vietnameseItem).not.toHaveClass("font-medium")
  })

  it("calls router.replace with correct path and locale when a locale is selected", async () => {
    const replaceMock = jest.fn()
    const useRouterMock = jest.requireMock("@/i18n/navigation").useRouter
    useRouterMock.mockImplementation(() => ({
      replace: replaceMock
    }))

    const user = userEvent.setup()
    render(<LocaleSwitch />)

    await user.click(screen.getByRole("button"))

    await user.click(screen.getByText("Tiếng Việt"))

    expect(replaceMock).toHaveBeenCalledWith("/some-path", { locale: "vi" })
  })

  it("handles different current locales correctly", async () => {
    const useLocaleMock = jest.requireMock("next-intl").useLocale
    useLocaleMock.mockImplementation(() => "vi")

    const user = userEvent.setup()
    render(<LocaleSwitch />)

    await user.click(screen.getByRole("button"))

    const vietnameseItem = screen
      .getByText("Tiếng Việt")
      .closest('[role="menuitem"]')
    expect(vietnameseItem).toHaveClass("bg-muted")
    expect(vietnameseItem).toHaveClass("font-medium")

    const englishItem = screen.getByText("English").closest('[role="menuitem"]')
    expect(englishItem).not.toHaveClass("bg-muted")
    expect(englishItem).not.toHaveClass("font-medium")
  })
})
