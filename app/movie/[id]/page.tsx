import { tmdbServices } from "@/lib/services/tmdb";
import { MovieHero } from "@/components/movie/movie-hero";
import { MovieInfo } from "@/components/movie/movie-info";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = tmdbServices.getMovieById(Number(id));

  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <MovieHero movie={data} />
      <MovieInfo movie={data} />
    </Suspense>
  );
};
