import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 p-default-page h-screen">
      <div className="bg-primary rounded-lg"></div>

      <div className="flex items-center justify-center">
        <LoginForm className="min-w-md" />
      </div>
    </div>
  );
}
