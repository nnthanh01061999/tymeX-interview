import ButtonClear from "@/components/ui/button-clear"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Option } from "@/types"
import { SelectProps } from "@radix-ui/react-select"

export type BaseSelectProps<T extends React.ReactNode> = SelectProps & {
  allowClear?: boolean
  placeholder?: string
  options: Option<string, T>[]
}
function BaseSelect<T extends React.ReactNode>(props: BaseSelectProps<T>) {
  const { allowClear = true, placeholder, options, ...rest } = props
  return (
    <Select {...rest}>
      <div className="relative w-full flex justify-start">
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        {!!rest.value && allowClear && (
          <ButtonClear
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              console.log("clear")
              rest.onValueChange?.("")
            }}
            className="right-8"
          />
        )}
      </div>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default BaseSelect
