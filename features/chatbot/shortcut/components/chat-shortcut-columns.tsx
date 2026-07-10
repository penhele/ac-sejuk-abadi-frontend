import { ColumnDef } from "@tanstack/react-table";
import { ChatShortcut } from "../types/chat-shortcut";

export const chatbotShortcutColumns: ColumnDef<ChatShortcut>[] = [
  {
    header: "Judul",
    cell: ({ row }) => {
      return <span>{row.original.title}</span>;
    },
  },
];
