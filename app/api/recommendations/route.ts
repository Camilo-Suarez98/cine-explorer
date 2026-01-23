import { NextResponse } from "next/server";
import { getMovieRecommendations } from "@/lib/openai/client";
import { tmdbServices } from "@/lib/services/tmdb";
import { Movie } from "@/lib/types/movie";

export async function POST(req: Request) {
  try {
    const { favorites } = await req.json();

    if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
      return NextResponse.json(
        { error: "Favorites list is required" },
        { status: 400 }
      );
    }

    const recommendedTitles = await getMovieRecommendations(favorites);

    const recommendedMovies = await Promise.all(
      recommendedTitles.map(async (title: string) => {
        try {
          const searchResult = await tmdbServices.searchMovie(title);
          return searchResult.results[0] || null;
        } catch (error) {
          console.error(`Error searching for movie: ${title}`, error);
          return null;
        }
      })
    );

    const validMovies = recommendedMovies.filter(
      (movie): movie is Movie => movie !== null
    );

    return NextResponse.json({ recommendations: validMovies });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
