import { ChatShortcutParams } from "../types/chat-shortcut-params";

export const chatShortcutKeys = {
  all: ["shortcuts"] as const,
  active: (params?: ChatShortcutParams) =>
    [...chatShortcutKeys.all, params] as const,
  detail: (id: string) => [...chatShortcutKeys.all, id] as const,
};
