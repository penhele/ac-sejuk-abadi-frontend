import { ROUTES } from "@/constants/routes";
import { getProductByIdQueryOptions } from "@/hooks/queries/product-queries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

export default function ImageGrid({ id }: { id: string }) {
  const { data: products } = useQuery(getProductByIdQueryOptions(id));

  return (
    <div className="grid grid-cols-2 gap-between-card">
      <Link
        href={ROUTES.DASHBOARD_UPLOAD_PRODUCT_IMAGES(id)}
        className="border border-dashed rounded-sm aspect-square flex flex-col gap-1 items-center justify-center bg-muted/25 transition hover:bg-muted/50"
      >
        <Button variant={"outline"} size={"xs"}>
          <ExternalLink />
        </Button>
        <p className="text-xs">Add new images</p>
      </Link>

      {products?.images.map((image) => (
        <div
          key={image.id}
          className="relative aspect-square bg-muted/50 rounded-sm border border-dashed"
        >
          <Image
            src={image.image_url}
            alt={products.name}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
