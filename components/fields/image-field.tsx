"use client";

import { useFieldContext } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import ImageUploadDropzone from "../forms/product/upload-dropzone";
import { FieldInfo } from "../field-info";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function ImageField({ className }: { className?: string }) {
  const field = useFieldContext<File[]>();

  return (
    <div className="flex flex-col gap-between-items">
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

      <div className="grid grid-cols-2 gap-between-card">
        {field.state.value.map((item, index) => (
          <div
            key={index}
            className="group relative aspect-square border border-dashed bg-muted/50 rounded-sm"
          >
            <Image
              src={URL.createObjectURL(item)}
              alt={item.name}
              fill
              className="object-contain"
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
        ))}
      </div>
    </div>
  );
}
