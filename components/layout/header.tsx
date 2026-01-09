import Link from "next/link";
import { Film } from "lucide-react";

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
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Explore
          </Link>
        </nav>
      </div>
    </header>
  );
};