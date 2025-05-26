import { Slider, SliderProps } from "@/components/ui/slider"
import { debounce } from "@/util/lodash"
import { useCallback, useEffect, useState } from "react"

export type SliderDebounceProps = SliderProps & {
  debounceTime?: number
}

function SliderDebounce(props: SliderDebounceProps) {
  const { onValueChange, debounceTime = 300, ...rest } = props
  const [internalValue, setInternalValue] = useState(rest.value)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onValueChangeDebounced: SliderProps["onValueChange"] = useCallback(
    debounce((e) => {
      onValueChange?.(e)
    }, debounceTime),
    [onValueChange, debounceTime]
  )

  const handleChange: SliderProps["onValueChange"] = useCallback(
    (e: number[]) => {
      setInternalValue(e)
      onValueChangeDebounced(e)
    },
    [onValueChangeDebounced]
  )

  useEffect(() => {
    setInternalValue(rest.value)
  }, [rest.value])

  return <Slider {...rest} onValueChange={handleChange} value={internalValue} />
}

export default SliderDebounce
