"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { ArrowUpRight, ImageOff, Pencil, PencilLine, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProjects } from "../hooks/use-projects";
import DeleteImageButton from "@/components/buttons/delete-image-button";
import { deleteProjectImage } from "../api/delete-project-image";
import { projectKeys } from "../queries/project-keys";
import DeleteButton from "@/components/buttons/delete-button";

export default function GalleryProjectPage() {
  const { data: projects = [] } = useProjects();
  const router = useRouter();

  return (
    <div className="space-y-between-items-lg">
      <h1 className="text-lg font-semibold">Gallery Image</h1>

      <div className="grid grid-cols-2 gap-between-card">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardAction className="space-x-2">
                <Button size={"icon-xs"} variant={"outline"}>
                  <ArrowUpRight />
                </Button>
                <Button
                  size={"icon-xs"}
                  variant={"outline"}
                  className="group relative"
                >
                  <Pencil className="transition-all duration-300 ease-in-out group-hover:opacity-0" />
                  <PencilLine className="absolute opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
                </Button>
                <Button
                  size={"icon-xs"}
                  variant={"outline"}
                  className="group"
                  onClick={() =>
                    router.push(
                      ROUTES.DASHBOARD_CREATE_PROJECT_IMAGES(project.id),
                    )
                  }
                >
                  <Plus className="transition group-hover:rotate-90" />
                </Button>
              </CardAction>
            </CardHeader>

            <Separator />

            <CardContent>
              {project.images && project.images.length > 0 ? (
                <div className="flex flex-row space-x-1 overflow-x-scroll ">
                  {project.images.map((image, index) => (
                    <div
                      key={image.id ?? index}
                      className="relative h-40 w-40 aspect-square group"
                    >
                      <Image
                        src={image.image_url}
                        alt={`${project.name}-image-${index}`}
                        fill
                        className="object-contain bg-muted"
                      />

                      <DeleteImageButton
                        className="absolute top-2 right-0 opacity-0 group-hover:opacity-100"
                        mutationFn={() =>
                          deleteProjectImage(project.id, image.id)
                        }
                        queryKey={projectKeys.all}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-muted/50 rounded-lg border border-dashed flex flex-col items-center justify-center space-y-2">
                  <ImageOff className="text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">
                    Belum ada gambar
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
