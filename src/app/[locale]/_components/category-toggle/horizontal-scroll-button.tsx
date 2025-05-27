"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

type THorizontalScrollButtonProps = ButtonProps & {
  containerRef: React.RefObject<HTMLDivElement | null>
  direction?: "left" | "right"
  show?: boolean
}
function HorizontalScrollButton({
  containerRef,
  direction = "left",
  show = true,
  className,
  ...props
}: THorizontalScrollButtonProps) {
  const scrollTo = (direction: "left" | "right") => () => {
    containerRef.current?.scrollTo({
      left: direction === "left" ? 0 : 1000,
      behavior: "smooth"
    })
  }

  if (!show) return null

  return (
    <Button
      {...props}
      onClick={scrollTo(direction)}
      variant="outline"
      className={cn([
        "outline-hidden ring-0 h-8 md:h-9 absolute bottom-0 z-1 rounded-none p-0",
        direction === "left"
          ? "justify-start -left-px"
          : "justify-end -right-px",
        className
      ])}>
      {direction === "left" ? (
        <ChevronLeftIcon className="w-4 h-4 text-primary" />
      ) : (
        <ChevronRightIcon className="w-4 h-4 text-primary" />
      )}
    </Button>
  )
}

export default HorizontalScrollButton
