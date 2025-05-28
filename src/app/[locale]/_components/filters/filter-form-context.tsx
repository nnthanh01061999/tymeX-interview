"use client"

import { getValidatedParams } from "@/app/[locale]/util"
import { Form } from "@/components/ui/form"
import useFilterQueryParams from "@/hooks/use-filter-query-params"
import { useResponsive } from "@/hooks/use-responsive"
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

const formSchema = z.object({
  q: z.string(),
  tier: z.string(),
  theme: z.string(),
  category: z.string(),
  price: z.array(z.number().optional()),
  sort: z.string()
})

type FilterFormValues = z.infer<typeof formSchema>

const defaultValues: FilterFormValues = {
  q: "",
  tier: "",
  theme: "",
  category: "",
  price: [undefined, undefined],
  sort: ""
}

export default function FilterForm({ children }: PropsWithChildren) {
  const { params, setParams } = useFilterQueryParams({
    scrollTop: false
  })

  const { isDesktop } = useResponsive()

  const form = useForm<FilterFormValues>({
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
    if (!isDesktop && category === currentCategory) return
    handleFilter(formValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues), handleFilter, isDesktop])

  return (
    <FilterFormProvider value={{ form, setParams, handleReset, handleFilter }}>
      <Form {...form}>{children}</Form>
    </FilterFormProvider>
  )
}
