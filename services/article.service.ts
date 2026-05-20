import { api } from "@/lib/api/axios";
import { Article } from "@/types/article";

export const getArticle = async (): Promise<Article[]> => {
  try {
    const response = await api.get("/articles");

    return response.data;
  } catch (error) {
    // console.error("Failed to fetch articles:", error);

    return [];
  }
};
