import { DataTable } from "../../product/data-table";
import ProductImages from "@/components/product/product-images";
import ProductInfo from "@/components/product/product-info";
import ProductPriceAction from "@/components/product/product-price-action";
import { AcSpecification, columns } from "@/components/tables/product-columns";
import { DescriptionCard } from "@/components/util/card-content";
import { DescriptionSection, HeaderSection } from "@/components/util/header";

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

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <ProductImages jumlah={8} />

        <div className="flex flex-col gap-4">
          <ProductInfo />

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
    </div>
  );
}
