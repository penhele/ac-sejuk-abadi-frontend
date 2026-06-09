"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "../hooks/use-projects";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ArrowUpRight, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryProjectPage() {
  const { data: projects = [] } = useProjects();

  return (
    <div className="space-y-between-items-lg">
      <h1 className="text-lg font-semibold">Gallery Image</h1>

      <div className="grid grid-cols-2 gap-between-card">
        {projects.map((project) => (
          <Card>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardAction className="space-x-2">
                <Button size={"icon-xs"} variant={"outline"}>
                  <ArrowUpRight />
                </Button>
                <Button size={"icon-xs"} variant={"outline"}>
                  <Pencil />
                </Button>
                <Button size={"icon-xs"} variant={"outline"} className="group">
                  <Plus className="transition group-hover:rotate-90" />
                </Button>
              </CardAction>
            </CardHeader>

            <Separator />

            <CardContent>
              {project.images && project.images.length > 0 ? (
                <div className="flex flex-row space-x-1">
                  {project.images.map((image, index) => (
                    <div key={image.id ?? index} className="relative h-40 w-40">
                      <Image
                        src={image.image_url}
                        alt={`${project.name}-image-${index}`}
                        fill
                        className="object-contain bg-muted"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>Tidak ada foto</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
