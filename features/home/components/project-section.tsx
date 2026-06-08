"use client";

import CarouselProject from "@/components/carousel/carousel-project";
import ErrorFallback from "@/components/fallback/error-fallback";
import { ROUTES } from "@/constants/routes";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function ProjectSection() {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-10 lg:p-12 border border-slate-200/60 dark:border-slate-800/60 shadow-sm mt-12 mb-12">
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl opacity-70" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="outline" className="px-3 py-1 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
            <Briefcase className="w-3.5 h-3.5 mr-2" />
            Portofolio Proyek
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Karya Terbaik Kami
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl leading-relaxed">
            Eksplorasi berbagai proyek instalasi dan pemeliharaan tata udara yang telah kami kerjakan dengan dedikasi dan standar kualitas tertinggi.
          </p>
        </div>
        
        <Button 
          onClick={() => router.push(ROUTES.PORTOFOLIO)}
          className="w-fit group rounded-full shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          Lihat Semua Portofolio
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="relative z-10 mt-8">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl" />}>
            <CarouselProject />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
