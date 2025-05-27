import BaseImage from "@/components/ui/base-image"
import { cn } from "@/lib/utils"

function ImageRandom({
  index,
  className
}: {
  index?: number
  className?: string
}) {
  const random = Math.floor(Math.random() * 100)
  return (
    <BaseImage
      src={`https://picsum.photos/600/800?random=${index || random}`}
      alt={`Image ${random}`}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 20vw, 20vw"
      className="object-cover"
      containerClassName={cn("size-full overflow-hidden", className)}
    />
  )
}

export default ImageRandom
