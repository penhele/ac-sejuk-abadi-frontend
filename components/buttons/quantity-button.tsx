"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCart } from "@/services/cart.service";
import { Spinner } from "../ui/spinner";

export default function QuantityButton({
  itemId,
  initialQuantity,
}: {
  itemId: number;
  initialQuantity: number;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ qtx }: { qtx: number }) => updateCart(itemId, qtx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Gagal mengubah jumlah";
      toast.error(msg);
    },
  });

  const handleUpdate = (newQuantity: number) => {
    if (newQuantity < 1) return; // Minimal 1
    if (newQuantity > 10) {
      toast.error("Stok tidak mencukupi");
      return;
    }
    mutate({ qtx: newQuantity });
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      <Button
        variant={"outline"}
        disabled={isPending || initialQuantity <= 1}
        onClick={() => handleUpdate(initialQuantity - 1)}
      >
        {isPending ? <Spinner /> : <MinusIcon />}
      </Button>

      <span className="text-lg w-4 flex justify-center">{initialQuantity}</span>

      <Button
        variant={"outline"}
        disabled={isPending}
        onClick={() => handleUpdate(initialQuantity + 1)}
      >
        {isPending ? <Spinner /> : <PlusIcon />}
      </Button>
    </div>
  );
}
