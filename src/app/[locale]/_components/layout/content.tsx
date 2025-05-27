"use client"

import FilterForm from "@/app/[locale]/_components/filters/filter-form-context"
import FilterPanel from "@/app/[locale]/_components/filters/filter-panel"
import FilterSheet from "@/app/[locale]/_components/filters/filter-sheet"
import SearchResult from "@/app/[locale]/_components/search-result"
import { STICKY_IDS } from "@/constants"
import { getSentinelId } from "@/hooks/use-sticky-state"
import { cn } from "@/lib/utils"

export default function Content({ className }: { className?: string }) {
  return (
    <FilterForm>
      <section className={cn(className, "relative")}>
        <div
          id={getSentinelId(STICKY_IDS.FILTER_SHEET)}
          className="absolute top-0 h-1 w-full"
        />
        <div
          id={STICKY_IDS.FILTER_SHEET}
          className="flex md:hidden justify-end md:mb-4 sticky top-2 z-50 mb-0">
          <FilterSheet />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-4">
              <FilterPanel />
            </div>
          </div>

          {/* Search Results */}
          <SearchResult />
        </div>
      </section>
    </FilterForm>
  )
}
