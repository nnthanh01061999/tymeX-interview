"use client"

import { getValidatedParams } from "@/app/[locale]/util"
import { Form } from "@/components/ui/form"
import useFilterQueryParams from "@/hooks/use-filter-query-params"
import { useResponsive } from "@/hooks/use-responsive"
import { TCategory, TTheme, TTier } from "@/types"
import { isEmpty } from "@/util/lodash"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect
} from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

const FilterFormContext = createContext<{
  form: UseFormReturn<z.infer<typeof formSchema>>
  setParams: ReturnType<typeof useFilterQueryParams>["setParams"]
  handleReset: () => void
  handleFilter: (data: z.infer<typeof formSchema>) => void
}>({} as any)

const FilterFormProvider = FilterFormContext.Provider

export const useFilterForm = () => {
  return useContext(FilterFormContext)
}

export interface FilterFormValues {
  q: string
  tier?: TTier
  theme?: TTheme
  category?: TCategory
  price: [number, number]
}

const formSchema = z.object({
  q: z.string(),
  tier: z.string(),
  theme: z.string(),
  category: z.string(),
  price: z.array(z.number())
})

const defaultValues = {
  q: "",
  tier: "",
  theme: "",
  category: "",
  price: [undefined, undefined]
}

export default function FilterForm({ children }: PropsWithChildren) {
  const { params, setParams } = useFilterQueryParams({
    scrollTop: false
  })

  const { isDesktop } = useResponsive()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { ...defaultValues, ...params },
    resolver: zodResolver(formSchema)
  })

  const formValues = form.watch()

  const handleReset = useCallback(() => {
    form.reset(defaultValues)
    setParams({ data: {}, reset: true })
  }, [form, setParams])

  const handleFilter = useCallback(
    (data: z.infer<typeof formSchema>) => {
      const validated = getValidatedParams(data)
      const empty = isEmpty(validated)
      setParams({ data: empty ? {} : validated, reset: true })
    },
    [setParams]
  )

  useEffect(() => {
    const { category } = formValues
    const currentCategory = params.category
    if (!isDesktop && category !== currentCategory) return
    handleFilter(formValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues), handleFilter, isDesktop])

  return (
    <FilterFormProvider value={{ form, setParams, handleReset, handleFilter }}>
      <Form {...form}>{children}</Form>
    </FilterFormProvider>
  )
}
