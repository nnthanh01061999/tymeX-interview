import HorizontalScrollButton from "@/app/[locale]/_components/horizontal-scroll-button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useHasScroll from "@/hooks/use-has-scroll"
import { TCategory } from "@/types/model/product"
import { scrollHorizontallyToCenter } from "@/util/scroll"
import { useEffect, useState } from "react"

const categories = [
  { id: "all", name: "All" },
  { id: "upper-body", name: "Upper Body" },
  { id: "lower-body", name: "Lower Body" },
  { id: "hat", name: "Hat" },
  { id: "shoes", name: "Shoes" },
  { id: "accessory", name: "Accessory" },
  { id: "basic", name: "Basic" },
  { id: "premium", name: "Premium" },
  { id: "deluxe", name: "Deluxe" },
  { id: "dark", name: "Dark" },
  { id: "light", name: "Light" },
  { id: "colorful", name: "Colorful" },
  { id: "halloween", name: "Halloween" }
] satisfies { id: string; name: string }[]

export default function CategoryToggle() {
  const [category, setCategory] = useState<string>("all")

  const { ref, hasScrollLeft, hasScrollRight } = useHasScroll()

  const handleChange = (value: string) => {
    if (!value) {
      setCategory("all")
      return
    }
    setCategory(value as TCategory)
    scrollHorizontallyToCenter(value)
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
        {categories.map((category) => (
          <ToggleGroupItem
            key={category.id}
            value={category.id}
            className="flex-shrink-0">
            {category.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
