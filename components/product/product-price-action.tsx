"use client";

import { formatCurrency } from "@/lib/currency";
import { Product } from "@/types/product";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { formatRupiah } from "../util/formatter";
import CartButton from "../buttons/cart-button";

export default function ProductPriceAction({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const hasDiscount = product.discounts && product.discounts.length > 0;
  const discountData = hasDiscount ? product.discounts[0] : null;

  const originalPrice = parseInt(product.price);
  const discountPrice = discountData ? parseInt(discountData?.price) : 0;
  const totalPrice =
    discountPrice != 0 ? discountPrice * quantity : originalPrice * quantity;

  const discountPercentage = (discountPrice / originalPrice) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="line-through text-xs">
          {discountPrice != 0 && (
            <span className="line-through text-xs">
              IDR {formatRupiah(originalPrice.toString())}
            </span>
          )}
        </span>

        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-row gap-1">
            <span>
              IDR{" "}
              {formatRupiah(
                discountPrice != 0
                  ? discountPrice.toString()
                  : originalPrice.toString(),
              )}
            </span>
            {discountPrice != 0 && (
              <span className="text-xs text-red-500">
                (-{discountPercentage}%)
              </span>
            )}
          </div>

          <span className="text-xs">/item</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Button variant={"outline"} onClick={decreaseQty}>
            <MinusIcon />
          </Button>

          <span className="text-lg w-8 flex justify-center">{quantity}</span>

          <Button variant={"outline"} onClick={increaseQty}>
            <PlusIcon />
          </Button>
        </div>

        <span>{formatCurrency(totalPrice)}</span>
      </div>

      <div className="flex justify-between gap-4">
        <CartButton
          productId={product.id}
          quantity={quantity}
          className="flex-1"
        />
        <Button className="flex-1">Beli</Button>
      </div>

      <Separator />

      <div className="flex flex-row gap-4 items-center">
        <span className="text-sm text-gray-700">Share this product: </span>
        <div className="flex flex-row gap-2">
          <FaWhatsapp className="text-gray-700 hover:scale-110" />
          <FaInstagram className="text-gray-700 hover:scale-110" />
          <FaFacebookF className="text-gray-700 hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
