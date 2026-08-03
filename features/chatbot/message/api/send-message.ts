import { chatApi } from "@/lib/api/chat-api";
import { MessagePayload } from "../types/message-payload";
import { Message } from "../types/message";

export const sendMessage = async (body: MessagePayload): Promise<Message> => {
  const { data } = await chatApi.post("/chat", body);

  return data;
};
