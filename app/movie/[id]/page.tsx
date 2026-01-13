import { tmdbServices } from "@/lib/services/tmdb";
import { MovieHero } from "@/components/movie/movie-hero";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await tmdbServices.getMovieById(Number(id));
  console.log(data);

  return (
    <div>
      <MovieHero movie={data} />
    </div>
  );
};
