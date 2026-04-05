"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { HeaderLink } from "../ui/HeaderLink";
import { createClient } from "@/lib/supabase/client";

export const LogoutButton = ({ session, status }: { session: any, status: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  if (status === "loading") {
    return <div className="h-7 w-7 animate-pulse rounded-full bg-muted" />;
  }

  if (session && status === "authenticated") {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative cursor-pointer flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border bg-muted transition-all"
        >
          {session.user?.user_metadata?.avatar_url ? (
            <Image
              src={session.user.user_metadata.avatar_url}
              alt={session.user.user_metadata.full_name || "User"}
              width={24}
              height={24}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-muted-foreground" />
          )}
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-50"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-full z-60 mt-2 w-56 origin-top-right rounded-xl border border-border bg-popover p-1 shadow-lg animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">
                  {session.user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user?.email}
                </p>
              </div>
              <div className="h-px bg-border my-1" />
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                role="menuitem"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return <HeaderLink href="/login">Login</HeaderLink>;
};
