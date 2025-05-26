import ButtonClear from "@/components/ui/button-clear"
import { cn } from "@/lib/utils"
import * as React from "react"

export type InputProps = React.ComponentProps<"input"> & {
  allowClear?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, allowClear = false, ...props }, ref) => {
    const { value } = props

    const handleClear = React.useCallback(() => {
      props.onChange?.({
        target: { value: "" }
      } as React.ChangeEvent<HTMLInputElement>)
    }, [props])

    return (
      <div className="relative flex w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            allowClear && "pr-8",
            className
          )}
          ref={ref}
          {...props}
        />
        {allowClear && value && <ButtonClear onClick={handleClear} />}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
