"use client";

import Image from "next/image";
import { useProject } from "../hooks/use-project";
import DeleteButton from "@/components/buttons/delete-button";
import { X } from "lucide-react";
import { deleteProjectImage } from "../api/delete-project-image";
import { projectKeys } from "../queries/project-keys";

interface Props {
  id: string;
}

export default function ProjectImageGallery({ id }: Props) {
  const { data: project } = useProject(id);

  return (
    <div className="space-y-between-items-sm">
      <h1 className="font-semibold text-sm">Images</h1>

      <div className="grid grid-cols-3 gap-between-card">
        {project?.images.map((item) => (
          <div key={item.id} className="relative aspect-square group">
            <Image
              src={item.image_url}
              alt={`${project.name}-${item.id}`}
              fill
              className="rounded-lg object-contain bg-muted"
            />

            <DeleteButton
              mutationFn={() => deleteProjectImage(item.id_project, item.id)}
              queryKey={projectKeys.all}
              id={item.id}
              item={item.id.toString()}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              Icon={X}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
