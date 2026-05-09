import CarouselBanner from "@/components/carousel/carousel-banner";
import CarouselBrand from "@/components/carousel/carousel-brand";
import CarouselTestimoni from "@/components/carousel/carousel-testimoni";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProductGrid from "@/components/grid/product-grid";
import ProjectGrid from "@/components/grid/project-grid";
import StatsSection from "@/components/sections/stats-section";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import ProjectCardSkeleton from "@/components/skeletons/project-card-skeleton";
import { HeaderSection } from "@/components/util/header";
import { ROUTES } from "@/contants/routes";
import {
  ChartNoAxesCombined,
  Handshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function HomePage() {
  const banner = [
    { src: "/images/banners/1.png", name: "Banner" },
    { src: "/images/banners/2.png", name: "Banner" },
    { src: "/images/banners/3.png", name: "Banner" },
  ];

  return (
    <main className="space-y-16">
      <div className="">
        <CarouselBanner banner={banner} />
      </div>

      <div className="space-y-4 flex flex-col items-center">
        <h1 className="text-xl font-bold">
          Menyediakan Unit AC dari Brand Terkemuka Dunia
        </h1>
        <CarouselBrand />
      </div>

      <StatsSection />

      <div className="">
        <HeaderSection title="Produk" href={ROUTES.SHOP} />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense
            fallback={
              <div className="grid grid-cols-4 gap-between-card">
                {[...Array(4)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <ProductGrid />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 grid grid-cols-2 gap-between-card">
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg transition-colors hover:border-gray-600">
            <ShieldCheck size={56} />
            <span className="text-lg">Kualitas Tinggi</span>
          </div>
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg transition-colors hover:border-gray-600">
            <Handshake size={56} />
            <span className="text-lg">Kepuasan Pelanggan</span>
          </div>
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg transition-colors hover:border-gray-600">
            <Users size={56} />
            <span className="text-lg">Staff Profesional</span>
          </div>
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg transition-colors hover:border-gray-600">
            <ChartNoAxesCombined size={56} />
            <span className="text-lg">Skala Proyek</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Kenapa harus kami?</h1>

          <p className="">
            Dengan pengalaman bertahun-tahun di industri ini, kami menawarkan
            solusi HVAC yang dirancang khusus untuk memenuhi kebutuhan Anda.
            Teknisi kami yang terlatih secara profesional siap memberikan
            instalasi, pemeliharaan, dan perbaikan yang andal, memastikan sistem
            HVAC Anda bekerja secara optimal sepanjang tahun.
          </p>
        </div>
      </div>

      <div className="">
        <HeaderSection title="Portofolio" href={ROUTES.PORTOFOLIO} />
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

      <div className="">
        <h1 className="text-2xl font-bold text-center">
          Kata Mereka Tentang Kami
        </h1>
        <CarouselTestimoni />
        <p className="text-center text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
          molestiae!
        </p>
      </div>
    </main>
  );
}
