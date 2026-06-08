import { ROUTES } from "@/constants/routes";
import { ArrowRight, ImageOff } from "lucide-react";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { DescriptionCard, TitleCard } from "../util/card-content";
import Image from "next/image";
import { Project } from "@/features/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={ROUTES.PROJECT_DETAIL(project.id)}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border"
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted relative">
          {project.images && project.images.length > 0 ? (
            <Image
              src={project.images[0].image_url}
              alt={`${project.name}-image`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col space-y-2 items-center justify-center h-full ">
              <ImageOff />
              <span className="text-sm">No Image</span>
            </div>
          )}
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
