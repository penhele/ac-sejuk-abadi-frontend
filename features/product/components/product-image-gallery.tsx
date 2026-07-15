"use client";

import Image from "next/image";
import { useProduct } from "../hooks/use-product";
import DeleteButton from "@/components/buttons/delete-button";
import { deleteProductImage } from "../api/delete-product-image";
import { productKeys } from "../queries/product-keys";
import { ImageOff, X } from "lucide-react";

interface Props {
  id: string;
}

export default function ProductImageGallery({ id }: Props) {
  const { data: product } = useProduct(id);

  const productImages = product?.images || [];

  return (
    <div className="space-y-between-items-sm">
      <h1 className="font-semibold text-sm">Images</h1>

      {productImages.length > 0 ? (
        <div className="grid grid-cols-3 gap-between-card">
          {productImages.map((item) => (
            <div key={item.id} className="relative aspect-square group">
              <Image
                src={item.image_url}
                alt={`${product?.name}-${item.id}`}
                fill
                className="rounded-lg object-contain bg-muted"
              />

              <DeleteButton
                mutationFn={() => deleteProductImage(item.id_product, item.id)}
                queryKey={productKeys.all}
                id={item.id}
                item={item.id.toString()}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                Icon={X}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg border border-dashed space-y-2 w-full h-50 flex flex-col items-center justify-center">
          <ImageOff className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Tidak ada gambar
          </span>
        </div>
      )}
    </div>
  );
}
