import CreateProjectForm from "@/components/forms/create-project-form";
import { Card, CardContent } from "@/components/ui/card";

export default function CreatePortofolioPage() {
  return (
    <div className="grid grid-cols-3">
      <div className=""></div>
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
