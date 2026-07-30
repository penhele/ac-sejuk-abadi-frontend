import { chatApi } from "@/lib/api/chat-api";

export const getLastSycned = async (): Promise<{
  products: string;
  articles: string;
}> => {
  const { data } = await chatApi.get("/rag/sync/last");

  return data;
};
