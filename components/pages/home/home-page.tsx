import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/lists/product-list";
import { Button } from "@/components/ui/button";
import HomeHero from "./home-hero";
import BrandShowcase from "./brand-showcase";
import WhyUs from "./why-us";
import HomePortfolio from "./home-portfolio";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <HomeHero />

      {/* Brand Partners Showcase */}
      <BrandShowcase />

      {/* Featured Products Section */}
      <section className="py-20 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Katalog Produk</h2>
            <p className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight uppercase">
              Pilihan <span className="text-primary italic">Terbaik</span> Untuk Anda
            </p>
          </div>
          
          <Tabs defaultValue="new-arrival" className="w-full md:w-auto">
            <TabsList variant="line" className="bg-transparent border-b-0 gap-8 h-12">
              <TabsTrigger value="new-arrival" className="text-xs font-bold uppercase tracking-widest px-0 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full transition-all">
                New Arrival
              </TabsTrigger>
              <TabsTrigger value="best-selling" className="text-xs font-bold uppercase tracking-widest px-0 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full transition-all">
                Best Selling
              </TabsTrigger>
              <TabsTrigger value="top-rated" className="text-xs font-bold uppercase tracking-widest px-0 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full transition-all">
                Top Rated
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ProductList className="lg:grid-cols-4" />

        <div className="mt-16 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full font-bold px-10 h-14 border-slate-200 hover:bg-slate-50 group">
            <Link href="/shop" className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Eksplorasi Seluruh Katalog
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyUs />

      {/* Portofolio Highlights */}
      <HomePortfolio />

      {/* Final Call to Action Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-primary py-20 px-8 sm:px-16 text-center">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-slate-900/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight uppercase">
            Siap Menciptakan Lingkungan yang Lebih <span className="text-slate-900">Sejuk</span> dan <span className="text-slate-900">Nyaman</span>?
          </h2>
          <p className="text-white/80 text-lg">
            Hubungi tim ahli kami hari ini untuk konsultasi gratis mengenai kebutuhan AC Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full h-16 px-10 bg-slate-900 text-white hover:bg-slate-800 font-bold text-lg shadow-xl shadow-slate-900/20">
              <Link href="https://wa.me/your-number">Hubungi WhatsApp</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
