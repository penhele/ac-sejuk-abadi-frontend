"use client";

import { getCart } from "@/services/cart.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useMemo } from "react";
import { formatRupiah } from "@/lib/format/currency";

export default function CartSummary() {
  const { data: response } = useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const ongkir = 40000;

  const { totalItem, subtotal } = useMemo(() => {
    return (response.items || []).reduce(
      (acc, item) => {
        acc.totalItem += item.quantity;
        acc.subtotal += parseInt(item.product.price) * item.quantity;
        return acc;
      },
      { totalItem: 0, subtotal: 0 },
    );
  }, [response.items]);

  const total = ongkir + subtotal;
  const isEmpty = response.items.length <= 0;

  return (
    <div className="min-w-2xs space-y-4 border p-4 rounded-lg shadow-md h-fit">
      <h2 className="">Pemesanan</h2>

      <div className="space-y-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-gray-400">Total barang</span>
          <span className="text-sm font-medium">
            {isEmpty ? "-" : totalItem}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-gray-400">Subtotal</span>
          <span className="text-sm font-medium">
            {isEmpty ? "-" : formatRupiah(subtotal)}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-gray-400">Ongkos Kirim</span>
          <span className="text-sm font-medium">
            {isEmpty ? "-" : "IDR 40.000"}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-row justify-between">
        <span className="text-sm">Total</span>
        <span className="text-sm font-medium">{isEmpty ? "-" : formatRupiah(total)}</span>
      </div>

      <Button className="w-full">Checkout</Button>
    </div>
  );
}
