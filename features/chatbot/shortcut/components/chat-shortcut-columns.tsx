import DeleteButton from "@/components/buttons/delete-button";
import SheetButton from "@/components/buttons/sheet-button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { deleteChatShortcut } from "../api/delete-chat-shortcut";
import { chatShortcutKeys } from "../queries/chat-shortcut-keys";
import { ChatShortcut } from "../types/chat-shortcut";
import StatusSelect from "./status-select";
import UpdateChatShortcutForm from "./update-chat-shortcut-form";

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
        <StatusSelect id={row.original.id} isActive={row.original.isActive} />
      );
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="space-x-1">
          <SheetButton title="Perbarui Shortcut" Icon={Pencil} size="icon-xs">
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
