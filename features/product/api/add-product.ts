import { api } from "@/lib/api/axios";
import { CreateProductPayload } from "../types/create-product-payload";

export const addProduct = async (data: CreateProductPayload) => {
  const response = await api.post("/products", data);

  return response.data;
};
