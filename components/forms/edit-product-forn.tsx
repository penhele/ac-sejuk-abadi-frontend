"use client";

import {
  getProductByIdQueryOptions,
  getProductsQueryOptions,
} from "@/hooks/queries/product-queries";
import { addProduct } from "@/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ProductForm from "./product-form";

export default function EditProductForm({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { data: products } = useQuery(getProductByIdQueryOptions(id));

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });

      toast.success("Produk berhasil diedit.");
    },
    onError: () => {
      toast.error("Gagal edit produk.");
    },
  });

  return (
    <ProductForm
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
      onSubmit={(value) => {
        mutate({
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
