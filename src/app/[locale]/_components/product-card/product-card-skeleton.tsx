import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <Skeleton className="h-48 w-full" />

      <CardContent className="grow p-3">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-5 w-32" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-3 pt-0">
        <Skeleton className="h-5 w-20" />
      </CardFooter>
    </Card>
  )
}
