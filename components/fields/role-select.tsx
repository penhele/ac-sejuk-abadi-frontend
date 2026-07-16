import { updateUser } from "@/features/user/api/update-user";
import { userKeys } from "@/features/user/queries/user-keys";
import { UpdateUserPayload } from "@/features/user/types/update-user-payload";
import { useAppForm } from "@/hooks/use-app-form";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface Props {
  userId: string;
  role: string;
}

export function RoleSelect({ userId, role }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateUserPayload) => updateUser(userId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });

  const handleSubmit = ({ value }: { value: UpdateUserPayload }) =>
    goeyToast.promise(mutateAsync(value), {
      loading: "Loading...",
      success: () => "Role berhasil diubah",
      error: (err) => (err as AppError).message,
    });

  const form = useAppForm({
    defaultValues: {
      role,
    },
    onSubmit: handleSubmit,
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault;
          form.handleSubmit();
        }}
      >
        <form.AppField name="role">
          {(field) => (
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                field.handleChange(value);
                form.handleSubmit();
              }}
            >
              <SelectTrigger variant="ghost">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {["admin", "user"].map((item, index) => (
                  <SelectItem key={index} value={item}>
                    <div
                      className={cn(
                        "aspect-square h-2 rounded-full",
                        item === "admin" ? "bg-yellow-400" : "bg-gray-400",
                      )}
                    />
                    {item[0].toUpperCase() + item.substring(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  );
}
