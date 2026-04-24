import { api } from "@/lib/axios";
import { Cart } from "@/types/cart";
import Cookies from "js-cookie";

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post("/cart/items", {
    id_product: productId,
    quantity,
  });

  return response.data;
};

export const getCart = async (): Promise<Cart> => {
  const response = await api.get("/cart");

  return response.data;
};

export const removeCart = async (cartId: number) => {
  const response = await api.delete(`/cart/items/${cartId}`);

  return response.data;
};
