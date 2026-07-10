import { chatApi } from "@/lib/api/axios";
import { CreateChatShortcutPayload } from "../types/create-chat-shortcut-payload";

export const createChatbotShortcut = async (
  body: CreateChatShortcutPayload,
) => {
  const { data } = await chatApi.post("/chat-shortcuts", body);

  return data;
};
