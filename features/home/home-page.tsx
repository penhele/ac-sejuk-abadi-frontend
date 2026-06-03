import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AirVent,
  ArrowUpRight,
  ShoppingCart,
  Sparkles,
  Store,
} from "lucide-react";
import StatsCard from "./components/stats-card";
import AboutSection from "./components/about-section";
import CarouselProduct from "@/components/carousel/carousel-product";
import ProductSection from "./components/product-section";

export default function HomePage() {
  const stats = [
    {
      label: "Products",
      value: "1000",
      description: "Produk yang sudah terjual",
      Icon: ShoppingCart,
    },
    {
      label: "Brands",
      value: "10",
      description: "Merek AC dan perlengkapan tersedia",
      Icon: Sparkles,
    },
    {
      label: "Projects",
      value: "100",
      description: "Proyek instalasi berhasil dituntaskan",
      Icon: AirVent,
    },
  ];

  return (
    <div className="space-y-between-section">
      <AboutSection />

      <ProductSection />
    </div>
  );
}
