import ForgotPasswordForm from "@/components/forms/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="bg-white grid grid-cols-2 p-2 h-screen ">
      <div className="bg-primary w-full h-full rounded-sm">{/* Konten */}</div>

      <div className="flex justify-center items-center">
        <div className="min-w-xl">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
