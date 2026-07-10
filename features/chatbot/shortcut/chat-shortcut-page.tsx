"use client";

import { DataTable } from "@/components/tables/data-table";
import { chatbotShortcutColumns } from "./components/chat-shortcut-columns";
import { useChatShortcut } from "./hooks/use-chat-shortcut";

export default function ChatbotShortcutPage() {
  const { data: chatShortcuts } = useChatShortcut();

  return (
    <div className="">
      <DataTable columns={chatbotShortcutColumns} data={chatShortcuts || []} />
    </div>
  );
}
