"use client"

import { ErrorImageFallback } from "@/components/ui/image-fallbacks"
import { cn } from "@/lib/utils"
import Image, { ImageProps } from "next/image"
import { useState } from "react"

export interface BaseImageProps extends Omit<ImageProps, "onError"> {
  /**
   * Fallback image URL to display when the main image fails to load
   */
  fallbackSrc?: string
  /**
   * Custom element to display when image fails to load and no fallbackSrc is provided
   */
  fallbackElement?: React.ReactNode
  /**
   * Additional class name for the container
   */
  containerClassName?: string
  /**
   * Callback function when image fails to load
   */
  onImageError?: () => void
}

export default function BaseImage({
  src,
  alt,
  fallbackSrc,
  fallbackElement = <ErrorImageFallback />,
  className,
  containerClassName,
  onImageError,
  ...props
}: BaseImageProps) {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
    onImageError?.()
  }

  // Show fallback element if provided and image failed to load
  if (error && !fallbackSrc && fallbackElement) {
    return (
      <div className={cn("relative", containerClassName)}>
        {fallbackElement}
      </div>
    )
  }

  return (
    <div className={cn("relative", containerClassName)}>
      <Image
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className={className}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
