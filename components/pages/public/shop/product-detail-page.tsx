"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import CarouselProduct from "@/components/carousel/carousel-product";
import ProductDetailContent from "@/components/contents/product-detail-content";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProductFallback from "@/components/fallback/product-fallback";
import ProductDetailSkeleton from "@/components/skeletons/product-detail-skeleton";
import { HeaderSection } from "@/components/util/header";
import { ROUTES } from "@/constants/routes";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-between-section">
      <BreadcrumbComponent />

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent id={id} />
        </Suspense>
      </ErrorBoundary>

      <div className="">
        <HeaderSection title="Produk Serupa" href={ROUTES.SHOP} />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<ProductFallback length={4} />}>
            <CarouselProduct limit={6} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
