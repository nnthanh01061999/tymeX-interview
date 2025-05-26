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
import { debounce } from "@/util/lodash"
import { useCallback, useState } from "react"
import { FieldValues } from "react-hook-form"

type TFormInputDebounceProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps?: InputProps
  debounceTime?: number
}

const InputDebounce = (props: InputProps & { debounceTime?: number }) => {
  const { debounceTime = 0, ...rest } = props
  const [internalValue, setInternalValue] = useState(rest.value)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      if (debounceTime > 0) {
        debounce(rest.onChange, debounceTime)
      } else {
        rest.onChange?.(e)
      }
    },
    [debounceTime, rest]
  )

  return <Input {...rest} value={internalValue} onChange={onChange} />
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
