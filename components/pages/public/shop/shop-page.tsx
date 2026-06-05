import BreadcrumbComponent from "@/components/breadcrumb-component";
import LoadMoreButton from "@/components/buttons/load-more-button";
import CarouselBanner from "@/components/carousel/carousel-banner";
import ProductFallback from "@/components/fallback/product-fallback";
import SearchFilter from "@/components/filters/search-filter";
import ShopFilter from "@/components/filters/shop-filter";
import SortByPriceFilter from "@/components/filters/sort-filter";
import ProductGrid from "@/components/grid/product-grid";
import TotalItems from "@/components/total-items";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductsInfiniteQueryOptions } from "@/features/product";
import { getAcTypesQueryOptions } from "@/features/acType/queries/ac-type-queries";
import { getCategoriesQueryOptions } from "@/features/category/queries/category-queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../../fallback/error-fallback";

export default async function ShopPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(getProductsInfiniteQueryOptions());
  await queryClient.prefetchQuery(getAcTypesQueryOptions());
  await queryClient.prefetchQuery(getCategoriesQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-between-section">
        <CarouselBanner />

        <BreadcrumbComponent />
        <div className="flex flex-row gap-8 items-start">
          <Suspense>
            <ShopFilter className="hidden lg:block" />
          </Suspense>

          <div className="flex-1 space-y-8">
            <div className="flex flex-col-reverse gap-4 sm:flex-row w-full justify-between items-center">
              <Suspense fallback={<Skeleton className="h-4 w-16" />}>
                <TotalItems className="w-full" />
              </Suspense>

              <div className="flex gap-4 w-full">
                <Suspense fallback={<Skeleton className="h-10 w-40" />}>
                  <SearchFilter />
                </Suspense>

                <Suspense fallback={<Skeleton className="h-10 w-40" />}>
                  <SortByPriceFilter />
                </Suspense>
              </div>
            </div>

            <div className="">
              <ErrorBoundary fallback={<ErrorFallback />}>
                <Suspense fallback={<ProductFallback length={3} />}>
                  <ProductGrid className="grid-cols-4!" />
                </Suspense>
              </ErrorBoundary>
            </div>

            <Suspense fallback={<Skeleton className="h-10 w-full" />}>
              <LoadMoreButton />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
