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
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function ProductCarousel({ className }: Props) {
  const { data } = useProductsInfinite({ limit: 10 });

  const products = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, products]);

  const progressValue = count > 0 ? (current / count) * 100 : 0;

  return (
    <div className={cn("space-y-between-items-sm", className)}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg::basis-1/5"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Progress value={progressValue} />
    </div>
  );
}
