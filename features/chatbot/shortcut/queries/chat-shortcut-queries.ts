import { queryOptions, useQuery } from "@tanstack/react-query";
import { getChathortcuts } from "../api/get-chat-shortcuts";

export const getChatShortcutQueryOptions = (all?: boolean) =>
  queryOptions({
    queryFn: () => getChathortcuts({ all }),
    queryKey: ["chats"],
    staleTime: 1000 * 60 * 5,
  });
