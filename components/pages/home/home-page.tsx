import ShopBanner from "@/components/banners/shop-banner";
import CarouselBrand from "@/components/carousel/carousel-brand";
import CarouselTestimoni from "@/components/carousel/carousel-testimoni";
import ErrorFallback from "@/components/fallback/error-fallback";
import ProductFallback from "@/components/fallback/product-fallback";
import ProductGrid from "@/components/grid/product-grid";
import ProjectGrid from "@/components/grid/project-grid";
import StatsSection from "@/components/sections/stats-section";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import ProjectCardSkeleton from "@/components/skeletons/project-card-skeleton";
import { HeaderSection } from "@/components/util/header";
import { ROUTES } from "@/constants/routes";
import {
  ChartNoAxesCombined,
  Handshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function HomePage() {
  return (
    <main className="space-y-16">
      <ShopBanner />

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
          <Suspense fallback={<ProductFallback length={4} />}>
            <ProductGrid length={4} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-2 gap-2 lg:gap-4">
          <div className="space-y-2 flex flex-col items-center justify-center bg-muted p-6 border rounded-lg transition-colors hover:border-gray-600">
            <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-primary" />
            <span className="text-base md:text-lg text-center font-medium">
              Kualitas Tinggi
            </span>
          </div>

          <div className="space-y-2 flex flex-col items-center justify-center bg-muted p-6 border rounded-lg transition-colors hover:border-gray-600">
            <Handshake className="w-10 h-10 md:w-14 md:h-14 text-primary" />
            <span className="text-base md:text-lg text-center font-medium">
              Kepuasan Pelanggan
            </span>
          </div>

          <div className="space-y-2 flex flex-col items-center justify-center bg-muted p-6 border rounded-lg transition-colors hover:border-gray-600">
            <Users className="w-10 h-10 md:w-14 md:h-14 text-primary" />
            <span className="text-base md:text-lg text-center font-medium">
              Staff Profesional
            </span>
          </div>

          <div className="space-y-2 flex flex-col items-center justify-center bg-muted p-6 border rounded-lg transition-colors hover:border-gray-600">
            <ChartNoAxesCombined className="w-10 h-10 md:w-14 md:h-14 text-primary" />
            <span className="text-base md:text-lg text-center font-medium">
              Skala Proyek
            </span>
          </div>
        </div>

        {/* Bagian Teks (Kanan saat desktop, Utama/Atas saat mobile menggunakan order-1) */}
        <div className="order-1 lg:order-2 space-y-4 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Kenapa harus kami?
          </h2>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
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
            <ProjectGrid limit={3} />
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
