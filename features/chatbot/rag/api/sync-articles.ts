import { chatApi } from "@/lib/api/chat-api";

export const syncArticles = async () => {
  const { data } = await chatApi.post("/rag/sync/articles");
  
  return data;
};
