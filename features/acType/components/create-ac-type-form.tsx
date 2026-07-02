import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { addAcType } from "../api/add-ac-type";
import { acTypeKeys } from "../queries/ac-type-keys";
import AcTypeForm from "./ac-type-form";

export default function CreateAcTypeForm() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addAcType,
  });

  return (
    <AcTypeForm
      defaultValues={{
        name: "",
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
      isLoading={isPending}
    />
  );
}
