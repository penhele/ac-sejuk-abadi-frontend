import { useProject } from "@/features/project";
import { formatDate } from "@/lib/format/date";
import { Building2, Calendar, ImageOff, MapPin } from "lucide-react";
import Image from "next/image";
import ErrorFallback from "../../../components/fallback/error-fallback";
import ProjectFallback from "./project-fallback";
import MarkdownRenderer from "@/components/markdown-renderer";
import ProjectImages from "./project-images";
export default function ProjectDetailContent({ id }: { id: string }) {
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return <ProjectFallback />;
  }

  if (!project) {
    return <ErrorFallback />;
  }

  const products = project.products.map((product) => product.product);

  return (
    <div className="space-y-between-section">
      <div className="space-y-8">
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

        <ProjectImages project={project} />
      </div>

      <div className="">
        <h1 className="text-lg font-bold">Deskripsi Proyek</h1>

        <MarkdownRenderer text={project.description} />
      </div>
    </div>
  );
}
