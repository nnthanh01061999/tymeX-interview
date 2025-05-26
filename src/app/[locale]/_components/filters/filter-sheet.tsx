"use client"

import { useFilterForm } from "@/app/[locale]/_components/filters/filter-form-context"
import FilterPanel from "@/app/[locale]/_components/filters/filter-panel"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { FilterIcon } from "lucide-react"
import { useState } from "react"

function FilterSheet() {
  const [open, setOpen] = useState(false)
  const { form, handleFilter } = useFilterForm()

  const handleApply = () => {
    form.handleSubmit(handleFilter)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col h-full w-[85%] sm:w-[350px]">
        <SheetHeader className="text-start">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filter the products to your liking
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-1">
          <FilterPanel onApply={handleApply} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default FilterSheet
