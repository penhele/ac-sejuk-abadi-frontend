import { chatApi } from "@/lib/api/chat-api";

export const syncProducts = async () => {
  const { data } = await chatApi.post("/rag/sync/products");

  return data;
};
