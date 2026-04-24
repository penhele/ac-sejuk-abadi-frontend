import { useAppForm } from "@/hooks/use-app-form";
import { getMe } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { PencilLine, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function AddressForm() {
  const [isEditing, setIsEditing] = useState(false);

  const handleDisabled = () => {
    setIsEditing((prev) => !prev);
  };

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getMe(),
  });

  const { handleSubmit, AppField } = useAppForm({
    defaultValues: {
      rt: data?.rt,
      rw: data?.rw,
      address: data?.address,
      zip_code: data?.zip_code,
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

        <Button variant={"outline"} onClick={handleDisabled}>
          {isEditing ? <PencilLine /> : <Save />}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppField
          name="address"
          children={(field) => (
            <field.TextField label="Alamat" isDisable={isEditing} />
          )}
        />
        <div className="flex flex-row gap-4">
          <AppField
            name="zip_code"
            children={(field) => (
              <field.TextField label="Kode Pos" isDisable={isEditing} />
            )}
          />
          <div className="flex flex-row gap-4">
            <AppField
              name="rt"
              children={(field) => (
                <field.TextField label="RT" isDisable={isEditing} />
              )}
            />
            <AppField
              name="rw"
              children={(field) => (
                <field.TextField label="RW" isDisable={isEditing} />
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
