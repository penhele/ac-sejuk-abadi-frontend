import { Heart, ShoppingCart } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import Link from "next/link";
import DiscountBadge from "../util/discount-badge";
import { Product } from "@/types/product";
import { formatRupiah } from "../util/formatter";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border">
        <div className="relative">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-t-md" />

          <DiscountBadge discount="-20%" />

          <Heart className="absolute top-3 right-3 size-5 text-gray-400 hover:text-gray-600" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <span className="text-xs text-gray-400">{product.brand.name}</span>
          <h1 className="text-sm h-16 line-clamp-3">{product.name}</h1>

          <div className="flex gap-2">
            <div className="text-xs bg-gray-800 text-white py-1 px-2 rounded-sm">
              {product.pk} PK
            </div>
            <div className="text-xs bg-green-800 text-white py-1 px-2 rounded-sm">
              {product.type}
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="line-through text-xs">
                IDR {formatRupiah(product.price)}
              </span>

              <div className="flex flex-row gap-1">
                <span>IDR {formatRupiah(product.price)}</span>
                <span className="text-xs text-red-500">(-20%)</span>
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
