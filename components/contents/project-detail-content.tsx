import { formatDate } from "@/lib/format/date";
import { getProjectById } from "@/services/project.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Building2, Calendar, ImageOff, MapPin } from "lucide-react";
import Image from "next/image";
import { DescriptionSection, HeaderSection } from "../util/header";
import ProductCard from "../cards/product-card";

export default function ProjectDetailContent({ id }: { id: string }) {
  const { data: project } = useSuspenseQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectById(id),
  });

  const products = project.products.map((product) => product.product);

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
                src={project.images?.[0].image_url}
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

      <div className="">
        <HeaderSection title="Deskripsi Proyek" />
        <DescriptionSection description={project.description} />
      </div>

      {/* <div className="grid grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
    </div>
  );
}
