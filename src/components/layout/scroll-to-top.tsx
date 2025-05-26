"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronUp } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"

export type ScrollToTopProps = {
  scrollProps?: ScrollIntoViewOptions
  className?: HTMLAttributes<HTMLDivElement>["className"]
}
function ScrollToTop(props: ScrollToTopProps) {
  const { scrollProps, className } = props
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      ...scrollProps
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        !isVisible && "h-0 w-0 opacity-0",
        "transition-all rounded-full justify-self-end",
        className
      )}>
      <ChevronUp className="size-4 text-primary" />
    </Button>
  )
}

export default ScrollToTop
