import Autoplay from "embla-carousel-autoplay";
import CheckboxFilter from "@/components/filters/checkbox-filter";
import ProductList from "@/components/lists/product-list";
import SliderFilter from "@/components/filters/slider-filter";
import ShopFilter from "@/components/filters/shop-filter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonGroup } from "@/components/ui/button-group";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CarouselBanner from "@/carousel/carousel-banner";

export default function ShopPage() {
  const banner = [
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
    { src: "/iklan.png", name: "Banner" },
  ];

  return (
    <div className="space-y-8">
      <CarouselBanner banner={banner} />

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
              <ButtonGroup className="xs:flex hidden">
                <Input placeholder="Cari Produk" />
                <Button variant="outline" aria-label="Search">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <ProductList />
        </div>
      </div>
    </div>
  );
}
