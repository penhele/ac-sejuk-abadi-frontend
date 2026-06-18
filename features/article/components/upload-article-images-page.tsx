"use client";

import { useParams } from "next/navigation";
import UploadArticleImagesForm from "./upload-article-images-form";

export default function UploadArticleImagesPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="">
      <UploadArticleImagesForm id={id} />
    </div>
  );
}
