import useStickyState, {
  getSentinelId,
  isStickyById
} from "@/hooks/use-sticky-state"
import { act, renderHook } from "@testing-library/react"

describe("use-sticky-state hook", () => {
  // Necessary variables for testing
  let observerCallback: IntersectionObserverCallback
  let observerOptions: IntersectionObserverInit | undefined
  let mockObserve: jest.Mock
  let mockDisconnect: jest.Mock
  const TEST_ID = "test-sticky-element"

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()

    // Create mock element
    const mockElement = document.createElement("div")
    mockElement.id = getSentinelId(TEST_ID)
    document.body.appendChild(mockElement)

    // Mock IntersectionObserver
    mockObserve = jest.fn()
    mockDisconnect = jest.fn()

    // @ts-expect-error - mocking IntersectionObserver
    global.IntersectionObserver = jest.fn((callback, options) => {
      observerCallback = callback
      observerOptions = options
      return {
        observe: mockObserve,
        disconnect: mockDisconnect
      }
    })

    // Spy on console.warn
    jest.spyOn(console, "warn").mockImplementation(() => {})
  })

  afterEach(() => {
    // Clean up
    document.body.innerHTML = ""
    jest.restoreAllMocks()
  })

  it("should return isSticky state as false by default", () => {
    const { result } = renderHook(() => useStickyState(TEST_ID))
    expect(result.current).toBe(false)
  })

  it("should set up IntersectionObserver with correct options", () => {
    renderHook(() => useStickyState(TEST_ID))

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(observerOptions).toEqual({
      threshold: [0, 1],
      rootMargin: "0px 0px 0px 0px"
    })
  })

  it("should observe the sentinel element", () => {
    renderHook(() => useStickyState(TEST_ID))

    expect(mockObserve).toHaveBeenCalledTimes(1)

    // Get the element that was observed
    const observedElement = mockObserve.mock.calls[0][0]
    expect(observedElement.id).toBe(getSentinelId(TEST_ID))
  })

  it("should update isSticky state when intersection changes", () => {
    const { result } = renderHook(() => useStickyState(TEST_ID))

    // Initially not sticky
    expect(result.current).toBe(false)

    // Simulate element becoming sticky (intersectionRatio = 0)
    act(() => {
      observerCallback(
        [
          {
            intersectionRatio: 0,
            isIntersecting: false
          } as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    // Should be sticky now
    expect(result.current).toBe(true)

    // Simulate element no longer being sticky (intersectionRatio = 1)
    act(() => {
      observerCallback(
        [
          {
            intersectionRatio: 1,
            isIntersecting: true
          } as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    // Should not be sticky again
    expect(result.current).toBe(false)
  })

  it("should call onStickyChange callback when sticky state changes", () => {
    const onStickyChange = jest.fn()
    renderHook(() => useStickyState(TEST_ID, onStickyChange))

    // Simulate element becoming sticky
    act(() => {
      observerCallback(
        [
          {
            intersectionRatio: 0,
            isIntersecting: false
          } as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(onStickyChange).toHaveBeenCalledWith(true)

    // Simulate element no longer being sticky
    act(() => {
      observerCallback(
        [
          {
            intersectionRatio: 1,
            isIntersecting: true
          } as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(onStickyChange).toHaveBeenCalledWith(false)
    expect(onStickyChange).toHaveBeenCalledTimes(2)
  })

  it("should not call onStickyChange if the sticky state doesn't change", () => {
    const onStickyChange = jest.fn()
    renderHook(() => useStickyState(TEST_ID, onStickyChange))

    // Simulate element becoming sticky
    act(() => {
      observerCallback(
        [
          {
            intersectionRatio: 0,
            isIntersecting: false
          } as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    expect(onStickyChange).toHaveBeenCalledWith(true)
    onStickyChange.mockClear()

    // Simulate the same event again (no change)
    act(() => {
      observerCallback(
        [
          {
            intersectionRatio: 0,
            isIntersecting: false
          } as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    // Should not be called again since state didn't change
    expect(onStickyChange).not.toHaveBeenCalled()
  })

  it("should update the global stickyElements record", () => {
    renderHook(() => useStickyState(TEST_ID))

    // Initially not sticky
    expect(isStickyById(TEST_ID)).toBe(false)

    // Simulate element becoming sticky
    act(() => {
      observerCallback(
        [
          {
            intersectionRatio: 0,
            isIntersecting: false
          } as IntersectionObserverEntry
        ],
        {} as IntersectionObserver
      )
    })

    // Should update the global record
    expect(isStickyById(TEST_ID)).toBe(true)
  })

  it("should warn if sentinel element is not found", () => {
    // Remove the element to trigger the warning
    document.body.innerHTML = ""

    renderHook(() => useStickyState("non-existent-id"))

    expect(console.warn).toHaveBeenCalledWith(
      "Sentinel not found for id: non-existent-id"
    )
  })

  it("should clean up observer on unmount", () => {
    const { unmount } = renderHook(() => useStickyState(TEST_ID))

    unmount()

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
    // Should have removed the id from stickyElements
    expect(isStickyById(TEST_ID)).toBe(false)
  })

  it("should generate correct sentinel ID", () => {
    expect(getSentinelId("test-id")).toBe("sentinel-test-id")
    expect(getSentinelId("filter-sheet")).toBe("sentinel-filter-sheet")
  })
})
