import Link from "next/link";
import { Film } from "lucide-react";
import { HeaderLink } from "../ui/HeaderLink";
import { LogoutButton } from "../auth/logout-button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Film color="var(--primary)" size={24} />
            <h1 className="text-xl font-bold text-foreground">CineExplorer</h1>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/explore">Explore</HeaderLink>
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
};
