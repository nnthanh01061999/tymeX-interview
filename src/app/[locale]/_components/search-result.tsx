"use client"

import FormCategory from "@/app/[locale]/_components/category-toggle/form-category"
import { useFilterForm } from "@/app/[locale]/_components/filters/filter-form-context"
import Product from "@/app/[locale]/_components/product-card"
import ProductSkeleton from "@/app/[locale]/_components/product-card/product-card-skeleton"
import useProducts from "@/app/[locale]/hooks/use-search-products"
import EmptyIndicator from "@/components/indicators/empty"
import ErrorIndicator from "@/components/indicators/error"
import Loading from "@/components/indicators/loading"
import { Button } from "@/components/ui/button"
import { CATEGORY_OPTIONS } from "@/constants/filter"
import { useTranslations } from "next-intl"
import { useCallback } from "react"

function SearchResult() {
  const t = useTranslations("search")
  const { form, handleReset } = useFilterForm()

  const {
    items,
    isPending,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage
  } = useProducts()

  const renderContent = useCallback(() => {
    if (isError) {
      return <ErrorIndicator onRetry={handleReset} className="h-[50vh]" />
    }

    if (!isPending && items && items.length === 0) {
      return <EmptyIndicator onAction={handleReset} className="h-[50vh]" />
    }

    if (isPending) {
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items && items.map((item) => <Product key={item.id} item={item} />)}
        </div>
        {hasNextPage && (
          <div className="flex justify-center mt-4">
            <Button
              loading={isFetchingNextPage}
              variant="outline"
              onClick={() => fetchNextPage()}>
              {t("viewMore")}
            </Button>
          </div>
        )}
      </div>
    )
  }, [
    fetchNextPage,
    handleReset,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    items,
    t
  ])

  return (
    <div className="md:col-span-3">
      <div className="flex flex-col gap-4">
        <div className="sticky top-0 z-10 bg-background py-2">
          <FormCategory
            form={form}
            name="category"
            childrenProps={{ options: CATEGORY_OPTIONS }}
          />
        </div>
        {renderContent()}
        <Loading loading={isPending} />
      </div>
    </div>
  )
}

export default SearchResult
