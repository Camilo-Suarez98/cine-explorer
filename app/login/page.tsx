import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { Film } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Cine Explorer",
  description: "Login to access your personalized movie experience",
};

export default async function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] w-full flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />

      <main className="relative z-10 w-full max-w-md px-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

          <div className="relative flex flex-col items-center justify-center p-8 md:p-12 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl space-y-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(30,73,183,0.3)]">
                  <Film color="var(--primary)" size={30} />
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Sign in to Cine Explorer to curate your watchlist and discover new favorites.
              </p>
            </div>

            <div className="w-full space-y-4">
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
