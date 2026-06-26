export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  status?: "sending" | "sent" | "error";
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  message: string;
  sessionId?: string;
}
