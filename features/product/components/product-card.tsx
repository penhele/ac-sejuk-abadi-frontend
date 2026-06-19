"use client";

import { ROUTES } from "@/constants/routes";
import { formatRupiah } from "@/lib/format/currency";
import { ImageOff, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ProductBadge from "../../../components/badges/product-badge";
import CarouselProductBasic from "./carousel-product-basic";
import { Button } from "../../../components/ui/button";
import { Product } from "@/features/product/types/product";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discounts && product.discounts.length > 0;
  const discountData = hasDiscount ? product.discounts[0] : null;

  const originalPrice = parseInt(product.price);
  const discountPrice = discountData ? parseInt(discountData?.price) : 0;

  const discountPercentage = (discountPrice / originalPrice) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="group relative overflow-hidden rounded-sm bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border h-full">
        <Link
          href={ROUTES.PRODUCT_DETAIL(product.id)}
          className="absolute inset-0 z-10"
          prefetch={false}
        />

        {product.images.length > 0 ? (
          <CarouselProductBasic images={product.images} className="z-20" />
        ) : (
          <div className="aspect-square bg-muted flex justify-center items-center text-muted-foreground">
            <ImageOff />
          </div>
        )}

        <div className="p-4 flex flex-col gap-2 ">
          <span className="text-xs text-gray-400">{product.brand?.name}</span>
          <h1 className="text-sm h-16 line-clamp-3">{product.name}</h1>

          <ProductBadge product={product} />

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
    </motion.div>
  );
}
