"use client"

import { useFilterForm } from "@/app/[locale]/_components/filters/filter-form-context"
import FormInputDebounce from "@/components/form/form-input-debounce"
import FormSelect from "@/components/form/form-select"
import FormSlider from "@/components/form/form-slider"
import { Button } from "@/components/ui/button"
import { THEME_OPTIONS, TIER_OPTIONS } from "@/constants"
import { useTranslations } from "next-intl"

interface FilterPanelProps {
  onApply?: () => void
}

export default function FilterPanel({ onApply }: FilterPanelProps) {
  const t = useTranslations("filter")
  const { form, handleReset } = useFilterForm()

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-8 justify-between md:justify-start h-full">
      <div className="flex flex-col gap-8">
        <FormInputDebounce
          form={form}
          name="q"
          label={t("search")}
          childrenProps={{
            placeholder: t("searchPlaceholder"),
            allowClear: true
          }}
        />

        <FormSlider
          form={form}
          name="price"
          label={t("price")}
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
          label={t("tier")}
          childrenProps={{
            options: TIER_OPTIONS.map((tier) => ({
              label: tier.label,
              value: tier.value
            })),
            placeholder: t("tierPlaceholder")
          }}
        />

        <FormSelect
          form={form}
          name="theme"
          label={t("theme")}
          childrenProps={{
            options: THEME_OPTIONS.map((theme) => ({
              label: theme.label,
              value: theme.value
            })),
            placeholder: t("themePlaceholder")
          }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleReset}>
          {t("reset")}
        </Button>

        {onApply && (
          <Button type="button" className="w-full" onClick={onApply}>
            {t("apply")}
          </Button>
        )}
      </div>
    </form>
  )
}
