import { chatApi } from "@/lib/api/axios";
import { CreateChatSessionPayload } from "../types/create-chat-session-payload";

export const createChatSession = async (body: CreateChatSessionPayload) => {
  const { data } = await chatApi.post("/chat-sessions", body);

  return data;
};
