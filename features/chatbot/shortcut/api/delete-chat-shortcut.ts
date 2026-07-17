import { chatApi } from "@/lib/api/chatbot-api";

export const deleteChatShortcut = async (id: string) => {
  const { data } = await chatApi.delete(`/chat-shortcuts/${id}`);

  return data;
};
