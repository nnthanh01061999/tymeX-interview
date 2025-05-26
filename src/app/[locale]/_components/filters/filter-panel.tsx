"use client"

import { useFilterForm } from "@/app/[locale]/_components/filter-form-context"
import FormInputDebounce from "@/components/form/form-input-debounce"
import FormSelect from "@/components/form/form-select"
import FormSlider from "@/components/form/form-slider"
import { Button } from "@/components/ui/button"
import { THEME_OPTIONS, TIER_OPTIONS } from "@/constants"

interface FilterPanelProps {
  onApply?: () => void
}

export default function FilterPanel({ onApply }: FilterPanelProps) {
  const { form, handleReset } = useFilterForm()

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-8 justify-between md:justify-start h-full">
      <div className="flex flex-col gap-8">
        <FormInputDebounce
          form={form}
          name="q"
          label="Search"
          childrenProps={{
            placeholder: "Search"
          }}
          debounceTime={300}
        />

        <FormSlider
          form={form}
          name="price"
          label="Price Range"
          childrenProps={{
            multiple: true,
            min: 0,
            //this should be a max value of filter
            max: 999
          }}
        />

        <FormSelect
          form={form}
          name="tier"
          label="Tier"
          childrenProps={{
            options: TIER_OPTIONS.map((tier) => ({
              label: tier.label,
              value: tier.value
            })),
            placeholder: "Select Tier"
          }}
        />

        <FormSelect
          form={form}
          name="theme"
          label="Theme"
          childrenProps={{
            options: THEME_OPTIONS.map((theme) => ({
              label: theme.label,
              value: theme.value
            })),
            placeholder: "Select Theme"
          }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleReset}>
          Reset Filter
        </Button>

        {onApply && (
          <Button type="button" className="w-full" onClick={onApply}>
            Apply Filters
          </Button>
        )}
      </div>
    </form>
  )
}
