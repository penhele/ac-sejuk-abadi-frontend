import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DescriptionCard, TitleCard } from "../util/card-content";
import { Project } from "@/types/project";
import { ROUTES } from "@/contants/routes";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={ROUTES.PROJECT_DETAIL(project.id)}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border"
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          {/* <Image
            src={project.image!}
            alt={project.title}
            fill
            className="object-cover"
          /> */}
        </AspectRatio>

        <div className="absolute top-4 left-4">
          <span className="text-xs text-primary bg-white border rounded-lg py-1 px-2 font-semibold">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <TitleCard title={project.name} />

        <DescriptionCard description={project.description} />

        <div className="flex items-center gap-2 text-primary text-sm font-semibold">
          <span>Lihat Detail</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
