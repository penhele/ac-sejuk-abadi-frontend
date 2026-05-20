"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import ProjectDetailContent from "@/components/contents/project-detail-content";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProductFallback from "@/components/fallback/product-fallback";
import ProjectFallback from "@/components/fallback/project-fallback";
import ProductGrid from "@/components/grid/product-grid";
import ProjectGrid from "@/components/grid/project-grid";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import ProjectCardSkeleton from "@/components/skeletons/project-card-skeleton";
import { HeaderSection } from "@/components/util/header";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-between-section">
      <BreadcrumbComponent />

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <ProjectDetailContent id={id} />
        </Suspense>
      </ErrorBoundary>

      <section className="space-y-8">
        <HeaderSection title="Produk yang digunakan" />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<ProductFallback length={4} />}>
            <ProductGrid length={4} />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="space-y-8">
        <HeaderSection title="Lihat Proyek Lainnya" />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<ProjectFallback />}>
            <ProjectGrid />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}
