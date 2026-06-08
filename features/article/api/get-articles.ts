import { api } from "@/lib/api/axios";
import { Article } from "@/features/article/types/article";

export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await api.get("/articles");

    return response.data;
  } catch (error) {
    // console.error("Failed to fetch articles:", error);

    return [];
  }
};
