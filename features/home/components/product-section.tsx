import CarouselProduct from "@/components/carousel/carousel-product";
import ProductGrid from "@/components/grid/product-grid";
import { Header } from "@/components/header";
import { ROUTES } from "@/constants/routes";

export default function ProductSection() {
  return (
    <div className="">
      <Header title="Produk" href={ROUTES.SHOP} />

      <ProductGrid length={10} />
    </div>
  );
}
