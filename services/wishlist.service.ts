import { api } from "@/lib/api/axios";
import { WishlistResponse } from "@/types/wishlist";
import Cookies from "js-cookie";

export const addToWishlist = async (productId: string) => {
  const response = await api.post("/wishlist/items", {
    id_product: productId,
  });

  return response.data;
};

export const getWishlist = async (): Promise<WishlistResponse> => {
  const token = Cookies.get("access_token");
  const response = await api.get("/wishlist", headers: {
    
  });

  return response.data;
};

export const removeWishlist = async (itemId: number) => {
  const response = await api.delete(`wishlist/items/${itemId}`);

  return response.data;
};
