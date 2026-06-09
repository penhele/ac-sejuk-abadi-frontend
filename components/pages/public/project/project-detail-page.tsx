"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import ProjectDetailContent from "@/components/contents/project-detail-content";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProjectFallback from "@/components/fallback/project-fallback";
import ProjectGrid from "@/components/grid/project-grid";
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
        <HeaderSection title="Lihat Proyek Lainnya" />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<ProjectFallback />}>
            <ProjectGrid limit={4} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}
