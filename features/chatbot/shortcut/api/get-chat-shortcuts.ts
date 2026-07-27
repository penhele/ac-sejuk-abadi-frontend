import { chatApi } from "@/lib/api/chat-api";
import { ChatShortcut } from "../types/chat-shortcut";

export const getChatShortcuts = async (): Promise<ChatShortcut[]> => {
  const { data } = await chatApi.get("/chat-shortcuts");

  return data;
};
