import { useQuery } from "@tanstack/react-query";
import { getChatShortcutByIdQueryOptions } from "../queries/chat-shortcut-queries";

export const useChatShortcut = (id: string) =>
  useQuery(getChatShortcutByIdQueryOptions(id));
