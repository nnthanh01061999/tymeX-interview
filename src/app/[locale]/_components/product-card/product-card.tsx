"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { IProduct } from "@/types"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
  item: IProduct
  onFavoriteToggle: (id: number, isFavorite: boolean) => void
}

export default function ProductCard({
  item,
  onFavoriteToggle
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteToggle = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const newState = !isFavorite
      setIsFavorite(newState)
      onFavoriteToggle(item.id, newState)
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48">
        {/* Using div instead of Image for placeholders */}
        <div className="relative size-full">
          <Image
            src={`https://picsum.photos/200/300?random=${item.imageId}`}
            alt={item.title}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <CardContent className="flex-grow p-3">
        <div className="flex flex-col">
          <h3 className="font-medium">{item.title}</h3>
          <span className="text-sm text-gray-500">{item.tier}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-3 pt-0">
        <div className="font-semibold">{item.price.toFixed(2)} ETH</div>
        <Button
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavoriteToggle}
          disabled={isLoading}
          variant="ghost"
          size="icon"
          className="p-0 size-4">
          <Heart
            size={18}
            className={`${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            } 
                      ${isLoading ? "opacity-50" : ""}`}
          />
        </Button>
      </CardFooter>
    </Card>
  )
}
