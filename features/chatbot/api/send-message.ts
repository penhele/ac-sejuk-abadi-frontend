import { chatbotApi } from "@/lib/api/chatbot-api";
import { Message } from "../types/message";

export const sendMessage = async (body: Message) => {
  const { data } = await chatbotApi.post("/chat", body);

  console.log(data);
  return data;
};
