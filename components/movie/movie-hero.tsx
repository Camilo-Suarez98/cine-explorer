import Image from "next/image";
import { MovieDetails } from "@/lib/types/movie";
import { formatDate, formatRating, formatRuntime, getImageUrl } from "@/lib/utils/format";
import { Calendar, Star, Clock } from "lucide-react";

export const MovieHero = ({ movie }: { movie: MovieDetails }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src={getImageUrl(movie.backdrop_path) || "/placeholder.svg"}
            alt={`${movie.title} picture`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/40"></div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12">
        <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
          <div className="mx-auto md:mx-0">
            <Image
              src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
              alt={`${movie.title} poster`}
              width={300}
              height={450}
              className="rounded-lg"
            />
          </div>

          <div>
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">{movie.title}</h1>
              <p className="text-lg text-muted-foreground italic">{movie.tagline}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2">
                <Star color="#fdc700" className="w-6 h-6 fill-yellow-400" />
                <span className="text-2xl text-foreground font-bold">{formatRating(movie.vote_average)}</span>
                <span className="text-lg text-muted-foreground">({movie.vote_count} votes)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar color="#737373" className="w-5 h-5" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock color="#737373" className="w-5 h-5" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="px-2 py-1 rounded-sm bg-foreground/10 text-secondary-foreground text-xs font-medium">
                {genre.name}
              </span>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
            <p className="text-muted-foreground text-pretty leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
