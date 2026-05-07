"use client";

import EmptyState from "@/components/empty-state/empty-state";
import { getWishlistQueryOptions } from "@/hooks/queries/wishlist-queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Cuboid } from "lucide-react";
import ProductList from "../lists/product-list";

export default function WishlistGrid() {
  const { data: response } = useSuspenseQuery(getWishlistQueryOptions());

  const products = response?.items?.map((item) => item.product) || [];

  return (
    <div className="">
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <EmptyState
          Icon={Cuboid}
          label="No wishlist yet"
          description="You haven’t added any HVAC products to your wishlist. Start exploring
          and save your favorites here."
        />
      )}
    </div>
  );
}
