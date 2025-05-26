import BaseSelect, { BaseSelectProps } from "@/components/builder/base-select"
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

type TFormSelectProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps: BaseSelectProps<React.ReactNode>
}

function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelProps,
  controlProps,
  descriptionProps,
  messageProps,
  childrenProps
}: TFormSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <FormControl {...controlProps}>
            <BaseSelect
              {...field}
              {...childrenProps}
              onValueChange={field.onChange}
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

export default FormSelect
