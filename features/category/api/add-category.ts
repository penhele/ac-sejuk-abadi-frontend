import { api } from "@/lib/api/axios";
import { CreateCategoryPayload } from "../types/create-category-payload";

export const addCategory = async (data: CreateCategoryPayload) => {
  const response = await api.post("/categories", data);

  return response.data;
};
