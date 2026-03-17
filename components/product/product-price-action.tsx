"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { formatCurrency } from "@/lib/currency";
import { Input } from "../ui/input";

export default function ProductPriceAction() {
  const price = 2500000;
  const originalPrice = 3000000;

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = price * quantity;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="line-through text-xs">
          {formatCurrency(originalPrice)}
        </span>

        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-row gap-1">
            <span>{formatCurrency(price)}</span>
            <span className="text-xs text-red-500">(-20%)</span>
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
        <Button variant={"outline"} className="flex-1">
          Keranjang
        </Button>
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
