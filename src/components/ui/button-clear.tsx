import { cn } from "@/lib/utils"
import { X } from "lucide-react"

function ButtonClear({
  onClick,
  className
}: {
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
  className?: string
}) {
  return (
    <span
      className={cn(
        "absolute cursor-pointer z-10 flex items-center justify-center size-4 p-0 right-2 top-1/2 -translate-y-1/2",
        className
      )}
      onClick={onClick}>
      <X className="size-3" />
    </span>
  )
}

export default ButtonClear
