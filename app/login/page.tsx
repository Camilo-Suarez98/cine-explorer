import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Cine Explorer",
  description: "Login to access your personalized movie experience",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px] animate-pulse delay-1000" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <main className="relative z-10 w-full max-w-md px-4">
        <div className="relative group">
          {/* Card Glow Effect */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

          <div className="relative flex flex-col items-center justify-center p-8 md:p-12 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl space-y-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(30,73,183,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-primary"
                  >
                    <path d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2Z" />
                    <path d="M7 2v20" />
                    <path d="M17 2v20" />
                    <path d="M2 12h20" />
                    <path d="M2 7h5" />
                    <path d="M2 17h5" />
                    <path d="M17 17h5" />
                    <path d="M17 7h5" />
                  </svg>
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

              <p className="align-center text-center text-xs text-muted-foreground mt-6">
                By clicking continue, you agree to our{" "}
                <a href="#" className="underline hover:text-primary transition-colors">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
