import BreadcrumbComponent from "@/components/breadcrumb-component";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProjectFallback from "@/components/fallback/project-fallback";
import ProjectGrid from "@/components/grid/project-grid";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function ProjectPage() {
  return (
    <div className="space-y-between-section">
      <BreadcrumbComponent />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Proyek Kami
          </h2>
          <p className="text-gray-500 max-w-lg">
            Jelajahi berbagai proyek instalasi dan perawatan AC yang telah kami
            selesaikan dengan standar kualitas tinggi.
          </p>
        </div>
      </div>

      <div className="">
        {/* <TotalItems total={data?.length || 0} /> */}
        <span className="text-sm text-gray-400">
          {/* Menampilkan {projects.length} Proyek Unggulan */}
        </span>
      </div>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<ProjectFallback />}>
          <ProjectGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
