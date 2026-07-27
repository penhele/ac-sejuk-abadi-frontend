"use client";

import SheetButton from "@/components/buttons/sheet-button";
import { DataTable } from "@/components/tables/data-table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { MessageSquare, Plus } from "lucide-react";
import { useChatShortcuts } from "../hooks/use-chat-shortcuts";
import { chatbotShortcutColumns } from "./chat-shortcut-columns";
import CreateChatShortcutForm from "./create-chat-shortcut-form";

export default function ChatbotShortcutPage() {
  const { data: allShortcuts } = useChatShortcuts();

  const activeShortcuts = allShortcuts?.filter(
    (shortcut) => shortcut.isActive === true,
  );

  return (
    <div className="space-y-between-items">
      <div>
        <h1 className="text-xl font-bold ">Chat Shortcuts</h1>
        <p className="text-sm text-muted-foreground">
          Sederhanakan percakapan Anda dengan pintasan cepat. Buat, kelola, dan
          atur respons yang paling sering Anda gunakan.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-between-card">
        <Card>
          <CardHeader>
            <CardDescription>Total Shortcut</CardDescription>
            <CardAction>
              <div className="bg-sky-100 text-sky-600 p-2 rounded-full aspect-square">
                <MessageSquare size={16} />
              </div>
            </CardAction>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{allShortcuts?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Shortcut Aktif</CardDescription>
            <CardAction>
              <div className="bg-sky-100 text-sky-600 p-2 rounded-full aspect-square">
                <MessageSquare size={16} />
              </div>
            </CardAction>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{activeShortcuts?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-row">
        <div className="">
          <h1 className="text-base font-semibold">Semua Shortcut</h1>
          <p className="text-sm text-muted-foreground">
            Kelola shortcut dan berikan respons cepat
          </p>
        </div>

        <SheetButton
          title="Tambah Shortcut"
          Icon={Plus}
          label="Tambah Shortcut"
          className="ml-auto"
          variant="default"
        >
          <CreateChatShortcutForm />
        </SheetButton>
      </div>

      <DataTable columns={chatbotShortcutColumns} data={allShortcuts || []} />
    </div>
  );
}
