import { useQuery } from "@tanstack/react-query";
import { getChatShortcutQueryOptions } from "../queries/chat-shortcut-queries";

export const useChatShortcut = () => useQuery(getChatShortcutQueryOptions());
