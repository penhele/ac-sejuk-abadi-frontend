"use client";

import { useParams } from "next/navigation";
import UploadProjectImageForm from "./upload-project-images-form";

export default function UploadProjectImagesPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="">
      <UploadProjectImageForm id={id} />
    </div>
  );
}
