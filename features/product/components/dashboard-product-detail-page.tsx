"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import { useProduct } from "../hooks/use-product";
import ButtonLink from "@/components/buttons/button-link";
import { ROUTES } from "@/constants/routes";
import { ImageOff, Pencil } from "lucide-react";
import DeleteButton from "@/components/buttons/delete-button";
import { deleteProduct } from "../api/delete-product";
import { productKeys } from "../queries/product-keys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import InfoField from "@/components/fields/info-field";
import BackButton from "@/components/buttons/back-button";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  id: string;
}

export default function DashboardProductDetailPage({ id }: Props) {
  const { data: product, isLoading } = useProduct(id);

  if (!product) return <Spinner />;

  return (
    <div className="space-y-between-items">
      <BreadcrumbComponent isDashboard />

      <BackButton />

      <div className="flex">
        <h1 className="text-2xl font-bold">Detail Produk</h1>

        <div className="ml-auto space-x-2">
          <ButtonLink
            href={ROUTES.EDIT_PRODUCT(id)}
            Icon={Pencil}
            label="Edit"
            size="sm"
          />
          <DeleteButton
            mutationFn={deleteProduct}
            id={id}
            item={product?.name ?? ""}
            queryKey={productKeys.all}
            size="sm"
            variant="destructive"
            label="Hapus"
            routes={ROUTES.PRODUCTS}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-between-card">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Detail Produk</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-between-field">
            <InfoField
              label="Name"
              value={product?.name}
              className="col-span-3"
            />

            <InfoField label="Brand" value={product?.brand.name} />
            <InfoField
              label="Kategori"
              value={product.id_category ? product?.category.name : undefined}
            />
            <InfoField
              label="Tipe AC"
              value={product.id_ac_type ? product?.ac_type.name : undefined}
            />
            <InfoField label="Tipe Freon" value={product?.freon_type} />
            <InfoField label="Model" value={product?.model_code} />
            <InfoField label="Seri" value={product?.series_name} />

            <InfoField label="PK" value={product?.pk} />

            <InfoField
              label="Deskripsi"
              value={product?.description}
              className="col-span-3"
            />
          </CardContent>
        </Card>

        <div className="space-y-between-card">
          <Card>
            <CardHeader>
              <CardTitle>Image</CardTitle>
            </CardHeader>

            <CardContent>
              <Carousel>
                {product?.images.length > 0 ? (
                  <CarouselContent>
                    {product?.images.map((image, index) => (
                      <CarouselItem>
                        <div className="relative aspect-square">
                          <Image
                            src={image.image_url}
                            alt={`${product.name}-image-${index}`}
                            fill
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                ) : (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    <ImageOff />
                  </div>
                )}
              </Carousel>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Tambahan</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-between-card">
              <InfoField label="Harga" value={product?.price} isPrice />
              <InfoField label="Stok" value={product?.quantity} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
