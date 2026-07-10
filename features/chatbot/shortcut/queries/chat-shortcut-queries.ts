import { queryOptions, useQuery } from "@tanstack/react-query";
import { getChatShortcuts } from "../api/get-chat-shortcuts";
import { chatShortcutKeys } from "./chat-shortcut-keys";
import { getChatShortcut } from "../api/get-chat-shortcut";

export const getChatShortcutQueryOptions = (all?: boolean) =>
  queryOptions({
    queryFn: () => getChatShortcuts({ all }),
    queryKey: chatShortcutKeys.all,
    staleTime: 1000 * 60 * 5,
  });

export const getChatShortcutByIdQueryOptions = (id: string) =>
  queryOptions({
    queryFn: () => getChatShortcut(id),
    queryKey: chatShortcutKeys.detail(id),
    staleTime: 1000 * 60 * 5,
  });
