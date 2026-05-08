"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import LoadMoreButton from "@/components/buttons/load-more-button";
import CarouselBanner from "@/components/carousel/carousel-banner";
import ShopFilter from "@/components/filters/shop-filter";
import ProductGrid from "@/components/grid/product-grid";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getProductsInfiniteQueryOptions,
  getProductsQueryOptions,
} from "@/hooks/queries/product-queries";
import { usePrefetchInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../fallback/error-fallback";
import TotalItems from "@/components/total-items";

export default function ShopPage() {
  const banner = [
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
  ];

  usePrefetchInfiniteQuery(getProductsInfiniteQueryOptions());
  const { data } = useQuery(getProductsQueryOptions());

  return (
    <div className="space-y-between-section">
      <CarouselBanner banner={banner} />

      <BreadcrumbComponent />

      <div className="flex flex-row gap-8 items-start">
        <ShopFilter />

        <div className="flex-1 space-y-8">
          <div className="flex justify-between items-center">
            <TotalItems total={data?.data.length || 0} />

            <div className="flex gap-4">
              <div className="flex space-x-2 items-center">
                <span className="w-full text-gray-600 text-sm">
                  Urutkan dari :
                </span>

                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Default Sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Harga Termurah</SelectItem>
                      <SelectItem value="banana">Harga Termahal</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
  );
}
