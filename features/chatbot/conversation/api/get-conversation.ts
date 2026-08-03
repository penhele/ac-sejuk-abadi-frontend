import { chatApi } from "@/lib/api/chat-api";

export const getConversation = async (): Promise<{}> => {
  const { data } = await chatApi.get("/conversations");

  return data;
};
