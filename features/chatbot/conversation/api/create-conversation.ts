import { chatApi } from "@/lib/api/chat-api";

export const createConversation = async () => {
  const { data } = await chatApi.post("/conversations");

  return data;
};
