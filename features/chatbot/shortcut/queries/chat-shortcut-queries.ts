import { queryOptions, useQuery } from "@tanstack/react-query";
import { getChathortcuts } from "../api/get-chat-shortcuts";

export const getChatShortcutQueryOptions = () =>
  queryOptions({
    queryFn: () => getChathortcuts(),
    queryKey: ["chats"],
    staleTime: 1000 * 60 * 5,
  });
