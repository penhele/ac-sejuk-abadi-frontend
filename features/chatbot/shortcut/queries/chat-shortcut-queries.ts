import { queryOptions, useQuery } from "@tanstack/react-query";
import { getChathortcuts } from "../api/get-chat-shortcuts";
import { chatShortcutKeys } from "./chat-shortcut-keys";

export const getChatShortcutQueryOptions = (all?: boolean) =>
  queryOptions({
    queryFn: () => getChathortcuts({ all }),
    queryKey: chatShortcutKeys.all,
    staleTime: 1000 * 60 * 5,
  });
