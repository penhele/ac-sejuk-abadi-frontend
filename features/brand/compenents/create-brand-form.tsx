"use client";

import { addBrand } from "@/features/brand/api/add-brand";
import { brandKeys } from "@/features/brand/queries/brand-keys";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import BrandForm from "./brand-form";

export default function CreateBrandForm() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addBrand,
  });

  return (
    <BrandForm
      defaultValues={{
        name: "",
      }}
      onSubmit={async (value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Loading...",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: brandKeys.all,
            });

            return "Brand berhasil ditambahkan";
          },
          error: (err) => (err as AppError).message,
        });
      }}
      loading={isPending}
    />
  );
}
