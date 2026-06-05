"use client";

import { useBrands } from "@/features/brand/hooks/use-brands";
import { useProducts } from "@/features/product";
import { useProjects } from "@/features/project";
import { Package } from "lucide-react";

const { data: products } = useProducts();
const { data: brands } = useBrands();
const { data: projects } = useProjects();

export const statItems = [
  {
    title: "Total Produk",
    Icon: Package,
    value: products?.meta.total ?? 0,
    description: "Produk tersedia",
  },
  {
    title: "Total Brand",
    Icon: Package,
    value: brands?.length ?? 0,
    description: "Produk tersedia",
  },
  {
    title: "Total Proyek",
    Icon: Package,
    value: projects?.length ?? 0,
    description: "Produk tersedia",
  },
];
