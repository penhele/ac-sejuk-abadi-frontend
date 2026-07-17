import { chatApi } from "@/lib/api/chat-api";
import { UpdateChatShortcutPayload } from "../types/update-chat-shortcut-payload";

export const updateChatShortcut = async (
  id: string,
  body: UpdateChatShortcutPayload,
) => {
  const { data } = await chatApi.patch(`/chat-shortcuts/${id}`, body);

  return data;
};
