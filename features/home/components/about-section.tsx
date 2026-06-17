"use client";

import { Store, ArrowUpRight } from "lucide-react";
import StatsCard from "./stats-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useProducts } from "@/features/product";
import companyStats from "../data/stats";
import { useProjects } from "@/features/project";
import { useBrands } from "@/features/brand/hooks/use-brands";

export default function AboutSection() {
  const router = useRouter();
  const { data: products } = useProducts();
  const { data: projects } = useProjects();
  const { data: brands } = useBrands();

  const stats = companyStats(
    products?.meta.total ?? 0,
    brands?.length ?? 0,
    projects?.length ?? 0,
  );

  return (
    <div className="relative isolate left-1/2 -translate-x-1/2 w-screen overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-8">
      <div className="relative z-10 grid grid-cols-2 gap-between-section max-w-7xl mx-auto  px-page-inline xl:px-0">
        <div className="flex flex-col space-y-between-items-lg col-span-2 md:col-span-1">
          <Badge variant={"outline"}>Tentang Kami</Badge>

          <div className="space-y-between-items-sm">
            <h1 className="text-3xl font-semibold">
              Solusi Pendingin Ruangan Terpercaya untuk Rumah dan Bisnis Anda
            </h1>
            <p className="text-gray-600 dark:text-white">
              Menyediakan berbagai pilihan AC berkualitas dari merek-merek
              terpercaya dengan harga kompetitif, layanan konsultasi yang ramah,
              serta dukungan instalasi profesional.
            </p>
            <Button
              variant={"ghost"}
              className="underline w-fit text-primary hover:text-primary"
              onClick={() => router.push(ROUTES.SHOP)}
            >
              <Store />
              Kunjungi Toko <ArrowUpRight />
            </Button>
          </div>
          <p className="text-gray-600 dark:text-white">
            <strong>Telah dipercaya</strong> oleh ratusan pelanggan, perusahaan,
            sekolah, perkantoran, dan berbagai instansi di berbagai kota.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-between-card col-span-2 md:col-span-1  ">
          {stats.map((item, index) => (
            <StatsCard
              key={index}
              Icon={item.Icon}
              label={item.label}
              value={item.value}
              description={item.description}
              className={index === 0 ? "col-span-2" : "col-span-1"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
