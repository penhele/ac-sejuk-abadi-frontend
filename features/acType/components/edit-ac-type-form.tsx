import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { updateAcType } from "../api/update-ac-type";
import useAcType from "../hooks/use-ac-type";
import { acTypeKeys } from "../queries/ac-type-keys";
import { UpdateAcTypePayload } from "../types/update-ac-type-payload";
import AcTypeForm from "./ac-type-form";

export default function EditAcTypeForm({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { data: acType, isLoading } = useAcType(id);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateAcTypePayload) => updateAcType(id, data),
  });

  return (
    <AcTypeForm
      defaultValues={{
        name: acType?.name ?? "",
      }}
      onSubmit={(value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Loading...",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: acTypeKeys.all,
            });

            return "Berhasil";
          },
          error: (err) => (err as AppError).message,
        });
      }}
      isLoading={isLoading || isPending}
    />
  );
}
