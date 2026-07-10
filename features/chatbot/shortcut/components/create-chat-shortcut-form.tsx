import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { createChatbotShortcut } from "../api/create-chat-shortcut";
import { chatShortcutKeys } from "../queries/chat-shortcut-keys";
import { CreateChatShortcutPayload } from "../types/create-chat-shortcut-payload";
import ChatShortcutform from "./chat-shortcut-form";

export default function CreateChatShortcutForm() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateChatShortcutPayload) =>
      createChatbotShortcut(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: chatShortcutKeys.all });
    },
  });

  const handleSubmit = (value: any) => {
    goeyToast.promise(mutateAsync(value), {
      loading: "Creating...",
      success: "Berhasil",
      error: (err) => (err as AppError).message,
    });
  };

  return (
    <ChatShortcutform
      defaultValues={{
        title: "",
        content: "",
      }}
      onSubmit={handleSubmit}
      loading={isPending}
    />
  );
}
