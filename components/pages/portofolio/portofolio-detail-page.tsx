import PortofolioList from "@/components/lists/portofolio-list";
import ProductList from "@/components/lists/product-list";
import { Separator } from "@/components/ui/separator";
import { DescriptionSection, HeaderSection } from "@/components/util/header";
import {
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  Settings,
} from "lucide-react";
import Image from "next/image";

export default function PortofolioDetailPage() {
  return (
    <div className="space-y-16">
      {/* Detail Hero Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <Building2 className="w-4 h-4" />
              <span>Apartemen Premium</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Luxury Apartemen Menteng
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Menteng, Jakarta Pusat</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Selesai: Maret 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-125">
          <div className="md:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/portofolio/apartemen.png"
              alt="Main Project Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/portofolio/hero-bg.png"
                alt="Detail 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/portofolio/office.png"
                alt="Detail 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description and Specs */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-6">
          <HeaderSection title="Deskripsi Proyek" />
          <div className="space-y-4">
            <DescriptionSection
              description="Proyek ini melibatkan perancangan dan instalasi sistem tata udara
              terpadu untuk unit apartemen mewah di kawasan Menteng. Tantangan
              utama adalah menjaga efisiensi energi sambil memastikan unit
              indoor tidak mengganggu estetika interior yang minimalis dan
              elegan."
            />
            <DescriptionSection
              description="Kami menggunakan sistem Daikin Multi-S yang memungkinkan beberapa
              unit indoor terhubung ke satu unit outdoor, menghemat ruang di
              area balkon dan mengurangi kebisingan."
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-slate-50 border space-y-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="block text-xs font-semibold text-gray-500 uppercase">
                Efisiensi Energi
              </span>
              <span className="text-sm font-bold">Inverter Technology</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border space-y-2">
              <Settings className="w-5 h-5 text-primary" />
              <span className="block text-xs font-semibold text-gray-500 uppercase">
                Kontrol
              </span>
              <span className="text-sm font-bold">Smart Home Sync</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border space-y-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="block text-xs font-semibold text-gray-500 uppercase">
                Kapasitas
              </span>
              <span className="text-sm font-bold">3 HP Total</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-900 text-white rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold">Produk Digunakan</h3>
            <Separator className="bg-gray-700" />
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Unit Outdoor</span>
                <span className="font-medium">Daikin Multi-S 3 Connection</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Unit Indoor</span>
                <span className="font-medium">2x Wall Mounted, 1x Duct</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Pemipaan</span>
                <span className="font-medium">Premium Copper Insulated</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Pesan Layanan Serupa
            </button>
          </div>
        </div>
      </section>

      {/* Product Table and Cards */}
      <section className="space-y-8">
        <HeaderSection title="Produk yang digunakan" />

        <ProductList className="grid-cols-4!" />
      </section>

      {/* NEW: Related Projects Section */}
      <section className="space-y-8">
        <HeaderSection title="Lihat Proyek Lainnya" />

        <PortofolioList />
      </section>
    </div>
  );
}
