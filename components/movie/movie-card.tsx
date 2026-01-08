import Link from "next/link";
import { Movie } from "@/lib/types/movie";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <h2>{movie.title}</h2>
    </Link>
  );
};