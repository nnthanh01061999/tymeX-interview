import { Input, InputProps } from "@/components/ui/input"
import { debounce } from "@/util/lodash"
import { useCallback, useEffect, useState } from "react"

export type TInputDebounceProps = InputProps & { debounceTime?: number }

const InputDebounce = (props: TInputDebounceProps) => {
  const { debounceTime = 300, onChange, ...rest } = props
  const [internalValue, setInternalValue] = useState(rest.value)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }, debounceTime),
    [onChange, debounceTime]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChangeDebounced(e)
    },
    [onChangeDebounced]
  )

  useEffect(() => {
    setInternalValue(rest.value ?? "")
  }, [rest.value])

  return <Input {...rest} value={internalValue} onChange={handleChange} />
}

export default InputDebounce
