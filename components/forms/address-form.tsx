import { useAppForm } from "@/hooks/use-app-form";
import { getMe, updateMe } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilLine, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { UpdateUserPayload } from "@/types/user";
import { toast } from "sonner";

export default function AddressForm() {
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
      className="border p-8 rounded-lg space-y-8 "
    >
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold">Alamat</h1>

        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={handleDisabled}
          type={isEditing ? "button" : "submit"}
        >
          {isEditing ? <Save /> : <PencilLine />}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppField
          name="address"
          children={(field) => (
            <field.TextField label="Alamat" isDisable={!isEditing} />
          )}
        />
        <div className="flex flex-row gap-4">
          <AppField
            name="zip_code"
            children={(field) => (
              <field.TextField label="Kode Pos" isDisable={!isEditing} />
            )}
          />
          <div className="flex flex-row gap-4">
            <AppField
              name="rt"
              children={(field) => (
                <field.TextField
                  label="RT"
                  isDisable={!isEditing}
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
                  type="number"
                />
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
