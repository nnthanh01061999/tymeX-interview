import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useRef } from "react"

type TLoadingProps = {
  loading?: boolean
}
function Loading({ loading }: TLoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div
        ref={containerRef}
        className={cn([
          "fixed opacity-100 inset-0 z-50 flex items-center justify-center bg-background/50",
          !loading && "opacity-0 transition-opacity z-[-1]"
        ])}>
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Loader2 className="size-6 animate-spin" />
        </div>
      </div>
    </div>
  )
}

export default Loading
