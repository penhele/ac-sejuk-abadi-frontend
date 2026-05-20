import { api } from "@/lib/api/axios";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");

    return response.data;
  } catch (error) {
    return [];
  }
};
