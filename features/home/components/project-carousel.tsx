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
import { useProjects } from "@/features/project";
import ProjectCard from "@/features/project/components/project-card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  useProgress?: boolean;
};

export default function ProjectCarousel({ className, useProgress }: Props) {
  const { data: projects = [] } = useProjects();

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
  }, [api, projects]);

  const progressValue = count > 0 ? (current / count) * 100 : 0;

  return (
    <div className={cn("space-y-between-items-sm", className)}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem
              key={project.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg::basis-1/5"
            >
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {useProgress && <Progress value={progressValue} />}
    </div>
  );
}
