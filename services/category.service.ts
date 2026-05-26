import { api } from "@/lib/api/axios";
import { Category, CreateCategoryPayload } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");

    return response.data;
  } catch (error) {
    return [];
  }
};

export const addCategory = async (data: CreateCategoryPayload) => {
  const response = await api.post("/categories", data);

  return response.data;
};

export const deleteCategory = async (id: string | number) => {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
};
