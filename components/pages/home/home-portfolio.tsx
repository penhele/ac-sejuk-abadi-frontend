import { PortfolioProps } from "@/types/portofolio";
import PortofolioCard from "@/components/cards/portofolio-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export default function HomePortfolio() {
  const featuredProjects: PortfolioProps[] = [
    {
      id: "porto-01",
      title: "Apartemen Sudirman Park",
      description:
        "Pemasangan 4 unit AC Split Daikin Inverter dan instalasi pipa tembaga premium untuk hunian mewah.",
      image: "/images/portofolio/apartemen.png",
      category: "Residential",
    },
    {
      id: "porto-02",
      title: "Bursa Efek Indonesia",
      description:
        "Perawatan rutin sistem AC Central (Chiller) dan pembersihan cooling tower secara berkala.",
      image: "/images/portofolio/office.png",
      category: "Office",
    },
    {
      id: "porto-03",
      title: "RS Pondok Indah",
      description:
        "Instalasi sistem tata udara khusus ruang operasi dengan standar filtrasi HEPA tingkat tinggi.",
      image: "/images/portofolio/hero-bg.png",
      category: "Industrial",
    },
  ];

  return (
    <section className="py-20 mb-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Proyek Terbaru
          </h2>
          <p className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight uppercase">
            Hasil Kerja <span className="text-primary italic">Profesional</span>{" "}
            Kami
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-slate-200 hover:bg-slate-50 font-bold px-6"
        >
          <Link href="/portofolio" className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Semua Proyek
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => (
          <PortofolioCard key={project.id} portofolio={project} />
        ))}
      </div>
    </section>
  );
}
