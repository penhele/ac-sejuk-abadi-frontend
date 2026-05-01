import { cn } from "@/lib/utils";
import { addToCart } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

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
    onSuccess: () => {
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
      disabled={isPending}
    >
      {isPending ? <Spinner /> : "Keranjang"}
    </Button>
  );
}
