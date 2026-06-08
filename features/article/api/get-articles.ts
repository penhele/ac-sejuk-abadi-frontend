import { api } from "@/lib/api/axios";
import { Article } from "@/features/article/types/article";

export const getArticles = async (): Promise<Article[]> => {
  const response = await api.get("/articles");

  return response.data;
};
