import Image from "next/image";

export default function PortofolioHero() {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden rounded-sm mb-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/portofolio/hero-bg.png"
          alt="Portfolio Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Karya Kami untuk{" "}
          <span className="text-primary italic">Kenyamanan</span> Anda
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Dedikasi kami dalam menghadirkan solusi pendinginan udara yang
          personal, estetik, dan efisien untuk setiap ruangan Anda.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="h-[2px] w-12 bg-primary" />
          <span className="uppercase tracking-[0.2em] text-sm font-semibold text-primary">
            AC Sejuk Abadi
          </span>
          <div className="h-[2px] w-12 bg-primary" />
        </div>
      </div>
    </section>
  );
}
