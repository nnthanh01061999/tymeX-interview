"use client"

import BaseImage from "@/components/ui/base-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IProduct } from "@/types"
import { formatNumber } from "@/util/format"
import { Heart } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface ProductCardProps {
  item?: IProduct
}

export default function ProductCard({ item }: ProductCardProps) {
  const t = useTranslations("product.favorite")
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite || false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteToggle = async () => {
    if (isLoading) return

    setIsLoading(true)
    setIsFavorite((prev) => !prev)
    setIsLoading(false)
  }

  if (!item) return null

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48">
        <BaseImage
          src={`https://picsum.photos/600/800?random=${item.imageId}`}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 20vw, 20vw"
          className="object-cover"
          containerClassName="size-full"
        />
      </div>
      <CardContent className="grow p-3">
        <div className="flex flex-col">
          <h3
            title={item.title}
            className="font-medium line-clamp-1 text-ellipsis">
            {item.title}
          </h3>
          <span className="text-sm text-gray-500">{item.tier}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-3 pt-0">
        <div className="font-semibold">{formatNumber(item.price)} ETH</div>
        <Button
          aria-label={isFavorite ? t("remove") : t("add")}
          onClick={handleFavoriteToggle}
          disabled={isLoading}
          variant="ghost"
          size="icon"
          className="p-0 size-4">
          <Heart
            size={18}
            className={cn([
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400",
              isLoading ? "opacity-50" : ""
            ])}
          />
        </Button>
      </CardFooter>
    </Card>
  )
}
