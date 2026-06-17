import { api } from "@/lib/api/axios";
import { CreateArticlePayload } from "../types/create-article-payload";

export const addArticle = async (data: CreateArticlePayload) => {
  const response = await api.post(`/articles`, data);

  return response.data;
};
