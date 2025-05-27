import { HydrationContext } from "@/components/contexts/HydrationContext"
import { useResponsive } from "@/hooks/use-responsive"
import { act, renderHook } from "@testing-library/react"
import React from "react"

const mockWindowInnerWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width
  })
}

const mockResizeEvent = () => {
  window.dispatchEvent(new Event("resize"))
}

describe("useResponsive", () => {
  const originalInnerWidth = window.innerWidth

  afterEach(() => {
    mockWindowInnerWidth(originalInnerWidth)
    jest.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <HydrationContext.Provider value={{ userAgent: "" }}>
      {children}
    </HydrationContext.Provider>
  )

  it("should detect mobile device based on window width", () => {
    mockWindowInnerWidth(500)

    const { result } = renderHook(() => useResponsive(), { wrapper })

    act(() => {
      mockResizeEvent()
    })

    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isDesktop).toBe(false)
    expect(result.current.isClient).toBe(true)
  })

  it("should detect desktop device based on window width", () => {
    mockWindowInnerWidth(1024)

    const { result } = renderHook(() => useResponsive(), { wrapper })

    act(() => {
      mockResizeEvent()
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isClient).toBe(true)
  })

  it("should detect tablet device based on window width", () => {
    mockWindowInnerWidth(768)

    const { result } = renderHook(() => useResponsive(), { wrapper })

    act(() => {
      mockResizeEvent()
    })

    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isDesktop).toBe(false)
    expect(result.current.isClient).toBe(true)
  })

  it("should initialize with user agent string for iPhone", () => {
    const mobileWrapper = ({ children }: { children: React.ReactNode }) => (
      <HydrationContext.Provider value={{ userAgent: "iPhone" }}>
        {children}
      </HydrationContext.Provider>
    )

    const { result } = renderHook(() => useResponsive(), {
      wrapper: mobileWrapper
    })

    expect(result.current.isClient).toBe(true)
  })

  it("should initialize with user agent string for iPad", () => {
    const tabletWrapper = ({ children }: { children: React.ReactNode }) => (
      <HydrationContext.Provider value={{ userAgent: "iPad" }}>
        {children}
      </HydrationContext.Provider>
    )

    const { result } = renderHook(() => useResponsive(), {
      wrapper: tabletWrapper
    })

    expect(result.current.isClient).toBe(true)
  })

  it("should initialize with user agent string for desktop browser", () => {
    const desktopWrapper = ({ children }: { children: React.ReactNode }) => (
      <HydrationContext.Provider value={{ userAgent: "Mozilla/5.0" }}>
        {children}
      </HydrationContext.Provider>
    )

    const { result } = renderHook(() => useResponsive(), {
      wrapper: desktopWrapper
    })

    expect(result.current.isClient).toBe(true)
  })
})
