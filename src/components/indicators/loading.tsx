import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

type TLoadingProps = {
  loading?: boolean
}

function Loading({ loading }: TLoadingProps) {
  const [show, setShow] = useState(loading)

  useEffect(() => {
    if (loading) {
      setShow(true)
    } else {
      // Wait for the fade-out animation to finish before hiding completely
      const timeout = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [loading])

  return (
    <div
      data-testid="loading-overlay"
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-background/50 transition-opacity duration-300",
        show
          ? "opacity-100 pointer-events-auto z-50"
          : "opacity-0 pointer-events-none z-[-1]"
      )}>
      <div
        data-testid="loading-container"
        className="relative w-20 h-20 flex items-center justify-center">
        <Loader2
          data-testid="loading-spinner"
          role="status"
          className="size-6 animate-spin"
        />
      </div>
    </div>
  )
}

export default Loading
