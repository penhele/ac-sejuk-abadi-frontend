"use client";

import { ROUTES } from "@/constants/routes";
import {
  getProductByIdQueryOptions,
  getProductsInfiniteQueryOptions,
} from "@/hooks/queries/product-queries";
import { updateProduct } from "@/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProductForm from "./product-form";

export default function EditProductForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: products } = useQuery(getProductByIdQueryOptions(id));

  const { mutate } = useMutation({
    mutationFn: (payload: {
      name: string;
      description: string;
      pk: string;
      id_brand: number;
      id_category: number;
      id_ac_type: number;
      price: number;
      quantity: number;
    }) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProductsInfiniteQueryOptions().queryKey,
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
