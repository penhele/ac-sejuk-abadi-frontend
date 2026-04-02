"use client";

import CarouselBanner from "@/components/carousel/carousel-banner";
import CarouselBrand from "@/components/carousel/carousel-brand";
import PortofolioList from "@/components/lists/portofolio-list";
import ProductList from "@/components/lists/product-list";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { HeaderSection } from "@/components/util/header";
import { DUMMY_PRODUCTS } from "@/constants/products";
import {
  ChartNoAxesColumn,
  ChartNoAxesCombined,
  Handshake,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function HomePage() {
  const banner = [
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
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

      <div className="flex justify-around bg-primary py-8 rounded-lg">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-3xl font-bold text-white">100+</span>
          <span className="text-white">Proyek Selesai</span>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-col items-center space-y-2">
          <span className="text-3xl font-bold text-white">10+</span>
          <span className="text-white">Brand</span>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-col items-center space-y-2">
          <span className="text-3xl font-bold text-white">1200+</span>
          <span className="text-white">Produk</span>
        </div>
      </div>

      <div className="">
        <HeaderSection title="Produk" href="/shop" />
        <ProductList
          className="grid-cols-4!"
          products={DUMMY_PRODUCTS}
          limit={4}
        />
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg">
            <ShieldCheck size={56} />
            <span className="text-lg">Kualitas Tinggi</span>
          </div>
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg">
            <Handshake size={56} />
            <span className="text-lg">Kepuasan Pelanggan</span>
          </div>
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg">
            <Users size={56} />
            <span className="text-lg">Staff Profesional</span>
          </div>
          <div className="space-y-2 flex flex-col items-center bg-muted p-4 border rounded-lg">
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
        <HeaderSection title="Portofolio" href="/portofolio" />
        <PortofolioList />
      </div>
    </main>
  );
}
