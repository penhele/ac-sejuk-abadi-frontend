import ErrorFallback from "@/components/fallback/error-fallback";
import ProjectGrid from "@/components/grid/project-grid";
import PortofolioList from "@/components/lists/project-list";
import ProjectCardSkeleton from "@/components/skeletons/project-card-skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function PortofolioPage() {
  return (
    <div className="space-y-between-section">
      <AspectRatio
        ratio={3 / 1}
        className="overflow-hidden rounded-lg bg-muted"
      />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Portofolio</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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

        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList variant="line" className="w-full md:w-auto justify-start">
            <TabsTrigger value="all" className="px-6">
              Semua
            </TabsTrigger>
            <TabsTrigger value="apartemen" className="px-6">
              Apartemen
            </TabsTrigger>
            <TabsTrigger value="ruko" className="px-6">
              Ruko
            </TabsTrigger>
            <TabsTrigger value="kantor" className="px-6">
              Kantor
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="">
        <span className="text-sm text-gray-400">
          Menampilkan 4 Proyek Unggulan
        </span>
      </div>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense
          fallback={
            <div className="grid grid-cols-3 gap-between-card">
              {[...Array(3)].map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <ProjectGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
