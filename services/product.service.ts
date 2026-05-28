import { api } from "@/lib/api/axios";
import {
  CreateProductPayload,
  GetProductOptions,
  Product,
  ProductResponse,
  UpdateProductPayload,
  UploadImagePayload,
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
  const response = await api.post("/products", data);

  return response.data;
};

export const deleteProduct = async (id: string | number) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

export const updateProduct = async (
  id: string | number,
  data: UpdateProductPayload,
) => {
  const response = await api.put(`/products/${id}`, data);

  return response.data;
};

export const uploadImages = async (
  id: string | number,
  data: UploadImagePayload,
) => {
  const formData = new FormData();

  data.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post(`/products/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteImage = async (
  idProduct: string | number,
  idImage: string | number,
) => {
  const response = await api.delete(`/products/${idProduct}/images/${idImage}`);

  return response.data;
};
