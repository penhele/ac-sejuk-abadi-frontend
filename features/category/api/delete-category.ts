import { api } from "@/lib/api/axios";

export const deleteCategory = async (id: string | number) => {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
};
