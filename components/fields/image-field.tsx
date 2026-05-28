"use client";

import { useFieldContext } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import ImageUploadDropzone from "../forms/product/upload-dropzone";
import { FieldInfo } from "../field-info";

export default function ImageField({ className }: { className?: string }) {
  const field = useFieldContext<File[]>();

  console.log(field.state.value);

  return (
    <label className="cursor-pointer">
      <Input
        multiple
        type="file"
        accept="image/*"
        className={cn(className)}
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);

          field.handleChange([...field.state.value, ...files]);
        }}
      />

      <ImageUploadDropzone />

      <FieldInfo field={field} />
    </label>
  );
}
