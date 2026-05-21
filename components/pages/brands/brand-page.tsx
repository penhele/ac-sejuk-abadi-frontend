"use client";

import CreateBrandForm from "@/components/forms/create-brand-form";
import ImageUploadZone from "@/components/image-upload";
import { brandColumns } from "@/components/tables/brand-columns";
import { DataTable } from "@/components/tables/data-table";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { useQuery } from "@tanstack/react-query";
import { CloudUpload } from "lucide-react";

export default function BrandPage() {
  const { data: response } = useQuery(getBrandsQueryOptions());

  const brands = response || [];

  return (
    <div className="grid grid-cols-3 gap-between-items">
      <DataTable data={brands} columns={brandColumns} className="col-span-2" />

      <div className="flex flex-col gap-between-items">
        <Card className="">
          <CardHeader>
            <CardTitle>Tambah Brand</CardTitle>
          </CardHeader>

          <CardContent>
            <CreateBrandForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Gambar</CardTitle>
          </CardHeader>

          <CardContent className="space-y-between-items">
            <div className="">
              <ImageUploadZone
                label="Logo Brand"
                maxSizeMB={1}
                // onChange={(file) => setBrandLogo(file)}
              />
              {/* <div className="">
              <input id="image-dropzone" type="file" className="hidden" />
              
              <div className="aspect-video bg-muted/50 border-dashed border-2 rounded-lg relative group transition-all hover:border-gray-400">
              <label
              htmlFor="image-dropzone"
              className="absolute inset-0 flex flex-col items-center justify-center space-y-between-items-xs"
              >
              <CloudUpload
              className="bg-white p-2 rounded-lg shadow-md transition group-hover:-translate-y-1"
              size={40}
              />
              <span className="text-xs font-semibold">
              Drop your image here
              </span>
              <span className="text-xs">Max file size up to 1 MB</span>
              </label>
              </div>
              </div> */}

              <Button>Simpan</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
