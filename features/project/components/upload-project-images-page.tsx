"use client";

import { useParams } from "next/navigation";
import UploadProjectImageForm from "./upload-project-images-form";
import { useProject } from "../hooks/use-project";
import Image from "next/image";

export default function UploadProjectImagesPage() {
  const params = useParams();
  const id = params.id as string;

  const { data } = useProject(id);

  return (
    <div className="space-y-between-items">
      <h1 className="text-lg font-bold">Kelola Gambar</h1>

      <div className="grid grid-cols-2 gap-between-card">
        <UploadProjectImageForm id={id} />

        <div className="">
          <h1>Images</h1>

          <div className="grid grid-cols-3 gap-between-card">
            {data?.images.map((item) => (
              <div className="relative aspect-square ">
                <Image
                  src={item.image_url}
                  alt={`${data.name}-${item.id}`}
                  fill
                  className="rounded-lg object-contain bg-muted"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
