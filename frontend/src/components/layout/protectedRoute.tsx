"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthRoute({
  children,
  requireAuth = true,
  redirectTo = "/login",
}: AuthRouteProps) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  const router = useRouter();

  const shouldRedirect = requireAuth ? !isAuthenticated : isAuthenticated;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(redirectTo);
    }
  }, [shouldRedirect, router, redirectTo]);

  if (shouldRedirect) return null;

  return <>{children}</>;
}
