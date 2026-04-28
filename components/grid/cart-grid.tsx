"use client";

import EmptyState from "@/app/empty-state/empty-state";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCart } from "@/services/cart.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, MinusIcon, PlusIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";
import RemoveCartById from "../buttons/delete-button";
import { cn } from "@/lib/utils";
import QuantityButton from "../buttons/quantity-button";
import { formatRupiah } from "@/lib/format/currency";

export default function CartGrid({ className }: { className?: string }) {
  const { data: response } = useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const cart = response.items;

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {cart.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Detail Produk</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex space-x-4 items-center">
                    <div className="w-24">
                      <AspectRatio className="bg-muted" ratio={1 / 1} />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">...</span>
                      <span>{item.product.name}</span>
                      <span>{formatRupiah(parseInt(item.product.price))}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <QuantityButton
                    itemId={item.id}
                    initialQuantity={item.quantity}
                  />
                </TableCell>

                <TableCell>
                  <span>
                    {formatRupiah(item.quantity * parseInt(item.product.price))}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <RemoveCartById cartId={item.id} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant={"outline"}>
                          <Link href={`/shop/${item.product.id}`}>
                            <ArrowUpRight />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Detail</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          Icon={ShoppingBag}
          label="No product yet"
          description="You haven’t added any HVAC products to your cart."
        />
      )}
    </div>
  );
}
