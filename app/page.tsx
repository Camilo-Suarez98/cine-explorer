import { HeroSection } from "@/components/home/hero-section";
import { MovieSection } from "@/components/home/movie-section";
import { tmdbServices } from "@/lib/services/tmdb";
import { Suspense } from "react";
import { MovieCardSkeleton } from "@/components/ui/movie-card-skeleton";

export default function Home() {
  const popularMovies = tmdbServices.getPopularMovies().then(data => data.results);
  const upcomingMovies = tmdbServices.getUpcomingMovies().then(data => data.results);
  const topRatedMovies = tmdbServices.getTopRatedMovies().then(data => data.results);
  const nowPlayingMovies = tmdbServices.getNowPlayingMovies().then(data => data.results);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<MovieCardSkeleton />}>
          <MovieSection
            id="now-playing-movies"
            movies={nowPlayingMovies}
            title="Now Playing Movies"
            description="Currently showing in theaters"
          />
        </Suspense>
        <Suspense fallback={<MovieCardSkeleton />}>
          <MovieSection
            id="popular-movies"
            movies={popularMovies}
            title="Popular Movies"
            description="Explore the most popular movies from around the world."
          />
        </Suspense>
        <Suspense fallback={<MovieCardSkeleton />}>
          <MovieSection
            id="upcoming-movies"
            movies={upcomingMovies}
            title="Upcoming Movies"
            description="Coming soon to theaters"
          />
        </Suspense>
        <Suspense fallback={<MovieCardSkeleton />}>
          <MovieSection
            id="top-rated-movies"
            movies={topRatedMovies}
            title="Top Rated Movies"
            description="Discover the highest-rated movies from around the world."
          />
        </Suspense>
      </main>
    </div>
  );
};
