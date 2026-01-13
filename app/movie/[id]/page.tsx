import { tmdbServices } from "@/lib/services/tmdb";
import { MovieHero } from "@/components/movie/movie-hero";
import { MovieInfo } from "@/components/movie/movie-info";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await tmdbServices.getMovieById(Number(id));

  return (
    <div>
      <MovieHero movie={data} />
      <MovieInfo movie={data} />
    </div>
  );
};
