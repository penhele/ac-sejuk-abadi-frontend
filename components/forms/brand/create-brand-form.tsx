"use client";

import { brandKeys } from "@/features/brand/queries/brand-keys";
import { addBrand } from "@/services/brand.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import BrandForm from "./brand-form";

export default function CreateBrandForm() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandKeys.all,
      });

      toast.success("Brand berhasil ditambahkan.");
    },
    onError: () => {
      toast.error("Gagal menambahkan brand.");
    },
  });

  return (
    <BrandForm
      defaultValues={{
        name: "",
      }}
      onSubmit={(value) => {
        mutate({
          name: value.name,
        });
      }}
    />
  );
}
