import { api } from "@/lib/axios";
import { ProductResponse } from "@/types/product";

export const getProducts = async (
  page = 1,
  limit = 10,
): Promise<ProductResponse> => {
  try {
    const response = await api.get<ProductResponse>("/products", {
      params: { page, limit },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      success: false,
      message: "Gagal memuat data produk",
      data: [], // Array kosong agar .map() di frontend tidak error
      meta: {
        total: 0,
        page: Number(page),
        limit: Number(limit),
        total_pages: 0,
      },
    };
    // throw error;
  }
};
