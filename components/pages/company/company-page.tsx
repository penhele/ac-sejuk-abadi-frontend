import EditCompanyForm from "@/components/forms/edit-company-form";
import { useAppForm } from "@/hooks/use-app-form";

export default function CompanyPage() {
  return (
    <div className="grid grid-cols-3 gap-between-card">
      <div className="aspect-square border-2 bg-muted/50 border-dashed rounded-lg"></div>

      <div className="col-span-2">
        <EditCompanyForm />
      </div>
    </div>
  );
}
