import { api } from "@/lib/axios";
import { ProductResponse } from "@/types/product";

export const getProducts = async (
  page = 1,
  limit = 10,
): Promise<ProductResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await api.get<ProductResponse>("/products", {
    params: { page, limit },
  });

  return response.data;
};
