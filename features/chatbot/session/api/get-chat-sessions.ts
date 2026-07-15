import { chatApi } from "@/lib/api/axios";

export const getChatSessions = async () => {
  const { data } = await chatApi.get("/chat-sessions");

  return data;
};
