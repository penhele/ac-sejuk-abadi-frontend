import { chatApi } from "@/lib/api/axios";

export const deleteChatSession = async (sessionId: string) => {
  const { data } = await chatApi.delete(`/chat-sessions/${sessionId}`);

  return data;
};
