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
import ErrorFallback from "./fallback/error-fallback";
// import { useMemo, useState } from "react";

export default function ShopPage() {
  const banner = [
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
  ];
  // const [searchQuery, setSearchQuery] = useState("");

  // const displayedProducts = useMemo(() => {
  //   return DUMMY_PRODUCTS.filter((product) => {
  //     // Filter Nama (Search)
  //     const matchesSearch = product.name
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());

  //     return matchesSearch;
  //   });
  // }, [searchQuery]);

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
              Showing 12 products per page
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

              {/* <SearchBar onChange={(val) => setSearchQuery(val)} /> */}
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
                <ProductGrid />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
