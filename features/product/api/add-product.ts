import { api } from "@/lib/api/axios";
import { CreateProductPayload } from "@/types/product";

export const addProduct = async (data: CreateProductPayload) => {
  const response = await api.post("/products", data);

  return response.data;
};