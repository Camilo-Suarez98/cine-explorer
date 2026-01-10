import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/10 via-background to-background py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles color="var(--primary)" size={14} />
            <span>Thousands of movies at your fingertips</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground leading-tight sm:text-5xl lg:text-6xl">
            Discover Your Next
            <br />
            <span className="text-primary">Favorite Movie</span>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl md:text-xl">
            Explore an extensive collection of films, from timeless classics to the latest releases. Find detailed information, ratings, and more.
          </p>
          <div className="flex flex-col justify-center items-center gap-4 sm:flex-row">
            <Link
              href="/explore"
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4"
            >
              <span>Explore Movies</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#popular-movies"
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[>svg]:px-4"
            >
              <span>Browse popular</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};