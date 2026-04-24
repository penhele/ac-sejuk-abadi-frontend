import { useState } from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

export default function CartButton({
  productId,
  quantity,
  className,
}: {
  productId: string;
  quantity: number;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const response = await addToCart(productId, quantity);
      console.log(response);

      toast.success("Berhasil menambahkan ke keranjang");
    } catch (error) {
      toast.error("Gagal menambahkan ke keranjang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleAddToCart}
      className={cn(className)}
    >
      {loading ? <Spinner /> : "Keranjang"}
    </Button>
  );
}
