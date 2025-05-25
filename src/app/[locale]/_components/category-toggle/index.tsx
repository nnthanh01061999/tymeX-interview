import HorizontalScrollButton from "@/app/[locale]/_components/category-toggle/horizontal-scroll-button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CATEGORY_OPTIONS } from "@/constants"
import useFilterQueryParams from "@/hooks/use-filter-query-params"
import useHasScroll from "@/hooks/use-has-scroll"
import { TCategory } from "@/types/model/product"
import { scrollHorizontallyToCenter } from "@/util/scroll"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CategoryToggle() {
  const searchParams = useSearchParams()
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "all"
  )

  const updateQuery = useFilterQueryParams({
    scrollTop: false
  })

  const { ref, hasScrollLeft, hasScrollRight } = useHasScroll()

  const handleChange = (value: string) => {
    if (!value) {
      setCategory("all")
      updateQuery({ data: { category: undefined }, searchParams })
      return
    }
    setCategory(value as TCategory)
    scrollHorizontallyToCenter(value)
    updateQuery({ data: { category: value }, searchParams })
  }

  useEffect(() => {
    if (!category) return
    scrollHorizontallyToCenter(category)
  }, [category])

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
        value={category}
        onValueChange={handleChange}
        className="flex justify-start gap-2 items-center overflow-auto scrollbar-hide">
        {CATEGORY_OPTIONS.map((category) => (
          <ToggleGroupItem
            id={category.value}
            key={category.value}
            value={category.value}
            className="flex-shrink-0 bg-transparent border border-solid border-gray-200 hover:bg-gray-200">
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
