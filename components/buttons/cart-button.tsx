"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CartButton({
  productId,
  quantity,
  className,
}: {
  productId: string;
  quantity: number;
  className?: string;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => addToCart(productId, quantity),
    onSuccess: () => {w
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Berhasil menambahkan ke keranjang");
    },
    onError: () => {
      toast.error("Gagal menambahkan ke keranjang");
    },
  });

  return (
    <Button
      variant={"outline"}
      onClick={() => mutate()}
      className={cn(className)}
    >
      {isPending ? <Spinner /> : "Keranjang"}
    </Button>
  );
}
