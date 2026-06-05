import { Category } from "@/features/category/types/category";
import { api } from "@/lib/api/axios";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");

    return response.data;
  } catch (error) {
    return [];
  }
};
