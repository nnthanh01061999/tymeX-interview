import { cn } from "@/lib/utils"

interface ZigZagDividerProps {
  className?: string
}

const ZigZagDivider = ({ className }: ZigZagDividerProps) => (
  <div
    className={cn("relative w-full overflow-hidden leading-none", className)}>
    <svg
      className="block w-full h-[100px]"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,100 
         L150,50 
         L300,50 
         L450,100 
         L600,85 
         L750,100 
         L900,80 
         L1050,100 
         L1200,90 
         L1440,100 
         L1440,0 
         L0,0 
         Z"
        fill="currentColor"
        className="text-muted"
      />
    </svg>
  </div>
)

export default ZigZagDivider
