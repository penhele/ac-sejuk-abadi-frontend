import BreadcrumbComponent from "@/components/breadcrumb-component";
import LoadMoreButton from "@/components/buttons/load-more-button";
import CarouselBanner from "@/components/carousel/carousel-banner";
import SearchFilter from "@/components/filters/search-filter";
import ShopFilter from "@/components/filters/shop-filter";
import SortByPriceFilter from "@/components/filters/sort-filter";
import ProductGrid from "@/components/grid/product-grid";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import TotalItems from "@/components/total-items";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../fallback/error-fallback";
import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import getBrandsQueryOptions from "@/hooks/queries/brand-queries";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ShopPage() {
  const banner = [
    { src: "/images/banners/1.png", name: "Banner" },
    { src: "/images/banners/2.png", name: "Banner" },
    { src: "/images/banners/3.png", name: "Banner" },
  ];

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(getProductsInfiniteQueryOptions());
  await queryClient.prefetchQuery(getBrandsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-between-section">
        <CarouselBanner banner={banner} />

        <BreadcrumbComponent />

        <div className="flex flex-row gap-8 items-start">
          <ShopFilter />

          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-center">
              <Suspense fallback={<Skeleton className="h-4 w-16"/>}>
                <TotalItems />
              </Suspense>

              <div className="flex gap-4">
                <SearchFilter />

                <SortByPriceFilter />
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

            <LoadMoreButton />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
