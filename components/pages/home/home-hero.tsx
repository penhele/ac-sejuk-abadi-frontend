import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function HomeHero() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 min-h-[500px] flex items-center mb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero.png"
          alt="Modern AC Installation"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 sm:px-16 py-20 max-w-2xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Kenyamanan Maksimal, Efisiensi Optimal
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight uppercase">
            Solusi <span className="text-primary italic">Pendingin</span> Udara
            Terpercaya
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
            Kami menyediakan layanan instalasi, perawatan, dan pengadaan AC
            terbaik untuk rumah, kantor, dan industri Anda dengan standar
            profesional.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-8 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              <Link href="/shop" className="flex items-center gap-2">
                Lihat Katalog
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full h-14 px-8 text-base font-bold bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all"
            >
              <Link
                href="https://wa.me/your-number"
                className="flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                Konsultasi Gratis
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator or Stats (Optional Decor) */}
      <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-8 text-white/60">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">10+</span>
          <span className="text-[10px] uppercase tracking-widest font-semibold">
            Tahun Pengalaman
          </span>
        </div>
        <div className="h-10 w-[1px] bg-white/20" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">5000+</span>
          <span className="text-[10px] uppercase tracking-widest font-semibold">
            Pelanggan Puas
          </span>
        </div>
      </div>
    </div>
  );
}
