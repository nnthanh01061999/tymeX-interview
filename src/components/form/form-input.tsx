import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { FormWrapperProps } from "@/types/form"
import { FieldValues } from "react-hook-form"

type TFormInputProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps?: InputProps
}

function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelProps,
  controlProps,
  descriptionProps,
  messageProps,
  childrenProps
}: TFormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <FormControl {...controlProps}>
            <Input {...field} {...childrenProps} />
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

export default FormInput
