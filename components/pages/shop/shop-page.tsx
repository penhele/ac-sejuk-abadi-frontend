import ShopBanner from "@/components/banners/shop-banner";
import BreadcrumbComponent from "@/components/breadcrumb-component";
import LoadMoreButton from "@/components/buttons/load-more-button";
import SearchFilter from "@/components/filters/search-filter";
import ShopFilter from "@/components/filters/shop-filter";
import SortByPriceFilter from "@/components/filters/sort-filter";
import ProductGrid from "@/components/grid/product-grid";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import TotalItems from "@/components/total-items";
import { Skeleton } from "@/components/ui/skeleton";
import getBrandsQueryOptions from "@/hooks/queries/brand-queries";
import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../fallback/error-fallback";

export default async function ShopPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchInfiniteQuery(
      getProductsInfiniteQueryOptions({ page: 1, limit: 6 }),
    );

    await queryClient.prefetchQuery(getBrandsQueryOptions());
  } catch (error) {
    console.error("Prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-between-section">
        <ShopBanner />

        <BreadcrumbComponent />

        <div className="flex flex-row gap-8 items-start">
          <Suspense fallback={<Skeleton className="h-[400px] w-3xs" />}>
            <ShopFilter />
          </Suspense>

          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-center">
              <Suspense fallback={<Skeleton className="h-4 w-16" />}>
                <TotalItems />
              </Suspense>

              <div className="flex gap-4">
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
                <Suspense
                  fallback={
                    <div className="grid grid-cols-3 gap-between-card">
                      {[...Array(3)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                      ))}
                    </div>
                  }
                >
                  <ProductGrid className="grid-cols-3!" />
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
