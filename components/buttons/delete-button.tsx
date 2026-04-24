"use client";

import { removeCart } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function RemoveCartById({ cartId }: { cartId: number }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => removeCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Berhasil menghapus");
    },
    onError: () => {
      toast.error("Gagal menghapus");
    },
  });

  return (
    <Button variant={"outline"} onClick={() => mutate()} disabled={isPending}>
      {isPending ? <Spinner /> : <TrashIcon />}
    </Button>
  );
}
