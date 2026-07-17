import { chatApi } from "@/lib/api/chatbot-api";
import { Message } from "../../types/message";

export const sendMessage = async (body: Message) => {
  const { data } = await chatApi.post("/chat", body);

  return data;
};
