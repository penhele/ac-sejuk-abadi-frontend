import { getProjectById } from "@/services/project.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Building2,
  Calendar,
  CheckCircle2,
  ImageOff,
  MapPin,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { formatDate } from "../util/formatter";
import { DescriptionSection, HeaderSection } from "../util/header";
import { Separator } from "../ui/separator";

export default function ProjectDetailContent({ id }: { id: string }) {
  const { data: project } = useSuspenseQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectById(id),
  });

  return (
    <div className="space-y-between-section">
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <Building2 className="w-4 h-4" />
              <span>{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Selesai: {formatDate(project.date)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-125">
          {project.images?.[0] ? (
            <div className="md:col-span-8 relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={project.images?.[0]}
                alt="Main Project Image"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2 justify-center items-center md:col-span-8 relative rounded-lg overflow-hidden bg-muted shadow-sm">
              <ImageOff size={40} className="text-gray-400" />
              <span className="font-bold text-gray-600">No Image</span>
            </div>
          )}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="flex flex-col items-center justify-center space-y-2 relative rounded-lg overflow-hidden bg-muted shadow-lg">
              <ImageOff size={20} className="text-gray-400" />
              <span className="font-bold text-sm text-gray-600">No Image</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 relative rounded-lg overflow-hidden bg-muted shadow-lg">
              <ImageOff size={20} className="text-gray-400" />
              <span className="font-bold text-sm text-gray-600">No Image</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-6">
          <HeaderSection title="Deskripsi Proyek" />
          <div className="space-y-4">
            <DescriptionSection description={project.description} />
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
          <div className="bg-gray-900 text-white rounded-lg p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold">Produk Digunakan</h3>
            <Separator className="bg-gray-700" />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Unit Outdoor</span>
                <span className="font-medium">{project.product.name}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Pesan Layanan Serupa
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
