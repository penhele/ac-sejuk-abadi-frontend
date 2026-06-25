import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateUser } from "@/features/user/api/update-user";
import { UpdateUserPayload } from "@/features/user/types/update-user-payload";
import { toast } from "sonner";
import { userKeys } from "@/features/user/queries/user-keys";
import { useAppForm } from "@/hooks/use-app-form";

type Props = {
  userId: string;
  role: string;
};

export function RoleSelect({ userId, role }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: UpdateUserPayload) => updateUser(userId, data),
    onSuccess: () => {
      toast.success("Role berhasil diubah");

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
    onError: () => {
      toast.error("Gagal mengubah role");
    },
  });

  const form = useAppForm({
    defaultValues: {
      role,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
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
