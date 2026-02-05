"use client";

import Image from "next/image";
import { MovieDetails } from "@/lib/types/movie";
import { formatDate, formatRating, formatRuntime, getImageUrl } from "@/lib/utils/format";
import { Calendar, Star, Clock, Heart } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";
import { useSession } from "next-auth/react";
import { use } from "react";
import { Button } from "../ui/button";

export const MovieHero = ({ movie }: { movie: Promise<MovieDetails> }) => {
  const movieData = use(movie)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movieData.id);
  const { status } = useSession();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "authenticated") {
      if (favorite) {
        removeFavorite(movieData.id);
      } else {
        addFavorite(movieData);
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src={getImageUrl(movieData.backdrop_path) || "/placeholder.svg"}
            alt={`${movieData.title} picture`}
            fill
            className="object-fill"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/40"></div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12">
        <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
          <div className="mx-auto relative md:mx-0">
            <Image
              src={getImageUrl(movieData.poster_path, "w500") || "/placeholder.svg"}
              alt={`${movieData.title} poster`}
              width={300}
              height={450}
              className="rounded-lg"
            />
            {status === "authenticated" && (
              <>
                <button
                  onClick={handleToggleFavorite}
                  className="absolute top-2 right-2 z-10 p-2 cursor-pointer rounded-full bg-black/50 hover:bg-black/70 transition-colors md:hidden"
                >
                  <Heart
                    size={20}
                    className={"w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 " + (favorite ? "fill-red-500 text-red-500" : "text-white")}
                  />
                </button>
                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className="mt-6 gap-2 hidden! md:flex!"
                >
                  <Heart
                    size={20}
                    className={favorite ? "fill-red-500 text-red-500" : "text-foreground"}
                  />
                  {favorite ? "Remove from favorites" : "Add to favorites"}
                </Button>
              </>
            )}
          </div>

          <div>
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance text-center md:text-left">{movieData.title}</h1>
              <p className="text-lg text-muted-foreground italic text-center md:text-left">{movieData.tagline}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2">
                <Star color="#fdc700" className="w-6 h-6 fill-yellow-400" />
                <span className="text-2xl text-foreground font-bold">{formatRating(movieData.vote_average)}</span>
                <span className="text-lg text-muted-foreground">({movieData.vote_count} votes)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar color="#737373" className="w-5 h-5" />
                <span>{formatDate(movieData.release_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock color="#737373" className="w-5 h-5" />
                <span>{formatRuntime(movieData.runtime)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {movieData.genres.map((genre) => (
              <span key={genre.id} className="px-2 py-1 rounded-sm bg-foreground/10 text-secondary-foreground text-xs font-medium">
                {genre.name}
              </span>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
            <p className="text-muted-foreground text-pretty leading-relaxed">{movieData.overview}</p>
          </div>
        </div>
      </div>
    </div >
  );
};
