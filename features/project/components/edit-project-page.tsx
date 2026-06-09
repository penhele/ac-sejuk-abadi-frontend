"use client";

import { Card, CardContent } from "@/components/ui/card";
import EditProjectForm from "@/features/project/components/edit-project-form";
import { useParams } from "next/navigation";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-between-items">
      <div>
        <h1 className="text-2xl font-semibold">Update Project</h1>
        <span className="text-sm text-gray-600">
          Masukkan project untuk ditambahkan di halaman portofolio
        </span>
      </div>
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
