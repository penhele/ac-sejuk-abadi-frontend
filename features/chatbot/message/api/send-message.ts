import { chatApi } from "@/lib/api/chat-api";
import { Message } from "../types/message";
import { MessageResponse } from "../types/message-response";

export const sendMessage = async (body: Message): Promise<MessageResponse> => {
  const { data } = await chatApi.post("/chat", body);

  return data;
};
