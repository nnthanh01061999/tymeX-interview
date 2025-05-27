"use client"

import HorizontalScrollButton from "@/app/[locale]/_components/category-toggle/horizontal-scroll-button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useHasScroll from "@/hooks/use-has-scroll"
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
    <div className="relative">
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
        className="flex justify-start gap-2 items-center overflow-auto scrollbar-hide">
        {options.map((category) => (
          <ToggleGroupItem
            id={category.value}
            key={category.value}
            value={category.value}
            className="shrink-0 bg-background border border-solid border-input hover:bg-accent hover:text-accent-foreground">
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
