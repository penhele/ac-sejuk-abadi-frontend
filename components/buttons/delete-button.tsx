"use client";

import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { LucideIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";

interface Props<TId = string | number> {
  id: TId;
  mutationFn: (id: TId) => Promise<unknown>;
  queryKey: readonly unknown[];
  successMessage?: string;
  errorMessage?: string;
  item: string;
  className?: string;
  Icon?: LucideIcon;
  label?: string;
  size?:
    "sm" | "default" | "xs" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  variant?:
    "default" | "link" | "outline" | "secondary" | "ghost" | "destructive";
  routes?: string;
}

export default function DeleteButton<TId = string | number>({
  id,
  mutationFn,
  queryKey,
  successMessage = "Berhasil menghapus data",
  item,
  className,
  Icon,
  size = "icon-xs",
  variant = "outline",
  label,
  routes,
}: Props<TId>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (routes) router.push(routes);
    },
  });

  const handleDelete = () => {
    goeyToast.promise(mutateAsync(id), {
      loading: "Loading...",
      success: successMessage,
      error: (err) => (err as AppError).message,

      description: {
        success: () => (
          <span>
            Berhasil menghapus <strong>{item}</strong> dari database
          </span>
        ),
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuShortcut className="text-foreground tracking-normal">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={size}
                variant={variant}
                disabled={isPending}
                className={className}
              >
                {isPending ? <Spinner /> : Icon ? <Icon /> : <Trash2 />}
                {label}
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Hapus</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuShortcut>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="text-muted-foreground">
              Apakah Anda yakin ingin menghapus data ini secara permanen?
            </span>

            <span className="text-muted-foreground">
              Data yang akan dihapus:
            </span>

            <span className="text-base font-semibold p-4 bg-muted/40 rounded-lg flex flex-row gap-2 items-center">
              <Trash2
                size={32}
                className="p-1 bg-red-100 text-red-600 rounded-lg"
              />
              {item}
            </span>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
