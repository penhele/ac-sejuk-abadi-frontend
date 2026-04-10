import { api } from "@/lib/axios";
import { Product, ProductResponse } from "@/types/product";

export const getProducts = async (
  page = 1,
  limit = 30,
  id_brand?: string,
): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>("/products", {
    params: { page, limit, id_brand },
  });

  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
