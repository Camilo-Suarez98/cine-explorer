import { HeroSection } from "@/components/home/hero-section";
import { MovieSection } from "@/components/home/movie-section";
import { Header } from "@/components/layout/header";
import { tmdbServices } from "@/lib/services/tmdb";

export default async function Home() {
  const data = await tmdbServices.getPopularMovies();
  console.log('data', data);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MovieSection
          id="popular-movies"
          movies={data.results}
          title="Popular Movies"
          description="Explore the most popular movies from around the world."
        />
      </main>
    </div>
  );
};
