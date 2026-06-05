"use client";

import { brandKeys } from "@/features/brand/queries/brand-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import BrandForm from "../../../components/forms/brand/brand-form";
import { addBrand } from "@/features/brand/api/add-brand";

export default function CreateBrandForm() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
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
      onSubmit={async (value) => {
        await mutateAsync({
          name: value.name,
        });
      }}
    />
  );
}
