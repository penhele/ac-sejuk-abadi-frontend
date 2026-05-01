"use client";

import EmptyState from "@/components/empty-state/empty-state";
import { getWishlist } from "@/services/wishlist.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductList from "../lists/product-list";
import { Cuboid } from "lucide-react";

export default function WishlistGrid() {
  const { data: response } = useSuspenseQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
  });

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
