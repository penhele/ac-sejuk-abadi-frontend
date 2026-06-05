import { api } from "@/lib/api/axios";
import { Category } from "../types/category";

export const getCategory = async (id: string | number): Promise<Category> => {
  const response = await api.get(`/categories/${id}`);

  return response.data;
};
