import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

interface ErrorProps {
  title?: string
  description?: string
  actionLabel?: string
  onRetry?: () => void
  className?: string
}

export default function Error({
  title,
  description,
  actionLabel,
  onRetry,
  className
}: ErrorProps) {
  const t = useTranslations("error")

  const data = useMemo(
    () => ({
      title: title || t("title"),
      description: description || t("description"),
      actionLabel: actionLabel || t("actionLabel")
    }),
    [t, title, description, actionLabel]
  )

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}>
      <div className="mb-6 rounded-full bg-red-100 p-5 w-16 h-16 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
      <p className="text-gray-500 mb-6 max-w-md">{data.description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="default">
          {data.actionLabel}
        </Button>
      )}
    </div>
  )
}
