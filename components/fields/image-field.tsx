"use client";

import { useFieldContext } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import ImageUploadDropzone from "../../features/product/components/upload-dropzone";
import { FieldInfo } from "../field-info";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { compressImages } from "@/lib/image";
import { Field, FieldLabel } from "../ui/field";

type Props = {
  className?: string;
  label?: string;
};

export default function ImageField({ className, label }: Props) {
  const field = useFieldContext<File[]>();

  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setIsCompressing(true);
    try {
      // Jalankan fungsi kompresi otomatis untuk file > 1MB
      const processedFiles = await compressImages(files);

      // Gabungkan dengan file yang sudah ada sebelumnya
      field.handleChange([...field.state.value, ...processedFiles]);
    } finally {
      setIsCompressing(false);
      field.handleBlur();
    }
  };

  return (
    <Field className="flex flex-col gap-between-items">
      <FieldLabel>{label}</FieldLabel>

      <label className="cursor-pointer">
        <Input
          multiple
          type="file"
          accept="image/*"
          className={cn(className)}
          hidden
          onChange={handleFileChange}
          disabled={isCompressing}
        />

        <ImageUploadDropzone />
      </label>

      <FieldInfo field={field} />

      <div className="grid grid-cols-5 gap-between-card">
        {field.state.value.map((item, index) => {
          const imageUrl = URL.createObjectURL(item);

          return (
            <div
              key={`${item.name}-${index}`}
              className="group relative aspect-square border border-dashed bg-muted/50 rounded-sm"
            >
              <Image
                src={imageUrl}
                alt={item.name}
                fill
                className="object-contain"
                onLoadingComplete={() => URL.revokeObjectURL(imageUrl)}
              />

              <Button
                className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100"
                variant={"outline"}
                size={"icon-xs"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  field.handleChange(
                    field.state.value.filter((_, i) => i !== index),
                  );
                }}
              >
                <X />
              </Button>
            </div>
          );
        })}
      </div>
    </Field>
  );
}
