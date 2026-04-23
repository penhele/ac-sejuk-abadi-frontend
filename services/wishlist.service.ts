import { api } from "@/lib/axios";

export const addToWishlist = async (productId: string) => {
  const response = await api.post("/wishlist/items", {
    id_product: productId,
  });

  return response.data;
};
