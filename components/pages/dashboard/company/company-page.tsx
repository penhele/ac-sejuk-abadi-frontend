import EditCompanyForm from "@/components/forms/company/edit-company-form";
import EditCompanyImageForm from "@/components/forms/company/edit-company-image-form";

export default function CompanyPage() {
  return (
    <div className="grid grid-cols-3 gap-between-card">
      <EditCompanyImageForm />

      <EditCompanyForm className="col-span-2" />
    </div>
  );
}
