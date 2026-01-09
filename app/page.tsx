import { HeroSection } from "@/components/home/hero-section";
import { MovieSection } from "@/components/home/movie-section";
import { Header } from "@/components/layout/header";
import { tmdbServices } from "@/lib/services/tmdb";
import { Suspense } from "react";
import { MovieCardSkeleton } from "@/components/ui/moive-card-skeleton";

export default async function Home() {
  const data = await tmdbServices.getPopularMovies();
  const upcomingData = await tmdbServices.getUpcomingMovies();
  const topRatedData = await tmdbServices.getTopRatedMovies();
  const nowPlayingData = await tmdbServices.getNowPlayingMovies();

  const MovieSectionLoaded = () => {
    return (
      <MovieSection
        id="popular-movies"
        movies={nowPlayingData.results}
        title="Popular Movies"
        description="Explore the most popular movies from around the world."
      />
    );
  };

  const UpcomingMovieSectionLoaded = () => {
    return (
      <MovieSection
        id="upcoming-movies"
        movies={upcomingData.results}
        title="Upcoming Movies"
        description="Coming soon to theaters"
      />
    );
  };

  const TopRatedMovieSectionLoaded = () => {
    return (
      <MovieSection
        id="top-rated-movies"
        movies={topRatedData.results}
        title="Top Rated Movies"
        description="Discover the highest-rated movies from around the world."
      />
    );
  };

  const NowPlayingMovieSectionLoaded = () => {
    return (
      <MovieSection
        id="now-playing-movies"
        movies={data.results}
        title="Now Playing Movies"
        description="Currently showing in theaters"
      />
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<MovieCardSkeleton />}>
          <MovieSectionLoaded />
        </Suspense>
        <Suspense fallback={<MovieCardSkeleton />}>
          <UpcomingMovieSectionLoaded />
        </Suspense>
        <Suspense fallback={<MovieCardSkeleton />}>
          <TopRatedMovieSectionLoaded />
        </Suspense>
        <Suspense fallback={<MovieCardSkeleton />}>
          <NowPlayingMovieSectionLoaded />
        </Suspense>
      </main>
    </div>
  );
};
