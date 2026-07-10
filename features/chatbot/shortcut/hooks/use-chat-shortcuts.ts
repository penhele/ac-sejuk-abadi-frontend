import { useQuery } from "@tanstack/react-query";
import { getChatShortcutQueryOptions } from "../queries/chat-shortcut-queries";

export const useChatShortcuts = (all?: boolean) =>
  useQuery(getChatShortcutQueryOptions(all));
