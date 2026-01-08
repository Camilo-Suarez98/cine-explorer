import { Sparkles } from "lucide-react";

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
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            Discover Your Next
            <br />
            <span className="text-primary">Favorite Movie</span>
          </h1>
        </div>
      </div>
    </section>
  );
};