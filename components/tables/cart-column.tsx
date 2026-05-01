"use client";

import { formatRupiah } from "@/lib/format/currency";
import { CartItem } from "@/types/cart";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import RemoveCartById from "../buttons/delete-button";
import QuantityButton from "../buttons/quantity-button";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";

export const cartColumns: ColumnDef<CartItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: "Detail Produk",
    cell: ({ row }) => {
      const carts = row.original;

      return (
        <div className="flex space-x-4 items-center">
          <div className="w-24">
            <AspectRatio className="bg-muted" ratio={1 / 1} />
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-400">...</span>
            <span>{carts.product.name}</span>
            <span>{formatRupiah(parseInt(carts.product.price))}</span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Jumlah",
    cell: ({ row }) => {
      const carts = row.original;

      return (
        <QuantityButton itemId={carts.id} initialQuantity={carts.quantity} />
      );
    },
  },
  {
    header: "Total",
    cell: ({ row }) => {
      const carts = row.original;

      return (
        <span>
          {formatRupiah(carts.quantity * parseInt(carts.product.price))}
        </span>
      );
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      const carts = row.original;

      return (
        <div className="space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <RemoveCartById cartId={carts.id} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"outline"}>
                <Link href={`/shop/${carts.product.id}`}>
                  <ArrowUpRight />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detail</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
