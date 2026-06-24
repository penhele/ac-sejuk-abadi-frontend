import BreadcrumbComponent from "@/components/breadcrumb-component";
import ErrorFallback from "@/components/fallback/error-fallback";
import HeroSection from "@/components/sections/hero-section";
import ProjectFallback from "@/features/project/components/project-fallback";
import ProjectGrid from "@/features/project/components/project-grid";
import { Briefcase } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function ProjectPage() {
  return (
    <div className="space-y-between-section">
      <HeroSection
        title="Karya Terbaik Kami"
        description="Jelajahi berbagai proyek instalasi dan perawatan AC yang telah kami selesaikan dengan standar kualitas tinggi."
        Icon={Briefcase}
        IconLabel="Portofolio"
      />

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
