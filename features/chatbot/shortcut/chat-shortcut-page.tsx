"use client";

import { DataTable } from "@/components/tables/data-table";
import { chatbotShortcutColumns } from "./components/chat-shortcut-columns";
import { useChatShortcuts } from "./hooks/use-chat-shortcuts";
import SheetButton from "@/components/buttons/sheet-button";
import CreateChatShortcutForm from "./components/create-chat-shortcut-form";
import { Plus } from "lucide-react";

export default function ChatbotShortcutPage() {
  const { data: chatShortcuts } = useChatShortcuts(true);

  return (
    <div className="space-y-between-items">
      <div>
        <h1 className="text-xl font-bold">Kelola Shortcut Chat</h1>
        <p className="text-muted-foreground">
          Kelola daftar shortcut chat yang akan ditampilkan kepada pengguna
          untuk mempercepat interaksi dengan chatbot.
        </p>
      </div>

      <DataTable
        title="Chat Shortcut"
        action={
          <SheetButton
            title="Tambah Shortcut"
            Icon={Plus}
            label="Tambah Shortcut"
          >
            <CreateChatShortcutForm />
          </SheetButton>
        }
        columns={chatbotShortcutColumns}
        data={chatShortcuts || []}
      />
    </div>
  );
}
