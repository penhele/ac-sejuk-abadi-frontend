"use client";

import { getWishlistQueryOptions } from "@/hooks/queries/wishlist-queries";
import { cn } from "@/lib/utils";
import {
  addToWishlist,
  removeWishlist
} from "@/services/wishlist.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const queryClient = useQueryClient();
  const queryOptions = getWishlistQueryOptions();

  const { data: wishlistData } = useQuery(queryOptions);

  const existingItem = wishlistData?.items?.find(
    (item: any) => item.id_product === productId,
  );

  const isWishlisted = !!existingItem;

  const addMutation = useMutation({
    mutationFn: () => addToWishlist(productId),
    onSuccess: () => {
      toast.success("Ditambahkan ke wishlist");
      queryClient.invalidateQueries({
        queryKey: queryOptions.queryKey,
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeWishlist(existingItem?.id!),
    onSuccess: () => {
      toast.success("Dihapus dari wishlist");
      queryClient.invalidateQueries({
        queryKey: queryOptions.queryKey,
      });
    },
  });

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <Button
      variant={"ghost"}
      className={cn("size-5 rounded-full", className, {
        "text-red-600 hover:text-red-800": isWishlisted,
        "text-gray-400 hover:text-gray-600": !isWishlisted,
      })}
      onClick={handleToggle}
    >
      {isWishlisted ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
}
