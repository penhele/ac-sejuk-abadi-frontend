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

type Props = {
  userId: string;
  role: string;
};

export function RoleSelect({ userId, role }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateUserPayload) => updateUser(userId, data),
  });

  const form = useAppForm({
    defaultValues: {
      role,
    },
    onSubmit: ({ value }) => {
      goeyToast.promise(mutateAsync(value), {
        loading: "Loading...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: userKeys.all,
          });

          return "Role berhasil diubah";
        },
        error: (err) => (err as AppError).message,
      });
    },
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
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  );
}
