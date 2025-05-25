"use client"

import FormInput from "@/components/form/form-input"
import FormSelect from "@/components/form/form-select"
import FormSlider from "@/components/form/form-slider"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { THEME_OPTIONS, TIER_OPTIONS } from "@/constants"
import useFilterQueryParams from "@/hooks/use-filter-query-params"
import { TCategory, TTheme, TTier } from "@/types"
import { debounce, isEmpty } from "@/util/lodash"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export interface FilterFormValues {
  q: string
  tier?: TTier
  theme?: TTheme
  category?: TCategory
  priceRange: [number, number]
}

const formSchema = z.object({
  q: z.string(),
  tier: z.string(),
  theme: z.string(),
  category: z.string(),
  priceRange: z.array(z.number())
})

export default function FilterPanel() {
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      q: searchParams.get("q") || "",
      tier: searchParams.get("tier") || "",
      theme: searchParams.get("theme") || "",
      category: searchParams.get("category") || "",
      priceRange: [
        Number(searchParams.get("priceRange")) || 0,
        Number(searchParams.get("priceRange")) || 0
      ]
    },
    resolver: zodResolver(formSchema)
  })
  const updateQuery = useFilterQueryParams({
    scrollTop: false
  })

  const formValues = form.watch()

  const handleReset = useCallback(() => {
    form.setValue("q", "")
    form.setValue("tier", "")
    form.setValue("theme", "")
    form.setValue("category", "")
    form.setValue("priceRange", [])
    updateQuery({ data: {} })
  }, [form, updateQuery])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = useCallback(
    debounce(
      (data: z.infer<typeof formSchema>, searchParams: URLSearchParams) => {
        const validated = Object.fromEntries(
          Object.entries(data).filter(([, value]) =>
            Array.isArray(value)
              ? value.length > 0 && value.filter(Boolean).length > 0
              : value !== ""
          )
        )
        if (isEmpty(validated)) {
          return
        }
        updateQuery({ data: validated, searchParams })
      },
      300
    ),
    [updateQuery, searchParams]
  )

  useEffect(() => {
    handleFilter(formValues, searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues), searchParams, handleFilter])

  //sync param to form

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        <FormInput
          form={form}
          name="q"
          label="Search"
          childrenProps={{
            placeholder: "Search"
          }}
        />

        <FormSlider
          form={form}
          name="priceRange"
          label="Price Range"
          childrenProps={{
            multiple: true,
            min: 0,
            //this should be a max value of filter
            max: 9999999
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

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleReset}>
          Reset Filter
        </Button>
      </form>
    </Form>
  )
}
