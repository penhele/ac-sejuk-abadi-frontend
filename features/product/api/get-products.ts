import { api } from "@/lib/api/axios";
import { ProductResponse } from "../types/product-response";
import { GetProductOptions } from "../types/product-options";

export const getProducts = async (
  options?: GetProductOptions,
): Promise<ProductResponse> => {
  try {
    const response = await api.get("/products", {
      params: options,
    });

    return response.data;
  } catch (error) {
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
