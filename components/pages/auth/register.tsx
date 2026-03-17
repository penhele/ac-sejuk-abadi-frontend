import RegisterForm from "@/components/forms/register-form";

export default function Register() {
  return (
    <div className="bg-white grid grid-cols-2 p-2 h-screen ">
      <div className="bg-primary w-full h-full rounded-sm">{/* Konten */}</div>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
