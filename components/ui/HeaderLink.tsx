import Link from "next/link";

export const HeaderLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};