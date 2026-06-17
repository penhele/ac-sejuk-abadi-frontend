"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { useProductsInfinite } from "@/features/product";
import ProductCard from "@/features/product/components/product-card";
import { useEffect, useState } from "react";

export default function ProductCarousel() {
  const { data } = useProductsInfinite({ limit: 10 });
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  const products = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    setCount(api.scrollSnapList().length);
    onSelect();

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const progressValue = count > 0 ? (current / count) * 100 : 0;

  return (
    <div className="space-y-between-items-lg">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/2">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Progress value={progressValue} />
    </div>
  );
}
