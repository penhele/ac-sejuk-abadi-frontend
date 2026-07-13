"use client";

import BackButton from "@/components/buttons/back-button";
import DeleteButton from "@/components/buttons/delete-button";
import { X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { deleteProjectImage } from "../api/delete-project-image";
import { useProject } from "../hooks/use-project";
import { projectKeys } from "../queries/project-keys";
import UploadProjectImageForm from "./upload-project-images-form";

export default function UploadProjectImagesPage() {
  const params = useParams();
  const id = params.id as string;

  const { data } = useProject(id);

  return (
    <div className="space-y-between-items">
      <BackButton />

      <h1 className="text-lg font-bold">Kelola Gambar</h1>

      <div className="grid grid-cols-2 gap-between-card">
        <UploadProjectImageForm id={id} />

        <div className="">
          <h1>Images</h1>

          <div className="grid grid-cols-3 gap-between-card">
            {data?.images.map((item) => (
              <div key={item.id} className="relative aspect-square group">
                <Image
                  src={item.image_url}
                  alt={`${data.name}-${item.id}`}
                  fill
                  className="rounded-lg object-contain bg-muted"
                />

                <DeleteButton
                  mutationFn={() =>
                    deleteProjectImage(item.id_project, item.id)
                  }
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
      </div>
    </div>
  );
}
