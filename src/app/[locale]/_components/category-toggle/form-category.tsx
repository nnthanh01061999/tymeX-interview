"use client"

import CategoryToggle, {
  CategoryToggleProps
} from "@/app/[locale]/_components/category-toggle"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { FormWrapperProps } from "@/types/form"
import { FieldValues } from "react-hook-form"

type TFormCategoryProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps: Pick<CategoryToggleProps, "options">
}

function FormCategory<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelProps,
  controlProps,
  descriptionProps,
  messageProps,
  childrenProps
}: TFormCategoryProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          {label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <FormControl {...controlProps}>
            <CategoryToggle
              {...childrenProps}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          {description && (
            <FormDescription {...descriptionProps}>
              {description}
            </FormDescription>
          )}
          <FormMessage {...messageProps} />
        </FormItem>
      )}
    />
  )
}

export default FormCategory
