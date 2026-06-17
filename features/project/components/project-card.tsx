import { ROUTES } from "@/constants/routes";
import { Project } from "@/features/project";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../../../components/ui/aspect-ratio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative group block overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border">
        <div className="">
          <Link
            href={ROUTES.PROJECT_DETAIL(project.id)}
            className="absolute inset-0 z-10"
            prefetch={false}
          />

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
          <h1 className="text-lg font-bold h-12">{project.name}</h1>

          <span className="text-sm text-muted-foreground h-12 line-clamp-1">
            {project.description}
          </span>

          <div className="flex items-center gap-2 text-primary text-sm font-semibold">
            <span>Lihat Detail</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
