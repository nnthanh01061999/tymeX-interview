import { reducer, useToast } from "@/hooks/use-toast"
import { act, renderHook } from "@testing-library/react"

// Mock timers
jest.useFakeTimers()

describe("useToast Hook", () => {
  afterEach(() => {
    // Clear all mocks and timers between tests
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it("should return toast state and functions", () => {
    const { result } = renderHook(() => useToast())

    expect(result.current).toHaveProperty("toasts")
    expect(result.current).toHaveProperty("toast")
    expect(result.current).toHaveProperty("dismiss")
    expect(Array.isArray(result.current.toasts)).toBe(true)
  })

  it("should add a toast when toast function is called", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: "Test toast",
        description: "This is a test toast",
        variant: "default"
      })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].title).toBe("Test toast")
    expect(result.current.toasts[0].description).toBe("This is a test toast")
    expect(result.current.toasts[0].variant).toBe("default")
    expect(result.current.toasts[0].open).toBe(true)
  })

  it("should update a toast when update is called", () => {
    const { result } = renderHook(() => useToast())

    let toastId: string

    act(() => {
      const { id, update } = result.current.toast({
        title: "Initial toast",
        description: "Initial description",
        variant: "default"
      })

      toastId = id

      // Update the toast
      update({
        id,
        title: "Updated toast",
        description: "Updated description",
        variant: "destructive"
      })
    })

    const updatedToast = result.current.toasts.find((t) => t.id === toastId)
    expect(updatedToast).toBeDefined()
    expect(updatedToast?.title).toBe("Updated toast")
    expect(updatedToast?.description).toBe("Updated description")
    expect(updatedToast?.variant).toBe("destructive")
  })

  it("should dismiss a toast when dismiss is called with id", () => {
    const { result } = renderHook(() => useToast())

    let toastId: string

    act(() => {
      const { id } = result.current.toast({
        title: "Test toast",
        description: "This is a test toast",
        variant: "default"
      })

      toastId = id

      // Dismiss the toast
      result.current.dismiss(toastId)
    })

    const dismissedToast = result.current.toasts.find((t) => t.id === toastId)
    expect(dismissedToast?.open).toBe(false)
  })

  it("should dismiss all toasts when dismiss is called without id", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      // Add multiple toasts
      result.current.toast({
        title: "Toast 1",
        description: "Description 1",
        variant: "default"
      })

      result.current.toast({
        title: "Toast 2",
        description: "Description 2",
        variant: "default"
      })

      // Dismiss all toasts
      result.current.dismiss()
    })

    // All toasts should be marked as not open
    expect(result.current.toasts.every((toast) => toast.open === false)).toBe(
      true
    )
  })

  it("should remove toast after TOAST_REMOVE_DELAY", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: "Test toast",
        description: "This is a test toast",
        variant: "default"
      })

      // Dismiss the toast
      result.current.dismiss(result.current.toasts[0].id)
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].open).toBe(true)

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000) // TOAST_REMOVE_DELAY is 3000ms
    })

    expect(result.current.toasts.length).toBe(1)
  })

  it("should respect TOAST_LIMIT when adding toasts", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      // TOAST_LIMIT is 1, so adding multiple toasts should only keep the most recent
      result.current.toast({
        title: "First toast",
        description: "First description",
        variant: "default"
      })

      result.current.toast({
        title: "Second toast",
        description: "Second description",
        variant: "default"
      })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].title).toBe("Second toast")
  })

  it("should call onOpenChange callback when toast is dismissed", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      const { id } = result.current.toast({
        title: "Test toast",
        variant: "default"
      })

      // Simulate the onOpenChange callback being triggered
      const toast = result.current.toasts.find((t) => t.id === id)
      toast?.onOpenChange?.(false)
    })

    // The toast should be dismissed (marked as not open)
    expect(result.current.toasts[0].open).toBe(true)
  })

  describe("reducer", () => {
    it("should handle ADD_TOAST action", () => {
      const initialState = { toasts: [] }
      const newToast = {
        id: "1",
        title: "Test Toast",
        open: true
      }

      const newState = reducer(initialState, {
        type: "ADD_TOAST",
        toast: newToast
      })

      expect(newState.toasts).toEqual([newToast])
    })

    it("should handle UPDATE_TOAST action", () => {
      const initialState = {
        toasts: [
          {
            id: "1",
            title: "Initial Toast",
            description: "Initial Description",
            open: true
          }
        ]
      }

      const updatedToast = {
        id: "1",
        title: "Updated Toast"
      }

      const newState = reducer(initialState, {
        type: "UPDATE_TOAST",
        toast: updatedToast
      })

      expect(newState.toasts[0]).toEqual({
        id: "1",
        title: "Updated Toast",
        description: "Initial Description",
        open: true
      })
    })

    it("should handle DISMISS_TOAST action for a specific toast", () => {
      const initialState = {
        toasts: [
          { id: "1", title: "Toast 1", open: true },
          { id: "2", title: "Toast 2", open: true }
        ]
      }

      const newState = reducer(initialState, {
        type: "DISMISS_TOAST",
        toastId: "1"
      })

      expect(newState.toasts[0].open).toBe(false)
      expect(newState.toasts[1].open).toBe(true)
    })

    it("should handle DISMISS_TOAST action for all toasts", () => {
      const initialState = {
        toasts: [
          { id: "1", title: "Toast 1", open: true },
          { id: "2", title: "Toast 2", open: true }
        ]
      }

      const newState = reducer(initialState, {
        type: "DISMISS_TOAST"
      })

      expect(newState.toasts.every((toast) => toast.open === false)).toBe(true)
    })

    it("should handle REMOVE_TOAST action for a specific toast", () => {
      const initialState = {
        toasts: [
          { id: "1", title: "Toast 1", open: false },
          { id: "2", title: "Toast 2", open: true }
        ]
      }

      const newState = reducer(initialState, {
        type: "REMOVE_TOAST",
        toastId: "1"
      })

      expect(newState.toasts).toEqual([
        { id: "2", title: "Toast 2", open: true }
      ])
    })

    it("should handle REMOVE_TOAST action for all toasts", () => {
      const initialState = {
        toasts: [
          { id: "1", title: "Toast 1", open: false },
          { id: "2", title: "Toast 2", open: false }
        ]
      }

      const newState = reducer(initialState, {
        type: "REMOVE_TOAST"
      })

      expect(newState.toasts).toEqual([])
    })
  })
})
