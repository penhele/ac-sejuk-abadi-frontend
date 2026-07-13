import { Product } from "@/features/product/types/product";
import ProductBadge from "../badges/product-badge";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";

export default function ProductInfo({ product }: { product: Product }) {
  const items = [
    { header: "Brand", value: product.brand.name || "-" },
    {
      header: "Kategori",
      value: product.id_ac_type ? product.ac_type.name : "-",
    },
    {
      header: "Tipe AC",
      value: product.id_category ? product.category.name : "-",
    },
    { header: "Kode Mode", value: product.model_code || "-" },
    { header: "Seri AC", value: product.series_name || "-" },
    { header: "Kapasitas PK", value: product.pk || "-" },
    { header: "Freon", value: product.freon_type || "-" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-between-items-xs">
        <div className="">
          <span className="text-xs text-gray-400">{product.brand.name}</span>
          <h1>{product.name}</h1>
        </div>

        <ProductBadge product={product} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-header-h4 font-medium">Spesifikasi</h1>

        <Table>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index} className="odd:bg-muted/30">
                <TableHead>{item.header}</TableHead>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
