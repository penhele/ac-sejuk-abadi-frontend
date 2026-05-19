import { api } from "@/lib/api/axios";
import { GetProductOptions, Product, ProductResponse } from "@/types/product";

export const getProducts = async (
  options?: GetProductOptions,
): Promise<ProductResponse> => {
  const response = await api.get("/products", {
    params: options,
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    },
  });

  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
