import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAcType } from "../api/update-ac-type";
import useAcType from "../hooks/use-ac-type";
import { acTypeKeys } from "../queries/ac-type-keys";
import { UpdateAcTypePayload } from "../types/update-ac-type-payload";
import AcTypeForm from "./ac-type-form";

export default function EditAcTypeForm({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { data: acType, isLoading } = useAcType(id);

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateAcTypePayload) => updateAcType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: acTypeKeys.all,
      });

      toast.success("AC Type berhasil ditambahkan.");
    },
    onError: (error) => {
      toast.error("Gagal menambahkan ac type.");
    },
  });

  return (
    <AcTypeForm
      defaultValues={{
        name: acType?.name ?? "",
      }}
      onSubmit={async (value) => {
        await mutateAsync({
          name: value.name,
        });
      }}
      isLoading={isLoading}
    />
  );
}
