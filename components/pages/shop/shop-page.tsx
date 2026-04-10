import CarouselBanner from "@/components/carousel/carousel-banner";
import ShopFilter from "@/components/filters/shop-filter";
import ProductGrid from "@/components/grid/product-grid";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../fallback/error-fallback";
import { getProducts } from "@/services/product.service";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ id_brand?: string }>;
}) {
  const banner = [
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
  ];

  const { id_brand } = await searchParams;
  const products = await getProducts(undefined, undefined, id_brand);

  return (
    <div className="space-y-between-section">
      <CarouselBanner banner={banner} />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row gap-8 items-start">
        <ShopFilter />

        <div className="flex-1 space-y-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">
              Showing {products.data.length} products per page
            </span>

            <div className="flex gap-4">
              <div className="flex space-x-2 items-center">
                <span className="w-full text-gray-600 text-sm">
                  Urutkan dari :
                </span>

                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Default Sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Harga Termurah</SelectItem>
                      <SelectItem value="banana">Harga Termahal</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="">
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense
                fallback={
                  <div className="grid grid-cols-3 gap-between-card">
                    {[...Array(3)].map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))}
                  </div>
                }
              >
                <ProductGrid className="grid-cols-3!" />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
