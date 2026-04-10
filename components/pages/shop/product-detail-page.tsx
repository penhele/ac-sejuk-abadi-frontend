"use client";

import ProductGrid from "@/components/grid/product-grid";
import ProductImages from "@/components/product/product-images";
import ProductInfo from "@/components/product/product-info";
import ProductPriceAction from "@/components/product/product-price-action";
import { AcSpecification, columns } from "@/components/tables/product-columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DescriptionSection, HeaderSection } from "@/components/util/header";
import { DataTable } from "../../product/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/product.service";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const data: AcSpecification[] = [
    { property: "Brand", value: "Daikin" },
    { property: "Kapasitas", value: "1/2 PK" },
    { property: "Tipe", value: "Split Wall" },
    { property: "Kapasitas Pendinginan", value: "5.000 BTU/h" },
    { property: "Daya Listrik (Watt)", value: "350 Watt" },
    { property: "Arus Kerja (Ampere)", value: "1.6 A" },
    { property: "EER", value: "12.5 BTU/h/W" },
    { property: "Dimensi Indoor", value: "700 x 190 x 265 mm" },
    { property: "Dimensi Outdoor", value: "681 x 285 x 434 mm" },
    { property: "Tipe Refrigrant", value: "R32" },
  ];

  const params = useParams();
  const id = params.id as string;

  const { data: product } = useSuspenseQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });

  return (
    <div className="space-y-between-section">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-2 gap-4">
        <ProductImages jumlah={8} />

        <div className="flex flex-col gap-4">
          <ProductInfo product={product} />

          <ProductPriceAction />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col ">
          <HeaderSection title="Detail" />

          <DescriptionSection description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo laborum blanditiis unde sint ut esse nulla magnam rem nihil. Iste id, voluptate dolor nisi architecto voluptates sint debitis commodi accusamus velit consequatur minima voluptatum exercitationem maiores illo dignissimos et ex pariatur nobis ipsum natus ab. Eum esse nesciunt asperiores earum expedita totam eaque sit itaque quis qui voluptates beatae in tenetur similique voluptatibus praesentium reiciendis distinctio nostrum, aperiam laborum nobis ea voluptatum repudiandae quibusdam! Dolorum et illum quos qui quam laboriosam a vero, blanditiis, accusamus consequuntur inventore sed, necessitatibus debitis soluta neque aspernatur porro praesentium eveniet libero itaque magni quae." />
        </div>

        <div className="flex flex-col gap-2">
          <HeaderSection title="Spesifikasi" />
          <DataTable columns={columns} data={data} />
        </div>
      </div>

      <div className="">
        <HeaderSection title="Produk Serupa" href="/shop" />
        <ProductGrid className="grid-cols-4!" limit={4} />
      </div>
    </div>
  );
}
