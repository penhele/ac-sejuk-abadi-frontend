import { Package, Building2, FolderKanban } from "lucide-react";
import { useBrands } from "@/features/brand/hooks/use-brands";
import { useProducts } from "@/features/product";
import { useProjects } from "@/features/project";
import { StatItem } from "../types/stat-item";

export function useDashboardStats(): StatItem[] {
  const { data: products } = useProducts();
  const { data: brands } = useBrands();
  const { data: projects } = useProjects();

  return [
    {
      title: "Total Produk",
      description: "Produk tersedia",
      value: products?.meta.total ?? 0,
      Icon: Package,
      color: "emerald",
    },
    {
      title: "Total Brand",
      description: "Brand terdaftar",
      value: brands?.length ?? 0,
      Icon: Building2,
      color: "indigo",
    },
    {
      title: "Total Proyek",
      description: "Proyek aktif",
      value: projects?.length ?? 0,
      Icon: FolderKanban,
      color: "sky",
    },
  ];
}
