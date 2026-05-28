import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";

export default function ImageUploadDropzone() {
  return (
    <div className="aspect-square border rounded-sm border-dashed bg-muted/50 flex flex-col space-y-between-items-xs items-center justify-center">
      <Button variant={"outline"} size={"sm"} className="min-w-24">
        <CloudUpload />
        Upload Images
      </Button>
      <div className="flex flex-col items-center">
        <span className="text-gray-800">
          Choose a image or drag & drop it here.
        </span>
        <span className="text-xs text-gray-600">
          JPG, JPEG, PNG, and WEBP. Max 1 MB.
        </span>
      </div>
    </div>
  );
}
