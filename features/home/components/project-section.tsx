"use client";

import ProjectGrid from "@/features/project/components/project-grid";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useProjects } from "@/features/project";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectCarousel from "./project-carousel";

export default function ProjectSection() {
  const router = useRouter();
  const { data: projects } = useProjects();

  return (
    <section className="relative isolate left-1/2 -translate-x-1/2 w-screen overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-8">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-page-inline xl:px-0">
        <div className="relative z-40 flex flex-col md:flex-row md:items-end justify-between">
          <div className="w-full space-y-between-items-lg">
            <div className="flex flex-col space-x-4 space-y-4 md:space-y-0 md:flex-row justify-between">
              <div className="max-w-2xl space-y-2">
                <h1 className="text-3xl font-semibold">
                  Berpengalaman Menyelesaikan Lebih dari {projects?.length}{" "}
                  Proyek Instalasi HVAC
                </h1>
                <span className="text-muted-foreground">
                  Jelajahi berbagai proyek yang telah berhasil kami kerjakan
                  untuk klien dari berbagai sektor industri.
                </span>
              </div>

              <Button
                onClick={() => router.push(ROUTES.PORTOFOLIO)}
                size="lg"
                variant={"outline"}
                className="group"
              >
                Lihat Semua Portofolio
                <ArrowUpRight className="transition group-hover:-rotate-45 " />
              </Button>
            </div>

            <ProjectCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
