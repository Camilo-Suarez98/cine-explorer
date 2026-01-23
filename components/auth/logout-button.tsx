"use client";

import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { User } from "lucide-react";
import { HeaderLink } from "../ui/HeaderLink";
import { createPortal } from "react-dom";

export const LogoutButton = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
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
            {createPortal(
              <div
                className="fixed inset-0 z-70"
                onClick={() => setIsOpen(false)}
              />,
              document.body
            )}
            <div className="absolute right-0 top-full z-60 mt-2 w-56 origin-top-right rounded-xl border border-border bg-popover p-1 shadow-lg animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">
                  {session.user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user?.email}
                </p>
              </div>
              <div className="h-px bg-border my-1" />
              <button
                onClick={() => signOut()}
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
