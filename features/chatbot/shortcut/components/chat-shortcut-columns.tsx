import { ColumnDef } from "@tanstack/react-table";
import { ChatShortcut } from "../types/chat-shortcut";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const chatbotShortcutColumns: ColumnDef<ChatShortcut>[] = [
  {
    header: "Judul",
    cell: ({ row }) => {
      return <span>{row.original.title}</span>;
    },
  },
  {
    header: "Prompt",
    cell: ({ row }) => {
      return <span>{row.original.content}</span>;
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;

      return (
        <Badge variant={"outline"} className="flex flex-row gap-2">
          <div
            className={cn(
              "h-2 aspect-square rounded-full",
              isActive ? "bg-green-400" : "bg-gray-400",
            )}
          />
          {isActive ? "Aktif" : "Tidak Aktif"}
        </Badge>
      );
    },
  },
];
