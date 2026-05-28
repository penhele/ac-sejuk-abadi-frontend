"use client";

import UploadProductImageForm from "@/components/forms/product/upload-product-image-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function UploadProductImagePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="grid grid-cols-3">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
        </CardHeader>

        <CardContent>
          <UploadProductImageForm id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
