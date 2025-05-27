import { useEffect, useState } from "react"

const stickyElements: Record<string, boolean> = {}

export default function useStickyState(
  id: string,
  onStickyChange?: (isSticky: boolean) => void
) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const sentinelEl = document.querySelector<HTMLElement>(
      `#${getSentinelId(id)}`
    )
    if (!sentinelEl) {
      console.warn(`Sentinel not found for id: ${id}`)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextSticky = entry.intersectionRatio === 0

        setIsSticky((prev) => {
          if (prev !== nextSticky) {
            stickyElements[id] = nextSticky
            onStickyChange?.(nextSticky)
          }
          return nextSticky
        })
      },
      {
        threshold: [0, 1], // Observe both entering and exiting the view
        rootMargin: "0px 0px 0px 0px"
      }
    )

    observer.observe(sentinelEl)

    return () => {
      observer.disconnect()
      delete stickyElements[id]
    }
  }, [id, onStickyChange])

  return isSticky
}

export function isStickyById(id: string): boolean {
  return !!stickyElements[id]
}

export const getSentinelId = (id: string) => `sentinel-${id}`
