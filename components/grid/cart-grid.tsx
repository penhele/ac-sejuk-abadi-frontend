"use client";

import EmptyState from "@/components/empty-state/empty-state";
import { cn } from "@/lib/utils";
import { getCart } from "@/services/cart.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { cartColumns } from "../tables/cart-column";
import { DataTable } from "../tables/data-table";

export default function CartGrid({ className }: { className?: string }) {
  const { data: response } = useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const carts = response.items;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {carts.length > 0 ? (
        <DataTable columns={cartColumns} data={carts} />
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
