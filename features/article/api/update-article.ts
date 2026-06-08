import { api } from "@/lib/api/axios";
import { UpdateArticlePayload } from "../types/update-article-payload";

export const updateArticle = async (
  id: string | number,
  data: UpdateArticlePayload,
) => {
  const response = await api.put(`/articles/${id}`, data);

  return response.data;
};
