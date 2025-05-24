import { useEffect, useRef, useState } from "react"

const useHasScroll = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [hasScrollLeft, setHasScrollLeft] = useState(false)
  const [hasScrollRight, setHasScrollRight] = useState(false)

  const checkScroll = () => {
    if (!ref?.current) return

    const { scrollLeft, scrollWidth, clientWidth } = ref?.current || {}

    setHasScrollLeft(scrollLeft > 0) // Check if there's hidden content to the left
    setHasScrollRight(scrollLeft + 2 + clientWidth < scrollWidth) // Check if there's hidden content to the right
  }

  useEffect(() => {
    if (!ref?.current) return

    checkScroll() // Initial check

    const element = ref?.current
    element.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      element.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [ref])

  return { ref, hasScrollLeft, hasScrollRight }
}

export default useHasScroll
