import EditCompanyForm from "@/components/forms/edit-company-form";
import EditCompanyImageForm from "@/components/forms/edit-company-image-form";
import { useAppForm } from "@/hooks/use-app-form";

export default function CompanyPage() {
  return (
    <div className="grid grid-cols-3 gap-between-card">
      <EditCompanyImageForm />

      <EditCompanyForm className="col-span-2" />
    </div>
  );
}
