import BreadcrumbComponent from "@/components/breadcrumb-component";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProjectFallback from "@/features/project/components/project-fallback";
import ProjectGrid from "@/features/project/components/project-grid";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function ProjectPage() {
  return (
    <div className="space-y-between-section">
      <BreadcrumbComponent />

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
