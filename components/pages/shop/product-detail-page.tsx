"use client";

import ErrorFallback from "@/components/fallback/error-fallback";
import ProductGrid from "@/components/grid/product-grid";
import ProductDetailContent from "@/components/contents/product-detail-content";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import { HeaderSection } from "@/components/util/header";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProductDetailSkeleton from "@/components/skeletons/product-detail-skeleton";
import { ROUTES } from "@/contants/routes";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-between-section">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent id={id} />
        </Suspense>
      </ErrorBoundary>

      <div className="">
        <HeaderSection title="Produk Serupa" href={ROUTES.SHOP} />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense
            fallback={
              <div className="grid grid-cols-3 gap-between-card">
                {[...Array(4)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <ProductGrid className="grid-cols-4!" limit={4} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
