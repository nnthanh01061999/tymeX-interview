import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import NumberMask from "@/components/ui/number-mask"
import { Slider, SliderProps } from "@/components/ui/slider"
import { FormWrapperProps } from "@/types/form"
import { FieldValues } from "react-hook-form"

type TFormSliderProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps?: SliderProps
}

function FormSlider<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelProps,
  controlProps,
  descriptionProps,
  messageProps,
  childrenProps
}: TFormSliderProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <FormControl {...controlProps}>
            <div className="space-y-4">
              <Slider
                {...childrenProps}
                value={field.value}
                onValueChange={(e) => {
                  field.onChange(e)
                }}
              />
              <div className="flex gap-2">
                <NumberMask
                  value={field.value?.[0] || undefined}
                  onChange={(e) => {
                    field.onChange([e, field.value[1]])
                  }}
                  placeholder="Min"
                />
                <NumberMask
                  value={field.value?.[1] || undefined}
                  onChange={(e) => {
                    field.onChange([field.value[0], e])
                  }}
                  placeholder="Max"
                />
              </div>
            </div>
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

export default FormSlider
