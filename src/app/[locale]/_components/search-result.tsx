"use client"

import CategoryToggle from "@/app/[locale]/_components/category-toggle"
import Product from "@/app/[locale]/_components/product-card/product-card"
import ProductSkeleton from "@/app/[locale]/_components/product-card/product-card-placeholder"
import useProducts from "@/app/[locale]/hooks/use-marketplace-items"
import EmptyIndicator from "@/components/indicators/empty"
import ErrorIndicator from "@/components/indicators/error"
import { Button } from "@/components/ui/button"
import { TProductParams } from "@/types/model/product"
import { useParams } from "next/navigation"

function MarketplaceResult() {
  const params = useParams<TProductParams>()
  const { _page = 1 } = params

  const { items, loading, error, refetch, fetchNextPage } = useProducts()

  const renderContent = () => {
    if (error) {
      return <ErrorIndicator onRetry={() => refetch()} />
    }

    if (!loading && items && items.length === 0) {
      return <EmptyIndicator onAction={() => refetch()} />
    }

    return (
      <div className="flex flex-col gap-4">
        <CategoryToggle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Existing items */}
          {items &&
            items.map((item) => (
              <Product key={item.id} item={item} onFavoriteToggle={() => {}} />
            ))}

          {/* Loading skeletons */}
          {loading &&
            _page === 1 &&
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        </div>
      </div>
    )
  }

  return <div className="md:col-span-3">{renderContent()}</div>
}

export default MarketplaceResult
