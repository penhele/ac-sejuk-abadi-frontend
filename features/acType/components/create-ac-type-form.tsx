import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addAcType } from "../api/add-ac-type";
import { acTypeKeys } from "../queries/ac-type-keys";
import AcTypeForm from "./ac-type-form";

export default function CreateAcTypeForm() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: addAcType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: acTypeKeys.all,
      });

      toast.success("AC Type berhasil ditambahkan.");
    },
    onError: () => {
      toast.error("Gagal menambahkan ac type.");
    },
  });

  return (
    <AcTypeForm
      defaultValues={{
        name: "",
      }}
      onSubmit={async (value) => {
        await mutateAsync({
          name: value.name,
        });
      }}
    />
  );
}
