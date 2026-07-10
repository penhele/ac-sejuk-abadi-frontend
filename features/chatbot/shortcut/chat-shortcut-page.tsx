"use client";

import { DataTable } from "@/components/tables/data-table";
import { chatbotShortcutColumns } from "./components/chat-shortcut-columns";
import { useChatShortcut } from "./hooks/use-chat-shortcut";

export default function ChatbotShortcutPage() {
  const { data: chatShortcuts } = useChatShortcut(true);

  return (
    <div className="space-y-between-items">
      <h1>Kelola Shortcut Chat</h1>

      <DataTable columns={chatbotShortcutColumns} data={chatShortcuts || []} />
    </div>
  );
}
