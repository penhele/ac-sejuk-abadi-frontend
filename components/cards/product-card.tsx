import { Product } from "@/types/product";
import { ImageOff, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import DiscountBadge from "../util/discount-badge";
import { formatRupiah } from "@/lib/format/currency";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discounts && product.discounts.length > 0;
  const discountData = hasDiscount ? product.discounts[0] : null;

  const originalPrice = parseInt(product.price);
  const discountPrice = discountData ? parseInt(discountData?.price) : 0;

  const discountPercentage = (discountPrice / originalPrice) * 100;

  return (
    <Link href={ROUTES.PRODUCT_DETAIL(product.id)}>
      <div className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border">
        <div className="relative">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-t-md relative">
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

          <DiscountBadge discount={discountPercentage.toString()} />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <span className="text-xs text-gray-400">{product.brand?.name}</span>
          <h1 className="text-sm h-16 line-clamp-3">{product.name}</h1>

          <div className="flex gap-2">
            <div className="text-xs bg-gray-800 text-white py-1 px-2 rounded-sm">
              {product.pk} PK
            </div>
            <div className="text-xs bg-green-800 text-white py-1 px-2 rounded-sm">
              {product.ac_type.name}
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col min-h-8 justify-end">
              {discountPrice != 0 && (
                <span className="line-through text-xs">
                  {formatRupiah(originalPrice)}
                </span>
              )}

              <div className="flex flex-row gap-1">
                <span>
                  {formatRupiah(
                    discountPrice != 0 ? discountPrice : originalPrice,
                  )}
                </span>
                {discountPrice != 0 && (
                  <span className="text-xs text-red-500">
                    (-{discountPercentage}%)
                  </span>
                )}
              </div>
            </div>

            <Button variant={"outline"} className="hidden xs:block">
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
