import NumberMaskDebounce from "@/components/builder/debounce/number-mask-debounce"
import SliderDebounce, {
  SliderDebounceProps
} from "@/components/builder/debounce/slider-debounce"
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

type TFormSliderProps<T extends FieldValues> = FormWrapperProps<T> & {
  childrenProps?: SliderDebounceProps
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
      render={({ field }) => {
        const onChangeMin = (e?: number) => {
          field.onChange([e, field.value[1]])
        }

        const onChangeMax = (e?: number) => {
          field.onChange([field.value[0], e])
        }
        return (
          <FormItem>
            {label && <FormLabel {...labelProps}>{label}</FormLabel>}
            <FormControl {...controlProps}>
              <div className="space-y-4">
                <SliderDebounce
                  {...childrenProps}
                  value={[field.value[0] || 0, field.value[1] || 0]}
                  onValueChange={field.onChange}
                />
                <div className="flex gap-2">
                  <NumberMaskDebounce
                    value={field.value?.[0]}
                    onChange={onChangeMin}
                    placeholder="Min"
                    allowClear={true}
                  />
                  <NumberMaskDebounce
                    value={field.value?.[1]}
                    onChange={onChangeMax}
                    placeholder="Max"
                    allowClear={true}
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
        )
      }}
    />
  )
}

export default FormSlider
