"use client";

import { ROUTES } from "@/constants/routes";
import { productKeys, updateProduct, useProduct } from "@/features/product";
import { UpdateProductPayload } from "@/features/product/types/update-product-payload";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import ProductForm from "../../../features/product/components/product-form";

export default function EditProductForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: products, isFetching } = useProduct(id);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateProductPayload) => updateProduct(id, data),
  });

  return (
    <ProductForm
      isFetching={isFetching}
      defaultValues={{
        name: products?.name ?? "",
        description: products?.description ?? undefined,
        id_brand: String(products?.id_brand ?? ""),
        id_category: String(products?.id_category ?? undefined),
        id_ac_type: String(products?.id_ac_type ?? undefined),
        pk: products?.pk ?? undefined,
        freon_type: products?.freon_type ?? undefined,
        series_name: products?.series_name ?? undefined,
        model_code: products?.model_code ?? undefined,
        price: products?.price ?? "",
        quantity: String(products?.quantity ?? ""),
      }}
      onSubmit={(value) => {
        goeyToast.promise(
          mutateAsync({
            name: value.name,
            description: value.description,
            pk: value.pk,

            id_brand: Number(value.id_brand),
            id_category: Number(value.id_category),
            id_ac_type: Number(value.id_ac_type),

            price: Number(value.price),
            quantity: Number(value.quantity),
          }),
          {
            loading: "Loading...",
            success: () => {
              queryClient.invalidateQueries({
                queryKey: productKeys.all,
              });
              router.push(ROUTES.PRODUCTS);

              return "Berhasil";
            },
            error: (err) => (err as AppError).message,
          },
        );
      }}
      loading={isPending}
    />
  );
}
