"use client";

import { useFieldContext } from "@/hooks/use-app-form";
import { compressImages } from "@/lib/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ImageUploadDropzone from "../../features/product/components/upload-dropzone";
import { FieldInfo } from "../field-info";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "../ui/attachment";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import AttachmentItem from "../attachment-item";
import { Spinner } from "../ui/spinner";

interface Props {
  className?: string;
  label?: string;
}

export default function ImageField({ className, label }: Props) {
  const field = useFieldContext<File[]>();

  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setIsCompressing(true);
    try {
      const processedFiles = await compressImages(files);

      field.handleChange([...field.state.value, ...processedFiles]);
    } finally {
      setIsCompressing(false);
      field.handleBlur();
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    field.handleChange(
      field.state.value.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <Field className="flex flex-col gap-between-items">
      <FieldLabel>{label}</FieldLabel>

      <label
        className={isCompressing ? "cursor-not-allowed" : "cursor-pointer"}
      >
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

      <div className="grid grid-cols-3 w-full gap-between-card">
        {field.state.value.map((item, index) => (
          <AttachmentItem
            key={`${item.name}-${index}`}
            item={item}
            onDelete={() => handleRemoveImage(index)}
          />
        ))}

        {isCompressing && (
          <Attachment
            orientation={"vertical"}
            className="w-full"
            state="processing"
          >
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>

            <AttachmentContent>
              <AttachmentTitle>Memproses...</AttachmentTitle>
              <AttachmentDescription>
                Mohon tunggu sebentar
              </AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        )}
      </div>
    </Field>
  );
}
