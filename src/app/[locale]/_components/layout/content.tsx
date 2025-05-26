"use client"

import FilterForm from "@/app/[locale]/_components/filters/filter-form-context"
import FilterPanel from "@/app/[locale]/_components/filters/filter-panel"
import FilterSheet from "@/app/[locale]/_components/filters/filter-sheet"
import SearchResult from "@/app/[locale]/_components/search-result"
import { cn } from "@/lib/utils"

export default function Content({ className }: { className?: string }) {
  return (
    <FilterForm>
      <section className={cn(className, "relative")}>
        {/* Mobile filter button - only visible on small screens */}
        <div className="flex md:hidden justify-end mb-4">
          <FilterSheet />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Desktop Filter Column - hidden on mobile */}
          <div className="hidden md:block md:col-span-1">
            <FilterPanel />
          </div>

          {/* Search Results */}
          <SearchResult />
        </div>
      </section>
    </FilterForm>
  )
}
