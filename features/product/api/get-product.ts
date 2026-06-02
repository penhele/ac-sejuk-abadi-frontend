import { api } from "@/lib/api/axios";
import { Product } from "@/types/product";

export const getProductById = async (id: string | number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
