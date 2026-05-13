'use client';

import { useState } from "react";
import Link from "next/link";
import { Film, Menu, X } from "lucide-react";
import { HeaderLink } from "../ui/HeaderLink";
import { LogoutButton } from "../auth/logout-button";
import { useAuth } from "@/hooks/use-auth";

export const Header = () => {
  const { session, status, supabase } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Film color="var(--primary)" size={24} />
              <h1 className="text-xl font-bold text-foreground">Cine Explorer</h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/explore">Explore</HeaderLink>
            {status === "authenticated" && (
              <HeaderLink href="/favorites">Favorites</HeaderLink>
            )}
            <LogoutButton session={session} status={status} />
          </nav>

          <button
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-md"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 py-4 pb-6 border-t animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              <div onClick={toggleMenu} className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1"
                >
                  Home
                </Link>
                <Link
                  href="/explore"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1"
                >
                  Explore
                </Link>
                {status === "authenticated" && (
                  <Link
                    href="/favorites"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1"
                  >
                    Favorites
                  </Link>
                )}
              </div>
            </div>
            <div className="pt-4 border-t">
              {status === "authenticated" ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {session?.user?.user_metadata?.avatar_url ? (
                      <img
                        src={session.user.user_metadata.avatar_url}
                        alt={session.user.user_metadata.full_name || "User"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {session?.user?.user_metadata?.full_name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{session?.user?.user_metadata?.full_name || "User"}</span>
                      <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
                  >
                    <span className="flex-1">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
