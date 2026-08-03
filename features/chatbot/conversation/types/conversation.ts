import { Message } from "../../message/types/message";

export interface Conversation {
  is: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}
