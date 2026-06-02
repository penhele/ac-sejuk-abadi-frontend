import LoginForm from "@/components/forms/login-form";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <AuroraBackground>
      <Card className="absolute w-md ">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </AuroraBackground>
  );
}
