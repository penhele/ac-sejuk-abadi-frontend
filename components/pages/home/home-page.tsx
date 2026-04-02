"use client";

import CarouselBanner from "@/components/carousel/carousel-banner";
import CarouselBrand from "@/components/carousel/carousel-brand";
import PortofolioList from "@/components/lists/portofolio-list";
import ProductList from "@/components/lists/product-list";
import { HeaderSection } from "@/components/util/header";
import { ProductType } from "@/types/product";

export default function HomePage() {
  const DUMMY_PRODUCTS: ProductType[] = [
    {
      id: "p1",
      name: "Midea AC Standard Gold Fin",
      description:
        "Lapisan anti karat ganda yang tahan lama dan mendinginkan lebih cepat.",
      type: "Split Wall",
      price: 2450000,
      pk: 0.5,
      quantity: 15,
      brandId: "midea-01",
      createdAt: "2024-01-10T08:00:00Z",
      updatedAt: "2024-01-10T08:00:00Z",
    },
    {
      id: "p2",
      name: "Daikin Thailand FTNE Series",
      description:
        "AC Thailand yang terkenal dengan ketahanan kompresor dan efisiensi tinggi.",
      type: "Split Wall",
      price: 4200000,
      pk: 1,
      quantity: 8,
      brandId: "daikin-01",
      createdAt: "2024-01-12T09:00:00Z",
      updatedAt: "2024-01-12T09:00:00Z",
    },
    {
      id: "p3",
      name: "Sharp Sayonara Zen Plasmacluster",
      description:
        "Teknologi ion generator untuk udara lebih bersih dan bebas bakteri.",
      type: "Inverter",
      price: 3850000,
      pk: 0.75,
      quantity: 12,
      brandId: "sharp-01",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "p4",
      name: "LG Dual Inverter Eco",
      description: "Hemat listrik hingga 70% dengan teknologi kompresor ganda.",
      type: "Inverter",
      price: 3600000,
      pk: 0.5,
      quantity: 0, // Contoh stok habis
      brandId: "lg-01",
      createdAt: "2024-01-18T11:00:00Z",
      updatedAt: "2024-01-18T11:00:00Z",
    },
    {
      id: "p5",
      name: "Panasonic Standard Non-Inverter",
      description:
        "Eco-tough casing yang tahan terhadap cuaca ekstrem di luar ruangan.",
      type: "Split Wall",
      price: 3100000,
      pk: 0.5,
      quantity: 20,
      brandId: "panasonic-01",
      createdAt: "2024-01-20T12:00:00Z",
      updatedAt: "2024-01-20T12:00:00Z",
    },
    {
      id: "p6",
      name: "Gree Combo Split Multi",
      description:
        "Satu outdoor untuk dua indoor, solusi hemat tempat untuk apartemen.",
      type: "Multi Split",
      price: 7500000,
      pk: 2,
      quantity: 4,
      brandId: "gree-01",
      createdAt: "2024-01-22T13:00:00Z",
      updatedAt: "2024-01-22T13:00:00Z",
    },
    {
      id: "p7",
      name: "Samsung WindFree Lite",
      description:
        "Mendinginkan tanpa hembusan angin langsung yang menusuk kulit.",
      type: "Inverter",
      price: 4900000,
      pk: 1,
      quantity: 6,
      brandId: "samsung-01",
      createdAt: "2024-01-25T14:00:00Z",
      updatedAt: "2024-01-25T14:00:00Z",
    },
    {
      id: "p8",
      name: "Aqua Japan Turbo Cool",
      description:
        "Fitur turbo cooling mendinginkan ruangan hanya dalam waktu 5 menit.",
      type: "Split Wall",
      price: 2300000,
      pk: 0.5,
      quantity: 18,
      brandId: "aqua-01",
      createdAt: "2024-01-28T15:00:00Z",
      updatedAt: "2024-01-28T15:00:00Z",
    },
  ];

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

      <div className="">
        <HeaderSection title="Produk" href="/shop" />
        <ProductList className="grid-cols-4!" products={DUMMY_PRODUCTS} limit={4} />
      </div>

      <div className="">
        <HeaderSection title="Portofolio" href="/portofolio" />
        <PortofolioList />
      </div>
    </main>
  );
}
