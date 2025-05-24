import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketplaceItemSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <Skeleton className="h-48 w-full" />

      <CardContent className="flex-grow pt-4">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-32" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-0">
        <Skeleton className="h-5 w-20" />
      </CardFooter>
    </Card>
  )
}
