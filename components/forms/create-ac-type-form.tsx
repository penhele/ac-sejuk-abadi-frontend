import { getAcTypesQueryOptions } from "@/hooks/queries/ac-type-queries";
import { addAcType } from "@/services/ac-type.service";
import DialogForm from "./dialog-form";

export default function CreateAcTypeForm() {
  return (
    <DialogForm
      title="Add new AC type"
      defaultValues={{ name: "" }}
      onSubmit={addAcType}
      invalidateQueryKey={getAcTypesQueryOptions().queryKey}
      successMessage="Berhasil menambahkan AC tipe"
      errorMessage="Gagal menambahkan AC tipe"
    />
  );
}
