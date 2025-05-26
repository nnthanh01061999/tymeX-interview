import ButtonClear from "@/components/ui/button-clear"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { debounce } from "@/util/lodash"
import { useCallback } from "react"
import {
  NumericFormat,
  NumericFormatProps,
  OnValueChange
} from "react-number-format"

export type NumberMaskProps = Omit<
  NumericFormatProps,
  "onValueChange" | "onChange"
> & {
  allowClear?: boolean
  debounceTime?: number
  value?: number
  onChange: (value?: number) => void
}

function NumberMaskDebounce(props: NumberMaskProps) {
  const {
    value,
    onChange,
    allowClear = false,
    debounceTime = 300,
    ...containProps
  } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced: OnValueChange = useCallback(
    debounce((e) => {
      onChange?.(e.floatValue)
    }, debounceTime),
    [onChange, debounceTime]
  )

  return (
    <div className="relative">
      <NumericFormat
        allowLeadingZeros
        thousandSeparator=","
        customInput={Input}
        {...containProps}
        className={cn([containProps.className, allowClear && "pr-8"])}
        value={value ?? ""}
        onValueChange={onChangeDebounced}
      />
      {allowClear && !!value && (
        <ButtonClear onClick={() => onChange(undefined)} />
      )}
    </div>
  )
}

export default NumberMaskDebounce
