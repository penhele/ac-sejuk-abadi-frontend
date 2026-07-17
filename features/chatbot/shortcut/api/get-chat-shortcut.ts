import { chatApi } from "@/lib/api/chatbot-api";
import { ChatShortcut } from "../types/chat-shortcut";

export const getChatShortcut = async (id: string): Promise<ChatShortcut> => {
  const { data } = await chatApi.get(`/chat-shortcuts/${id}`);

  return data;
};
