"use client";

import { useFavorites } from "@/context/favorites-context";
import { MovieCard } from "@/components/movie/movie-card";
import { useEffect, useState } from "react";
import { Movie } from "@/lib/types/movie";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (favorites.length > 0) {
      getRecommendations();
    }
  }, [favorites]);

  const getRecommendations = async () => {
    if (favorites.length === 0) return;

    setLoading(true);
    try {
      const movieTitles = favorites.map(m => m.title);
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorites: movieTitles }),
      });

      const data = await response.json();
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error("Failed to get recommendations", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-muted-foreground">
            Manage your favorite movies and discover new ones.
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 rounded-xl">
          <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-4">
            Start adding movies to your favorites to see them here.
          </p>
          <Link href="/explore">
            <Button variant="outline">Explore Movies</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 border-t pt-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Sparkles className="text-yellow-500" />
              Recommended for You
            </h2>
            <p className="text-muted-foreground">
              Based on your favorites collection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
