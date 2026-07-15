import { chatApi } from "@/lib/api/axios";

export const getMessages = async (sessionId: string) => {
  const { data } = await chatApi.get(`/chat-sessions/${sessionId}/messages`);

  return data;
};
