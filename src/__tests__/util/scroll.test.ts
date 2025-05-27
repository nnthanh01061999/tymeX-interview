import { scrollHorizontallyToCenter } from "@/util/scroll"

describe("scrollHorizontallyToCenter", () => {
  let querySelectorSpy: jest.SpyInstance
  let closestSpy: jest.SpyInstance
  let scrollToSpy: jest.SpyInstance

  beforeEach(() => {
    const mockElement = {
      closest: jest.fn(),
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 100,
        width: 50
      })
    }

    const mockParent = {
      scrollLeft: 0,
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 0,
        width: 500
      }),
      scrollTo: jest.fn()
    }

    querySelectorSpy = jest
      .spyOn(document, "querySelector")
      .mockReturnValue(mockElement as any)

    closestSpy = jest
      .spyOn(mockElement, "closest")
      .mockReturnValue(mockParent as any)

    scrollToSpy = jest.spyOn(mockParent, "scrollTo")
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("should scroll element to center", () => {
    scrollHorizontallyToCenter("test-id")

    expect(querySelectorSpy).toHaveBeenCalledWith("#test-id")

    expect(closestSpy).toHaveBeenCalledWith("div")

    expect(scrollToSpy).toHaveBeenCalledWith({
      left: 100 - 500 / 2 + 50 / 2,
      behavior: "smooth"
    })
  })

  it("should handle when element is not found", () => {
    querySelectorSpy.mockReturnValueOnce(null)

    scrollHorizontallyToCenter("nonexistent-id")

    expect(querySelectorSpy).toHaveBeenCalledWith("#nonexistent-id")

    expect(closestSpy).not.toHaveBeenCalled()
    expect(scrollToSpy).not.toHaveBeenCalled()
  })

  it("should handle when parent is not found", () => {
    closestSpy.mockReturnValueOnce(null)

    scrollHorizontallyToCenter("test-id")

    expect(querySelectorSpy).toHaveBeenCalledWith("#test-id")
    expect(closestSpy).toHaveBeenCalledWith("div")

    expect(scrollToSpy).not.toHaveBeenCalled()
  })
})
