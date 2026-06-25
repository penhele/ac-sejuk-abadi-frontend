import { ROUTES } from "@/constants/routes";
import { Project } from "@/features/project";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import { formatDate } from "@/lib/format/date";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1.5"
    >
      <Link
        href={ROUTES.PROJECT_DETAIL(project.id)}
        className="absolute inset-0 z-10"
        prefetch={false}
      />

      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl bg-muted border border-border/40 shadow-xs">
        <AspectRatio ratio={16 / 10}>
          {project.images && project.images.length > 0 ? (
            <Image
              src={project.images[0].image_url}
              alt={`${project.name}-image`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col space-y-2 items-center justify-center h-full text-muted-foreground">
              <ImageOff className="w-8 h-8 stroke-[1.5]" />
              <span className="text-xs font-medium">No Image</span>
            </div>
          )}
        </AspectRatio>

        {/* Floating Category Badge */}
        {project.category && (
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] tracking-wider uppercase bg-white/90 dark:bg-black/80 backdrop-blur-xs border border-border/40 text-foreground rounded-md py-1 px-2.5 font-bold shadow-xs">
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="pt-4 flex flex-col flex-1">
        {/* Metadata: Location & Date */}
        {(project.location || project.date) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium mb-2">
            {project.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 stroke-[1.8]" />
                {project.location}
              </span>
            )}
            {project.location && project.date && (
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            )}
            {project.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 stroke-[1.8]" />
                {formatDate(project.date)}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-1.5">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3.5 flex-1">
          {project.description}
        </p>

        {/* Action Button */}
        <div className="flex items-center gap-1.5 text-primary text-xs font-bold mt-auto pt-1">
          <span>Lihat Proyek</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
