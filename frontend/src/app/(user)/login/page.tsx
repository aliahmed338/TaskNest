import AuthPage from "@/components/AuthPage";
import AuthRoute from "@/components/layout/protectedRoute";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <AuthRoute requireAuth={false} redirectTo="/">
      <AuthPage>
        <LoginForm />
      </AuthPage>
    </AuthRoute>
  );
}
