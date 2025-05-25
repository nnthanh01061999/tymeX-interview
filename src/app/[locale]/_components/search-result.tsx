"use client"

import CategoryToggle from "@/app/[locale]/_components/category-toggle"
import Product from "@/app/[locale]/_components/product-card"
import ProductSkeleton from "@/app/[locale]/_components/product-card/product-card-placeholder"
import useProducts from "@/app/[locale]/hooks/use-search-products"
import EmptyIndicator from "@/components/indicators/empty"
import ErrorIndicator from "@/components/indicators/error"
import { Button } from "@/components/ui/button"
import useFilterQueryParams from "@/hooks/use-filter-query-params"

function MarketplaceResult() {
  const updateQuery = useFilterQueryParams({
    scrollTop: false
  })
  const { items, loading, isLoadingMore, error, fetchNextPage } = useProducts()

  const handleReset = () => {
    updateQuery({ data: {} })
  }

  const renderContent = () => {
    if (error) {
      return <ErrorIndicator onRetry={handleReset} />
    }

    if (!loading && items && items.length === 0) {
      return <EmptyIndicator onAction={handleReset} />
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
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            loading={isLoadingMore}
            variant="outline"
            onClick={() => fetchNextPage()}>
            View More
          </Button>
        </div>
      </div>
    )
  }

  return <div className="md:col-span-3">{renderContent()}</div>
}

export default MarketplaceResult
