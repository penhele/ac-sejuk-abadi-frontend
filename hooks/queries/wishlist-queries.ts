import { addToWishlist, getWishlist } from "@/services/wishlist.service";
import { queryOptions } from "@tanstack/react-query";

export function getWishlistQueryOptions() {
  return queryOptions({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    staleTime: 1000 * 60 * 5,
  });
}
