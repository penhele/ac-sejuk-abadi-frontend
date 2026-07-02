import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { userKeys } from "@/features/user/queries/user-keys";
import { useAppForm } from "@/hooks/use-app-form";
import { AppError } from "@/types/error";
import { revalidateLogic } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { updateUser } from "../api/update-user";
import { userSchema } from "../schemas/user.schema";
import { UpdateUserPayload } from "../types/update-user-payload";
import { User } from "../types/user";

interface Props {
  user: User;
}

export default function EditUserForm({ user }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateUserPayload) => updateUser(user.id, data),
  });

  const form = useAppForm({
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
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
    onSubmit: ({ value }) => {
      goeyToast.promise(mutateAsync(value), {
        loading: "Updating...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: userKeys.all,
          });

          return "Berhasil";
        },
        error: (err) => (err as AppError).message,
      });
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
        <div className="gap-between-field grid grid-cols-2 px-4">
          <form.AppField name="first_name">
            {(field) => (
              <field.TextField
                className="col-span-2"
                label="Nama Depan"
                placeholder="First Name"
              />
            )}
          </form.AppField>

          <form.AppField name="last_name">
            {(field) => (
              <field.TextField
                className="col-span-2"
                label="Nama Belakang"
                placeholder="Last Name"
              />
            )}
          </form.AppField>

          <form.AppField name="address">
            {(field) => (
              <field.TextareaField
                className="col-span-2"
                label="Alamat"
                placeholder="Ruko Srengseng Permai Village Jl. Srengseng Sawah No.2"
              />
            )}
          </form.AppField>

          <form.AppField name="rt">
            {(field) => <field.TextField label="Name" placeholder="12" />}
          </form.AppField>

          <form.AppField name="rw">
            {(field) => <field.TextField label="RW" placeholder="7" />}
          </form.AppField>

          <form.AppField name="zip_code">
            {(field) => (
              <field.TextField
                label="Kode Pos"
                placeholder="12640"
                className="col-span-2"
              />
            )}
          </form.AppField>
        </div>

        <SheetFooter>
          <form.SubmitButton label="Save changes" loading={isPending} />
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </form.AppForm>
  );
}
