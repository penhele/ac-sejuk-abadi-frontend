import { api, chatApi } from "@/lib/api/axios";
import { ChatShortcut } from "../types/chat-shortcut";

export const getChathortcuts = async (params?: {
  all?: boolean;
}): Promise<ChatShortcut[]> => {
  const { data } = await chatApi.get("/chat-shortcuts", {
    params: params,
  });

  return data;
};
