"use client";

import Image from "next/image";
import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { CloudUpload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ImageUploadZone({
  label = "Upload Gambar",
  maxSizeMB = 1,
  onChange,
}: {
  label?: string;
  maxSizeMB?: number;
  onChange: (file: File | null) => void;
}) {
  const inputId = useId();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.warning("File harus berupa gambar.");
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxBytes) {
      toast.warning(`Ukuran file maksimal ${maxSizeMB} MB.`);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    onChange(file);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    }

    if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      validateAndProcessFile(file);
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className={cn(
          "aspect-video overflow-hidden rounded-lg border-2 border-dashed bg-muted/50 relative transition-all",
          isDragActive && "border-primary bg-primary/5",
          !isDragActive && "hover:border-gray-400",
        )}
      >
        {!previewUrl ? (
          <label
            htmlFor={inputId}
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center space-y-between-items-xs"
          >
            <CloudUpload
              size={40}
              className="rounded-lg bg-white p-2 shadow-md transition group-hover:-translate-y-1"
            />

            <div className="space-y-1 text-center">
              <p className="text-xs font-semibold">Drop your image here</p>

              <p className="text-xs text-muted-foreground">
                Max file size up to {maxSizeMB} MB
              </p>
            </div>
          </label>
        ) : (
          <>
            <Image
              src={previewUrl}
              fill
              alt={label}
              className="object-contain"
            />

            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={removeImage}
              className="absolute top-3 right-3 rounded-full"
            >
              <X />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
