import ButtonClear from "@/components/ui/button-clear"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { NumericFormat, NumericFormatProps } from "react-number-format"

export type NumberMaskProps = Omit<
  NumericFormatProps,
  "onValueChange" | "onChange"
> & {
  allowClear?: boolean
  value?: number
  onChange: (value?: number) => void
}

function NumberMask(props: NumberMaskProps) {
  const { value, onChange, allowClear = false, ...containProps } = props
  return (
    <div className="relative">
      <NumericFormat
        allowLeadingZeros
        thousandSeparator=","
        customInput={Input}
        {...containProps}
        className={cn([containProps.className, allowClear && "pr-8"])}
        value={value ?? undefined}
        onValueChange={(e) => {
          onChange(e.floatValue)
        }}
      />
      {allowClear && value && (
        <ButtonClear onClick={() => onChange(undefined)} />
      )}
    </div>
  )
}

export default NumberMask
