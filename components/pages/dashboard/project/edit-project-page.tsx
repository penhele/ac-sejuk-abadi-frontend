"use client";

import CreateProjectForm from "@/components/forms/project/create-project-form";
import EditProjectForm from "@/components/forms/project/edit-project-form";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="grid grid-cols-3">
      <div className=""></div>
      <div className="col-span-2">
        <Card>
          <CardContent>
            <EditProjectForm id={id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
