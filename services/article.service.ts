import { api } from "@/lib/api/axios";
import { Article } from "@/types/article";

export const getArticle = async (): Promise<Article[]> => {
  const response = await api.get("/articles");

  return response.data;
};
