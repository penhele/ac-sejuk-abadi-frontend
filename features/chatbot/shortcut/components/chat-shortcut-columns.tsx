import DeleteButton from "@/components/buttons/delete-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { deleteChatShortcut } from "../api/delete-chat-shortcut";
import { chatShortcutKeys } from "../queries/chat-shortcut-keys";
import { ChatShortcut } from "../types/chat-shortcut";
import SheetButton from "@/components/buttons/sheet-button";
import UpdateChatShortcutForm from "./update-chat-shortcut-form";
import { Pencil } from "lucide-react";

export const chatbotShortcutColumns: ColumnDef<ChatShortcut>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
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
  {
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="space-x-1">
          <SheetButton title="Update" Icon={Pencil}>
            <UpdateChatShortcutForm id={row.original.id} />
          </SheetButton>
          <DeleteButton
            id={row.original.id}
            mutationFn={deleteChatShortcut}
            queryKey={chatShortcutKeys.all}
            item={row.original.title}
          />
        </div>
      );
    },
  },
];
