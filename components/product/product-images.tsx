import { Product } from "@/types/product";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export default function ProductImages({
  product,
  jumlah,
}: {
  product: Product;
  jumlah: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <AspectRatio ratio={1 / 1} className="bg-muted rounded-md">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].image_url}
              alt={`${product.name}-image`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col space-y-2 items-center justify-center h-full ">
              <ImageOff />
              <span className="text-sm">No Image</span>
            </div>
          )}
        </AspectRatio>
      </div>

      {jumlah > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: jumlah - 1 }).map((_, index) => {
            if (index >= 5) return null;

            return (
              <AspectRatio
                key={index}
                ratio={1 / 1}
                className="bg-muted rounded-md relative overflow-hidden"
              >
                <Image
                  src={product.images[index].image_url}
                  alt={`${product.name}-image-${index}`}
                  fill
                />
                {index === 4 && jumlah > 6 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-700 font-bold text-lg">
                      + {jumlah - 5}
                    </span>
                  </div>
                )}
              </AspectRatio>
            );
          })}
        </div>
      )}
    </div>
  );
}
