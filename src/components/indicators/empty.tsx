import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

interface EmptyIndicatorProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyIndicator({
  title,
  description,
  actionLabel,
  onAction
}: EmptyIndicatorProps) {
  const t = useTranslations("empty")

  const data = useMemo(
    () => ({
      title: title || t("title"),
      description: description || t("description"),
      actionLabel: actionLabel || t("actionLabel")
    }),
    [t, title, description, actionLabel]
  )

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6 rounded-full bg-gray-100 p-5 w-16 h-16 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
      <p className="text-gray-500 mb-6 max-w-md">{data.description}</p>
      {onAction && (
        <Button onClick={onAction} variant="outline">
          {data.actionLabel}
        </Button>
      )}
    </div>
  )
}
