import InputDebounce, {
  TInputDebounceProps
} from "@/components/builder/debounce/input-debounce"
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

type TFormInputDebounceProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps?: TInputDebounceProps
}

function FormInputDebounce<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelProps,
  controlProps,
  descriptionProps,
  messageProps,
  childrenProps
}: TFormInputDebounceProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel {...labelProps}>{label}</FormLabel>}
            <FormControl {...controlProps}>
              <InputDebounce {...field} {...childrenProps} />
            </FormControl>
            {description && (
              <FormDescription {...descriptionProps}>
                {description}
              </FormDescription>
            )}
            <FormMessage {...messageProps} />
          </FormItem>
        )
      }}
    />
  )
}

export default FormInputDebounce
