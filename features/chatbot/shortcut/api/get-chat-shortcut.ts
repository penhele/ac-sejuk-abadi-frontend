import { chatApi } from "@/lib/api/chat-api";
import { ChatShortcut } from "../types/chat-shortcut";

export const getChatShortcut = async (id: string): Promise<ChatShortcut> => {
  const { data } = await chatApi.get(`/chat-shortcuts/${id}`);

  return data;
};
