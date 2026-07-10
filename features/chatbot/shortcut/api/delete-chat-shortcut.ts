import { chatApi } from "@/lib/api/axios";

export const deleteChatShortcut = async (id: string) => {
  const { data } = await chatApi.delete(`/chat-shortcuts/${id}`);

  return data;
};
