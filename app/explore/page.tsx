import { Searchbar } from "@/components/explore/searchbar";
import { MovieSection } from "@/components/home/movie-section";
import { tmdbServices } from "@/lib/services/tmdb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Movies",
  description: "Search and filter thousands of movies. Find your next favorite film.",
}

interface ExploreMoviesParams {
  searchParams: {
    query?: string;
    page?: string;
    genre?: string;
    sort_by?: string;
    year?: string;
  }
}

async function MovieResults({
  query,
  genre,
  sort_by,
  year,
  page
}: {
  query?: string;
  genre?: string;
  sort_by?: string;
  year?: string;
  page: string;
}) {
  try {
    const currentPage = Number.parseInt(page || '1', 10);
    const data = query
      ? await tmdbServices.searchMovie(query, currentPage)
      : await tmdbServices.getExploreMovies({
        page: currentPage,
        genre: genre || '',
        sort_by: sort_by || 'popularity.desc',
        year: year || '',
      });
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

export default async function Explore({ searchParams }: ExploreMoviesParams) {
  const currentPage = Number(searchParams.page) || 1;
  const movies = await MovieResults({
    page: currentPage.toString(),
    genre: searchParams.genre || '',
    year: searchParams.year || '',
    sort_by: searchParams.sort_by || '',
    query: searchParams.query || '',
  });
  console.log('movies', movies);
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Searchbar />
        </div>
        <MovieSection
          id="explore"
          movies={movies?.results || []}
          title="Explore"
          description={`Founded ${movies?.total_results?.toLocaleString() || 0} movies`}
        />
      </div>
    </section>
  );
}