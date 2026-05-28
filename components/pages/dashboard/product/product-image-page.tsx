"use client";

import ProductImageGallery from "@/components/gallery/product-image-gallery";
import { useParams } from "next/navigation";

export default function ProductImagePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="">
      <ProductImageGallery id={id} />
    </div>
  );
}
