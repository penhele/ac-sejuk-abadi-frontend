"use client";

import EmptyState from "@/app/empty-state/empty-state";
import { getWishlist } from "@/services/wishlist.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductList from "../lists/product-list";

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
        <EmptyState />
      )}
    </div>
  );
}
