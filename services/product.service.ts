import { api } from "@/lib/api/axios";
import { GetProductOptions, Product, ProductResponse } from "@/types/product";

export const getProducts = async (
  options?: GetProductOptions,
): Promise<ProductResponse> => {
  try {
    const response = await api.get("/products", {
      params: options,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return {
      success: false,
      message: "Failed to fetch products",
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 0,
        total_pages: 0,
      },
    };
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
