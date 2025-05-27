"use client"

import HorizontalScrollButton from "@/app/[locale]/_components/category-toggle/horizontal-scroll-button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { STICKY_IDS } from "@/constants/filter"
import useHasScroll from "@/hooks/use-has-scroll"
import useStickyState from "@/hooks/use-sticky-state"
import { cn } from "@/lib/utils"
import { TCategory } from "@/types/model/product"
import { scrollHorizontallyToCenter } from "@/util/scroll"
import { useEffect } from "react"

export type CategoryToggleProps = {
  options: {
    label: string
    value: string
  }[]
  value: string
  onChange: (value: string | undefined) => void
}

export default function CategoryToggle({
  options,
  value,
  onChange
}: CategoryToggleProps) {
  const { ref, hasScrollLeft, hasScrollRight } = useHasScroll()
  const isSticky = useStickyState(STICKY_IDS.FILTER_SHEET)

  const handleChange = (value: string) => {
    if (!value) {
      onChange(undefined)
      return
    }
    onChange(value as TCategory)
    scrollHorizontallyToCenter(value)
  }

  useEffect(() => {
    if (!value) return
    scrollHorizontallyToCenter(value)
  }, [value])

  return (
    <div
      className={cn([
        "relative md:w-full transition-all duration-200 md:pt-4",
        isSticky ? "w-[calc(100%-6rem)]" : "w-full"
      ])}>
      <HorizontalScrollButton
        containerRef={ref}
        direction="left"
        show={hasScrollLeft}
      />
      <HorizontalScrollButton
        containerRef={ref}
        direction="right"
        show={hasScrollRight}
      />
      <ToggleGroup
        ref={ref}
        type="single"
        value={value || "all"}
        onValueChange={handleChange}
        className="flex justify-start gap-2 items-center overflow-auto scrollbar-hide w-full">
        {options.map((category) => (
          <ToggleGroupItem
            id={category.value}
            key={category.value}
            value={category.value}
            className="shrink-0 h-8 md:h-9 bg-background border border-solid border-input hover:bg-accent hover:text-accent-foreground">
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
