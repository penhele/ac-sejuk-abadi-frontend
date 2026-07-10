import { api, chatApi } from "@/lib/api/axios";
import { ChatShortcut } from "../types/chat-shortcut";

export const getChatShortcuts = async (params?: {
  all?: boolean;
}): Promise<ChatShortcut[]> => {
  const { data } = await chatApi.get("/chat-shortcuts", {
    params: params,
  });

  return data;
};
