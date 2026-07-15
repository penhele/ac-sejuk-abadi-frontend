import { chatApi } from "@/lib/api/axios";

export const getChatSession = async (sessionId: string) => {
  const { data } = await chatApi.get(`/chat-sessions/${sessionId}`);

  return data;
};
