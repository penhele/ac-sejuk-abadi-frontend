"use client";

import BackButton from "@/components/buttons/back-button";
import { Card, CardContent } from "@/components/ui/card";
import EditProjectForm from "@/features/project/components/edit-project-form";
import { useParams } from "next/navigation";

interface Props {
  id: string;
}

export default function EditProjectPage({ id }: Props) {
  return (
    <div className="space-y-between-items">
      <BackButton />

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
