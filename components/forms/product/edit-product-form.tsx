"use client";

import { ROUTES } from "@/constants/routes";
import useProduct from "@/features/product/hooks/use-product";
import { UpdateProductPayload } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProductForm from "./product-form";
import { updateProduct } from "@/features/product/api/update-product";
import { productKeys } from "@/features/product";

export default function EditProductForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: products, isFetching } = useProduct(id);

  const { mutateAsync } = useMutation({
    mutationFn: (payload: UpdateProductPayload) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      toast.success("Produk berhasil diedit.");
      router.push(ROUTES.PRODUCTS);
    },
    onError: () => {
      toast.error("Gagal edit produk.");
    },
  });

  return (
    <ProductForm
      isFetching={isFetching}
      defaultValues={{
        name: products?.name ?? "",
        description: products?.description ?? "",
        id_brand: String(products?.id_brand ?? ""),
        id_category: String(products?.id_category ?? ""),
        id_ac_type: String(products?.id_ac_type ?? ""),
        pk: products?.pk ?? "",
        price: products?.price ?? "",
        quantity: String(products?.quantity ?? ""),
      }}
      onSubmit={async (value) => {
        await mutateAsync({
          name: value.name,
          description: value.description,
          pk: value.pk,

          id_brand: Number(value.id_brand),
          id_category: Number(value.id_category),
          id_ac_type: Number(value.id_ac_type),

          price: Number(value.price),
          quantity: Number(value.quantity),
        });
      }}
    />
  );
}
