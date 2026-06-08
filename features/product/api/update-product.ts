import { api } from "@/lib/api/axios";
import { UpdateProductPayload } from "../types/update-product-payload";

export const updateProduct = async (
  id: string | number,
  data: UpdateProductPayload,
) => {
  const response = await api.put(`/products/${id}`, data);

  return response.data;
};
