"use client";

import { DataTable } from "@/components/tables/data-table";
import { chatbotShortcutColumns } from "./components/chat-shortcut-columns";
import { useChatShortcuts } from "./hooks/use-chat-shortcuts";

export default function ChatbotShortcutPage() {
  const { data: chatShortcuts } = useChatShortcuts(true);

  return (
    <div className="space-y-between-items">
      <h1>Kelola Shortcut Chat</h1>

      <DataTable columns={chatbotShortcutColumns} data={chatShortcuts || []} />
    </div>
  );
}
