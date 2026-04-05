import { AuthForm } from "@/components/auth/auth-form";
import { Film } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Cine Explorer",
  description: "Login to access your personalized movie experience",
};

export default function LoginPage() {
  return (
    <div className="flex bg-background min-h-[calc(100vh-6rem)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10">
              <Film className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your Cine Explorer account
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
