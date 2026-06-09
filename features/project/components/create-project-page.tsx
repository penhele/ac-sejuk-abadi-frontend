import CreateProjectForm from "@/features/project/components/create-project-form";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateProjectPage() {
  return (
    <div className="space-y-between-items">
      <div>
        <h1 className="text-2xl font-semibold">Tambah Project Baru</h1>
        <span className="text-sm text-gray-600">
          Masukkan project untuk ditambahkan di halaman portofolio
        </span>
      </div>

      <div className="col-span-2">
        <Card>
          <CardContent>
            <CreateProjectForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
