import { Heart, ShoppingCart } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import Link from "next/link";
import DiscountBadge from "../util/discount-badge";

export default function ProductCard({ id }: { id: string }) {
  return (
    <Link href={`/shop/${id}`}>
      <div className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border">
        <div className="relative">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-t-md" />

          <DiscountBadge discount="-20%" />

          <Heart className="absolute top-3 right-3 size-5 text-gray-400 hover:text-gray-600" />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <span className="text-xs text-gray-400">Daikin</span>
          <h1 className="text-sm h-16 line-clamp-3">
            Midea AC Wall Mounted Split Standard Double Gold Fin 1/2 PK
          </h1>

          <div className="flex gap-2">
            <div className="text-xs bg-gray-800 text-white py-1 px-2 rounded-sm">
              1/2 PK
            </div>
            <div className="text-xs bg-green-800 text-white py-1 px-2 rounded-sm">
              Split Wall
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="line-through text-xs">IDR 3.000.000</span>

              <div className="flex flex-row gap-1">
                <span>IDR 2.500.000</span>
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
