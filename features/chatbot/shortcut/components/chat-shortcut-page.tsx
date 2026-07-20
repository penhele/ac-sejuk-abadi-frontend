"use client";

import { DataTable } from "@/components/tables/data-table";
import { chatbotShortcutColumns } from "./chat-shortcut-columns";
import { useChatShortcuts } from "../hooks/use-chat-shortcuts";
import SheetButton from "@/components/buttons/sheet-button";
import CreateChatShortcutForm from "./create-chat-shortcut-form";
import { Plus } from "lucide-react";

export default function ChatbotShortcutPage() {
  const { data: chatShortcuts } = useChatShortcuts(true);

  return (
    <div className="space-y-between-items">
      <div className="flex flex-row">
        <div>
          <h1 className="text-xl font-bold ">Chat Shortcuts</h1>
          <p className="text-sm text-muted-foreground">
            Browse and manage your product catalog.
          </p>
        </div>
      </div>

      <SheetButton title="Tambah Shortcut" Icon={Plus} label="Tambah Shortcut">
        <CreateChatShortcutForm />
      </SheetButton>

      <DataTable columns={chatbotShortcutColumns} data={chatShortcuts || []} />
    </div>
  );
}
