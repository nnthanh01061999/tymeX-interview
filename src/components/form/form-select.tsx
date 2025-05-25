import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { TTier } from "@/types"
import { FormWrapperProps } from "@/types/form"
import { FieldValues } from "react-hook-form"

type TFormSelectProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps?: {
    options: {
      label: string
      value: string
    }[]
    placeholder?: string
  }
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
            <Select
              value={field.value || ""}
              onValueChange={(value) => field.onChange((value as TTier) || "")}>
              <SelectTrigger>
                <SelectValue placeholder={childrenProps?.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {childrenProps?.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
