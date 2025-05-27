"use client"

import { cn } from "@/lib/utils"
import { AlertCircle, ImageIcon } from "lucide-react"

interface FallbackProps {
  /**
   * CSS classes to apply to the fallback container
   */
  className?: string
  /**
   * Width of the fallback element (can be any valid CSS width)
   */
  width?: string | number
  /**
   * Height of the fallback element (can be any valid CSS height)
   */
  height?: string | number
  /**
   * Custom text to display in the fallback
   */
  text?: string
}

/**
 * A simple fallback for when images fail to load
 */
export function ImageFallback({
  className,
  width = "100%",
  height = "100%",
  text = "Image not available"
}: FallbackProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-muted/30 text-muted-foreground rounded-md",
        className
      )}
      style={{ width, height }}>
      <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}

/**
 * A fallback for when images fail to load with an error indication
 */
export function ErrorImageFallback({
  className,
  width = "100%",
  height = "100%",
  text = "Failed to load image"
}: FallbackProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-destructive/10 text-destructive rounded-md",
        className
      )}
      style={{ width, height }}>
      <AlertCircle className="h-10 w-10 mb-2" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}

/**
 * A placeholder for images that are still loading
 */
export function ImagePlaceholder({
  className,
  width = "100%",
  height = "100%"
}: Omit<FallbackProps, "text">) {
  return (
    <div
      className={cn("animate-pulse bg-muted/50 rounded-md", className)}
      style={{ width, height }}
    />
  )
}
