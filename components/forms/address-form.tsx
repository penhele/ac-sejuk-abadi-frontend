"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { getMe, updateMe } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilLine, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { UpdateUserPayload } from "@/types/user";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AddressForm({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const handleDisabled = () => {
    setIsEditing((prev) => !prev);
  };

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });

  const mutation = useMutation({
    mutationFn: (newData: UpdateUserPayload) => updateMe(data?.id!, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });

      setIsEditing(false);

      toast.success("Berhasil menyimpan data");
    },
  });

  const { handleSubmit, AppField } = useAppForm({
    defaultValues: {
      rt: data?.rt ?? "",
      rw: data?.rw ?? "",
      address: data?.address ?? "",
      zip_code: data?.zip_code ?? "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={cn(
        "border p-inside-card rounded-lg space-y-8 shadow-xs",
        className,
      )}
    >
      <div className="flex flex-row justify-between">
        <h1 className=" font-semibold">Alamat</h1>

        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={handleDisabled}
          type={isEditing ? "button" : "submit"}
        >
          {isEditing ? <Save /> : <PencilLine />}
        </Button>
      </div>

      <div className="">
        <AppField
          name="address"
          children={(field) => (
            <field.TextField
              label="Alamat"
              isDisable={!isEditing}
              isEditing={isEditing}
            />
          )}
        />
        <AppField
          name="zip_code"
          children={(field) => (
            <field.TextField
              label="Kode Pos"
              isDisable={!isEditing}
              isEditing={isEditing}
            />
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <AppField
            name="rt"
            children={(field) => (
              <field.TextField
                label="RT"
                isDisable={!isEditing}
                isEditing={isEditing}
                type="number"
              />
            )}
          />
          <AppField
            name="rw"
            children={(field) => (
              <field.TextField
                label="RW"
                isDisable={!isEditing}
                isEditing={isEditing}
                type="number"
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}
