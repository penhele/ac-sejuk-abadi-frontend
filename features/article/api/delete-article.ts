import { api } from "@/lib/api/axios";

export const deleteArticle = async (id: string | number) => {
  const response = await api.delete(`/articles/${id}`);

  return response.data;
};
