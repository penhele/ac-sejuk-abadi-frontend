import { api } from "@/lib/api/axios";
import {
  CreateProductPayload,
  GetProductOptions,
  Product,
  ProductResponse,
} from "@/types/product";

export const getProducts = async (
  options?: GetProductOptions,
): Promise<ProductResponse> => {
  try {
    const response = await api.get("/products", {
      params: options,
    });

    return response.data;
  } catch (error) {
    // console.error("Failed to fetch products:", error);

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

export const getProductById = async (id: string | number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const addProduct = async (data: CreateProductPayload) => {
  const response = await api.post("/products", data, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDQ1ODMzZi05YTAwLTRiNGUtODYzNy0xN2IxMmY3ZDA3YTciLCJlbWFpbCI6ImFkbWluQHh5ei5jb20iLCJpYXQiOjE3NzkyOTg3NTMsImV4cCI6MTc3OTkwMzU1M30.Ellv66P3CIs-0rcXFE0xiK-QC4Vq9OLbE10WKbnEKv8",
    },
  });

  return response.data;
};

export const deleteProduct = async (id: string | number) => {
  const response = await api.delete(`/products/${id}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDQ1ODMzZi05YTAwLTRiNGUtODYzNy0xN2IxMmY3ZDA3YTciLCJlbWFpbCI6ImFkbWluQHh5ei5jb20iLCJpYXQiOjE3NzkyOTg3NTMsImV4cCI6MTc3OTkwMzU1M30.Ellv66P3CIs-0rcXFE0xiK-QC4Vq9OLbE10WKbnEKv8",
    },
  });

  return response.data;
};
