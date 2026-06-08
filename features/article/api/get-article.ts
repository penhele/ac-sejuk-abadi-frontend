import { api } from "@/lib/api/axios";
import { Article } from "../types/article";

export const getArticle = async (id: string | number): Promise<Article> => {
  const response = await api.get(`/articles/${id}`);

  return response.data;
};
