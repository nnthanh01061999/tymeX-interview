import Home from "@/app/page"
import { redirect } from "next/navigation"

jest.mock("@/i18n", () => ({
  defaultLocale: "en"
}))

jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}))

describe("Home Page", () => {
  it("should redirect to the default locale", () => {
    Home()

    expect(redirect).toHaveBeenCalledWith("/en")
  })
})
