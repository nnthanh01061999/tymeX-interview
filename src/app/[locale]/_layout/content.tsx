"use client"

import FilterPanel from "@/app/[locale]/_components/filter-panel"
import SearchResult from "@/app/[locale]/_components/search-result"

export default function Content({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Column */}
        <div className="md:col-span-1">
          <FilterPanel />
        </div>
        <SearchResult />
      </div>
    </section>
  )
}
