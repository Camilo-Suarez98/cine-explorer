"use client";

import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/lib/types/movie";
import { getImageUrl } from "@/lib/utils/format";
import { Heart, Star } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";
import { useAuth } from "@/hooks/use-auth";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { status } = useAuth();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="group relative">
      <div className="flex flex-col gap-6 rounded-xl border shadow-sm transition-all hover:shadow-lg h-full">
        <div className="relative">
          <Image
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={`${movie.title} poster`}
            width={200}
            height={300}
            className="w-full object-fill rounded-md md:h-[330px]"
          />
          {status === "authenticated" && (
            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 z-10 p-2 cursor-pointer rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <Heart
                size={20}
                className={favorite ? "fill-red-500 text-red-500" : "text-white"}
              />
            </button>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-md"></div>
        </div>
        <div className="px-4 pb-6 flex flex-col flex-1">
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