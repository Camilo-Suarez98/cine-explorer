import { Movie } from "@/lib/types/movie";
import { MovieCard } from "../movie/movie-card";

interface MovieSectionProps {
  id: string;
  movies: Movie[];
  title: string;
  description?: string;
}

export const MovieSection = ({ id, movies, title, description }: MovieSectionProps) => {
  return (
    <section className="py-12" id={id}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};