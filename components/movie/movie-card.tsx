import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/lib/types/movie";
import { getImageUrl } from "@/lib/utils/format";
import { Star } from "lucide-react";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="flex flex-col gap-6 py-6 rounded-xl border shadow-sm transition-all hover:shadow-lg">
        <div className="relative">
          <Image
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={`${movie.title} poster`}
            width={200}
            height={300}
            className="w-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-foreground line-clamp-1">{movie.title}</h2>
          <div className="mt-1 text-sm flex items-center justify-between">
            <p className="text-muted-foreground">{movie.release_date}</p>
            <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded">
              <Star color="#fdc700" className="fill-yellow-400" size={14} />
              <span className="text-xs">{movie.vote_average.toFixed(1)}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};