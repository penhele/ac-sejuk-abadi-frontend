import { DataTable } from "../../product/data-table";
import ProductImages from "@/components/product/product-images";
import ProductInfo from "@/components/product/product-info";
import ProductPriceAction from "@/components/product/product-price-action";
import { AcSpecification, columns } from "@/components/tables/product-columns";

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
        <div className="flex flex-col gap-2">
          <h1 className="text-header-4 font-medium">Detail</h1>

          <p className="text-body">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat,
            fugit voluptate unde modi odit assumenda accusamus inventore nisi
            fugiat, minima fuga aperiam maxime ducimus laudantium ex ipsam
            doloribus, non expedita. Iusto magnam tempore possimus quod
            laboriosam nesciunt similique ratione, commodi debitis provident
            deleniti quidem modi nobis vero natus cumque magni. Eius id nisi,
            quam quibusdam est ex culpa quia sed, ab, quidem natus porro amet
            alias aut? Quas ex ut, quae recusandae placeat quo modi at aliquam
            consequuntur sed rerum inventore amet quod sunt voluptatum nobis
            commodi error fugiat atque! Dolorem pariatur sunt excepturi aut
            ratione maiores fugiat recusandae esse amet ipsa minus reiciendis
            soluta, cupiditate cum quae atque temporibus quam nisi harum
            officiis eligendi tenetur doloremque provident quos. Nemo iure
            perferendis iste atque asperiores et magni illo fugit, vitae
            inventore, aliquam exercitationem impedit. Consequatur, error quasi.
            Quisquam dolor officiis eveniet quibusdam iste dolorum numquam ipsam
            ad suscipit perferendis, enim ipsum repellendus fuga iusto alias
            sequi autem blanditiis cum veritatis minus? Fugit sint eveniet aut
            recusandae veritatis, dolorem eum nesciunt officia! Ex earum quia
            temporibus iusto repudiandae enim quasi? Harum nisi magnam quis
            tempore velit soluta ipsa! Repudiandae, veniam earum sint asperiores
            architecto libero natus atque consectetur maiores? Porro, corrupti.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-header-4 font-medium">Spesifikasi</h1>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
