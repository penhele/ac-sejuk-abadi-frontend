import { useProducts } from "@/features/product";
import { AirVent, BriefcaseBusiness, Package } from "lucide-react";

export default function companyStats(
  totalProducts: number,
  totalBrands: number,
  totalProjects: number,
) {
  return [
    {
      Icon: Package,
      label: "Products",
      value: totalProducts,
      description: "Produk yang sudah terjual",
    },
    {
      Icon: AirVent,
      label: "Brands",
      value: totalBrands,
      description: "Brand AC yang tersedia",
    },
    {
      Icon: BriefcaseBusiness,
      label: "Projects",
      value: totalProjects,
      description: "Proyek yang telah dituntaskan",
    },
  ];
}
