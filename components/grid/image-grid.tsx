import { ROUTES } from "@/constants/routes";
import { getProductByIdQueryOptions } from "@/hooks/queries/product-queries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import DeleteImageButton from "../buttons/delete-image-button";

export default function ImageGrid({ id }: { id: string }) {
  const { data: products } = useQuery(getProductByIdQueryOptions(id));

  return (
    <div className="grid grid-cols-4 gap-between-card">
      {products?.images.map((image) => (
        <div
          key={image.id}
          className="group relative aspect-square bg-muted/50 rounded-sm border border-dashed"
        >
          <Image
            src={image.image_url}
            alt={products.name}
            fill
            className="object-contain"
          />

          <DeleteImageButton
            className="opacity-0 group-hover:opacity-100 absolute top-2 right-2"
            idProduct={id}
            idImage={image.id}
          />
        </div>
      ))}
    </div>
  );
}
