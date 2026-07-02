"use client";

import { brandKeys } from "@/features/brand/queries/brand-keys";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { updateBrand } from "../api/update-brand";
import { useBrand } from "../hooks/use-brand";
import { UpdateBrandPayload } from "../types/update-brand-payload";
import BrandForm from "./brand-form";

export default function EditBrandForm({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateBrandPayload) => updateBrand(id, data),
  });

  const { data: brand, isLoading } = useBrand(id);

  return (
    <BrandForm
      defaultValues={{
        name: brand?.name ?? "",
      }}
      onSubmit={async (value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Loading...",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: brandKeys.all,
            });

            return "Berhasil";
          },
          error: (err) => (err as AppError).message,
        });
      }}
      loading={isLoading || isPending}
    />
  );
}
