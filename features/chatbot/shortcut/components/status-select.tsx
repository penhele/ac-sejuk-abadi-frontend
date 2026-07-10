import { useAppForm } from "@/hooks/use-app-form";
import { useChatShortcut } from "../hooks/use-chat-shortcut";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { updateChatShortcut } from "../api/update-chat-shortcut";
import { UpdateChatShortcutPayload } from "../types/update-chat-shortcut-payload";
import { goeyToast } from "goey-toast";
import { AppError } from "@/types/error";

interface Props {
  id: string;
  isActive: boolean;
}

export default function StatusSelect({ id, isActive }: Props) {
  const { mutateAsync } = useMutation({
    mutationFn: (body: UpdateChatShortcutPayload) =>
      updateChatShortcut(id, body),
  });

  const handleSubmit = ({ value }: { value: UpdateChatShortcutPayload }) => {
    goeyToast.promise(mutateAsync(value), {
      loading: "Loading...",
      success: "Berhasil",
      error: (err) => {
        console.log(err);
        return (err as AppError).message;
      },
    });
  };

  const form = useAppForm({
    defaultValues: {
      isActive,
    },
    onSubmit: handleSubmit,
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField name="isActive">
          {(field) => (
            <Select
              value={field.state.value ? "active" : "inactive"}
              onValueChange={(value) => {
                field.handleChange(value === "active");
                form.handleSubmit();
              }}
            >
              <SelectTrigger variant="ghost">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">
                  <div className="h-2 aspect-square bg-green-400 rounded-full" />{" "}
                  Aktif
                </SelectItem>
                <SelectItem value="inactive">
                  <div className="h-2 aspect-square bg-gray-400 rounded-full" />{" "}
                  Tidak Aktif
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  );
}
