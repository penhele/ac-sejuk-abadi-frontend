import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserPayload } from "../types/update-user-payload";
import { updateUser } from "../api/update-user";
import { userKeys } from "@/features/user/queries/use-keys";
import { toast } from "sonner";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import { userSchema } from "../schemas/user.schema";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import useUser from "../hooks/use-user";

export default function EditUserForm({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useUser(id);

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateUserPayload) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      toast.success("User berhasil ditambahkan.");
    },
    onError: () => {
      toast.error("Gagal menambahkan user.");
    },
  });

  const form = useAppForm({
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      password: user?.password ?? "",
      address: user?.address ?? "",
      rt: user?.rt ?? "",
      rw: user?.rw ?? "",
      zip_code: user?.zip_code ?? "",
      role: user?.role ?? "",
    },
    validators: {
      onChange: userSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
      console.log("submit", value);
      await mutateAsync(value);
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="h-full flex flex-col justify-between"
      >
        <div className="px-4">
          <form.AppField name="first_name">
            {(field) => <field.TextField label="Name" isDisabled={isLoading} />}
          </form.AppField>
        </div>

        <SheetFooter>
          <form.SubmitButton label="Save changes" />
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </form.AppForm>
  );
}
