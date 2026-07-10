import { chatApi } from "@/lib/api/axios";
import { CreateChatShortcutPayload } from "../types/create-chat-shortcut-payload";

export const createChatbotShortcut = async (
  payload: CreateChatShortcutPayload,
) => {
  const { data } = await chatApi.post("/chat-shortcuts", payload);

  return data;
};
