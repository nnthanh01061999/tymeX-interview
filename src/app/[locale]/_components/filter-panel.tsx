"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { TCategory, TTheme, TTier } from "@/types"
import { useEffect, useState } from "react"

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void
  categories: TCategory[]
}

export interface FilterState {
  search: string
  tier?: TTier
  theme?: TTheme
  category?: TCategory
  priceRange: [number, number]
}

export default function FilterPanel({
  onFilterChange,
  categories
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: [0, 5]
  })

  const tiers: TTier[] = ["Basic", "Premium", "Deluxe"]
  const themes: TTheme[] = ["Dark", "Light", "Colorful", "Halloween"]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value }
    setFilters(newFilters)
  }

  const handleTierChange = (value: TTier | "") => {
    const newFilters = {
      ...filters,
      tier: (value as TTier) || undefined
    }
    setFilters(newFilters)
  }

  const handleThemeChange = (value: TTheme | "") => {
    const newFilters = {
      ...filters,
      theme: (value as TTheme) || undefined
    }
    setFilters(newFilters)
  }

  const handleCategoryChange = (value: TCategory | "") => {
    const newFilters = {
      ...filters,
      category: (value as TCategory) || undefined
    }
    setFilters(newFilters)
  }

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number]
    }
    setFilters(newFilters)
  }

  const handleReset = () => {
    setFilters({
      search: "",
      priceRange: [0, 5]
    })
  }

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  return (
    <div className="space-y-6">
      <div>
        <Input
          type="text"
          placeholder="Search"
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1 text-sm rounded-md border ${
              filters.category === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
            {category}
          </button>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <Slider
          defaultValue={[0, 5]}
          max={5}
          step={0.1}
          value={[filters.priceRange[0], filters.priceRange[1]]}
          onValueChange={handlePriceChange}
          className="price-range"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>{filters.priceRange[0].toFixed(1)} ETH</span>
          <span>{filters.priceRange[1].toFixed(1)} ETH</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Tier</h3>
        <Select
          value={filters.tier || ""}
          onValueChange={(value) => handleTierChange((value as TTier) || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Select Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            {tiers.map((tier) => (
              <SelectItem key={tier} value={tier}>
                {tier}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Theme</h3>
        <Select
          value={filters.theme || ""}
          onValueChange={(value) => handleThemeChange((value as TTheme) || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Themes</SelectItem>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filter
      </Button>
    </div>
  )
}
