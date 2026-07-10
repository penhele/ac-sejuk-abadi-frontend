import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { updateChatShortcut } from "../api/update-chat-shortcut";
import { UpdateChatShortcutPayload } from "../types/update-chat-shortcut-payload";
import ChatShortcutform from "./chat-shortcut-form";
import { useChatShortcut } from "../hooks/use-chat-shortcut";
import { chatShortcutKeys } from "../queries/chat-shortcut-keys";

interface Props {
  id: string;
}

export default function UpdateChatShortcutForm({ id }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateChatShortcutPayload) =>
      updateChatShortcut(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: chatShortcutKeys.all });
    },
  });

  const handleSubmit = (value: any) => {
    goeyToast.promise(mutateAsync(value), {
      loading: "Updating...",
      success: "Berhasil",
      error: (err) => (err as AppError).message,
    });
  };

  const { data: chatShortcut } = useChatShortcut(id);

  return (
    <ChatShortcutform
      defaultValues={{
        title: chatShortcut?.title ?? "",
        content: chatShortcut?.content ?? "",
      }}
      onSubmit={handleSubmit}
      loading={isPending}
    />
  );
}
