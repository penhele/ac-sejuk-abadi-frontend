import { api } from "@/lib/api/axios";
import { UpdateCategoryPayload } from "../types/update-category-payload";

export const updateCategory = async (
  id: string | number,
  data: UpdateCategoryPayload,
) => {
  const response = await api.put(`/categories/${id}`, data);

  return response.data;
};
