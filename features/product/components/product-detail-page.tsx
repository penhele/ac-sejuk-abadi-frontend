"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import ProductDetailContent from "@/features/product/components/product-detail-content";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProductDetailSkeleton from "@/components/skeletons/product-detail-skeleton";
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
    </div>
  );
}
