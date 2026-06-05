"use client";

import { brandKeys } from "@/features/brand/queries/brand-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import BrandForm from "../../../components/forms/brand/brand-form";
import { updateBrand } from "../api/update-brand";
import { useBrand } from "../hooks/use-brand";
import { UpdateBrandPayload } from "../types/update-brand-payload";

export default function EditBrandForm({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateBrandPayload) => updateBrand(id, data),
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

  const { data: brand, isLoading } = useBrand(id);

  return (
    <BrandForm
      defaultValues={{
        name: brand?.name ?? "",
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
