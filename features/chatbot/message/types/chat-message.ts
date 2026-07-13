import { ChatSession } from "../../session/types/chat-session";

export interface ChatMessage {
  id: string;
  session: ChatSession;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: Date;
}
