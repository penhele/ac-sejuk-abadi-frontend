"use client";

import { getProjectsQueryOptions } from "@/hooks/queries/project-queries";
import { useQuery } from "@tanstack/react-query";
import { EmblaCarouselType } from "embla-carousel";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { useCallback, useEffect, useState } from "react";
import ProjectCard from "../cards/project-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Slider } from "../ui/slider";

export default function CarouselProject() {
  const { data } = useQuery(getProjectsQueryOptions());

  const projects = data || [];

  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);

  const scrollToProgress = useCallback(
    (value: number) => {
      if (!api) return;

      const emblaApi = api as EmblaCarouselType;

      const { animation, limit, target, scrollProgress, scrollBody, scrollTo } =
        emblaApi.internalEngine();

      animation.stop();

      const currentProgress = scrollProgress.get(target.get());

      const allowedProgress = Math.min(Math.max(value, 0), 1);

      const progressToTarget = allowedProgress - currentProgress;

      const distance = progressToTarget * limit.length * -1;

      scrollBody.useDuration(0);

      scrollTo.distance(distance, false);
    },
    [api],
  );

  useEffect(() => {
    if (!api) return;

    setProgress(api.scrollProgress());

    api.on("scroll", (emblaApi) => {
      setProgress(emblaApi.scrollProgress());
    });
  }, [api]);

  return (
    <div className="space-y-between-items">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          WheelGesturesPlugin({
            forceWheelAxis: "x",
          }),
        ]}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem
              key={project.id}
              className="basis-1/2 sm:basis-1/2 md:basis-1/3"
            >
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Slider
        value={[progress]}
        min={0}
        max={1}
        step={0.001}
        onValueChange={(value) => {
          const newValue = value[0];

          setProgress(newValue);

          scrollToProgress(newValue);
        }}
        disabled
      />
    </div>
  );
}
